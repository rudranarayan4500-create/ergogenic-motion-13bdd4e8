import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token)
    if (claimsErr || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const userId = claimsData.claims.sub as string

    const body = await req.json().catch(() => ({}))
    const items = Array.isArray(body?.items) ? body.items : null
    const shipping = body?.shipping ?? {}
    if (!items || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    // Fetch authoritative prices from DB — never trust client amounts
    const service = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const slugs = items.map((i: any) => String(i.slug))
    const { data: products, error: prodErr } = await service
      .from('products')
      .select('id,slug,name,price,in_stock,active')
      .in('slug', slugs)
    if (prodErr) throw prodErr

    const priced = items.map((i: any) => {
      const p = products?.find((x: any) => x.slug === i.slug)
      if (!p || !p.active || !p.in_stock) return null
      const qty = Math.max(1, Math.min(99, Number(i.qty) || 1))
      return { slug: p.slug, name: p.name, price: Number(p.price), qty }
    }).filter(Boolean) as Array<{ slug: string; name: string; price: number; qty: number }>

    if (!priced.length) {
      return new Response(JSON.stringify({ error: 'No valid items in cart' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const totalRupees = priced.reduce((s, i) => s + i.price * i.qty, 0)
    const amountPaise = Math.round(totalRupees * 100)

    // Insert local order (service role bypasses RLS but we scope to userId)
    const { data: order, error: orderErr } = await service
      .from('orders')
      .insert({ user_id: userId, total: totalRupees, status: 'created', shipping })
      .select()
      .single()
    if (orderErr) throw orderErr

    await service.from('order_items').insert(
      priced.map((i) => ({ order_id: order.id, product_slug: i.slug, name: i.name, qty: i.qty, price: i.price }))
    )

    const keyId = Deno.env.get('RAZORPAY_KEY_ID')
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay keys not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const basicAuth = btoa(`${keyId}:${keySecret}`)
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt: order.id.slice(0, 40),
        notes: { local_order_id: order.id, user_id: userId },
      }),
    })

    const rzpJson = await rzpRes.json()
    if (!rzpRes.ok) {
      console.error('Razorpay order error:', rzpJson)
      await service.from('orders').update({ status: 'failed' }).eq('id', order.id)
      return new Response(JSON.stringify({ error: rzpJson?.error?.description || 'Razorpay order creation failed', details: rzpJson }), { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    await service.from('orders').update({ razorpay_order_id: rzpJson.id }).eq('id', order.id)

    return new Response(JSON.stringify({
      key_id: keyId,
      razorpay_order_id: rzpJson.id,
      amount: amountPaise,
      currency: 'INR',
      local_order_id: order.id,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e: any) {
    console.error('create-order error:', e)
    return new Response(JSON.stringify({ error: e.message ?? 'Unknown error' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})