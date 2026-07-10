import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";

/**
 * End-to-end RLS checks against the live Lovable Cloud backend.
 *
 * These tests use the public anon key (safe to embed) and prove that a
 * signed-out visitor cannot write admin-owned tables or read admin-only rows.
 * The admin-side counterpart (that a real admin CAN write) is covered by
 * manual QA in the admin panel — running it here would require baking admin
 * credentials into the repo, which we explicitly avoid.
 */
const SUPABASE_URL = "https://rjsmqpneamauasuoqzct.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_RZUfJVUnFeaA7gWB1SBBRw_eAJpKmWy";

const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const expectDenied = (error: any, data: any) => {
  // Either an explicit RLS error, or a silent zero-row result (PostgREST returns
  // an empty array when the policy filters everything out).
  if (error) {
    expect(error.message).toMatch(/row-level security|permission|denied|violates/i);
    return;
  }
  expect(Array.isArray(data) ? data.length : 0).toBe(0);
};

describe("RLS: anonymous visitors", () => {
  it("can read the public product catalog", async () => {
    const { data, error } = await anon.from("products").select("id").limit(1);
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("can read public site content", async () => {
    const { data, error } = await anon.from("site_content").select("key").limit(1);
    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("cannot insert a product", async () => {
    const { data, error } = await anon.from("products").insert({
      slug: `rls-test-${Date.now()}`,
      name: "RLS probe",
      price: 1,
      category: "test",
    }).select();
    expect(error).not.toBeNull();
    expect(data).toBeNull();
  });

  it("cannot update a product price", async () => {
    const { data: existing } = await anon.from("products").select("id").limit(1);
    if (!existing || existing.length === 0) return;
    const { error, data } = await anon
      .from("products")
      .update({ price: 0.01 })
      .eq("id", existing[0].id)
      .select();
    // Either RLS blocks with an error, or the update matches zero rows.
    if (!error) expect(data?.length ?? 0).toBe(0);
  });

  it("cannot delete a product", async () => {
    const { data: existing } = await anon.from("products").select("id").limit(1);
    if (!existing || existing.length === 0) return;
    const { error, data } = await anon
      .from("products")
      .delete()
      .eq("id", existing[0].id)
      .select();
    if (!error) expect(data?.length ?? 0).toBe(0);
  });

  it("cannot write site content", async () => {
    const { error } = await anon
      .from("site_content")
      .update({ value: { title: "hacked" } })
      .eq("key", "hero")
      .select();
    // Silent zero-row is acceptable, but writes must never actually apply.
    const { data: after } = await anon.from("site_content").select("value").eq("key", "hero").maybeSingle();
    expect((after?.value as any)?.title).not.toBe("hacked");
  });

  it("cannot read contact_messages (admin-only)", async () => {
    const { data, error } = await anon.from("contact_messages").select("id").limit(1);
    expectDenied(error, data);
  });

  it("can submit a contact message (public insert allowed)", async () => {
    const { error } = await anon.from("contact_messages").insert({
      name: "RLS probe",
      email: "probe@example.com",
      message: "automated test",
    });
    expect(error).toBeNull();
  });

  it("cannot read admin_settings", async () => {
    const { data, error } = await anon.from("admin_settings").select("secret_code").limit(1);
    expectDenied(error, data);
  });

  it("cannot grant itself an admin role", async () => {
    const { error } = await anon
      .from("user_roles")
      .insert({ user_id: "00000000-0000-0000-0000-000000000000", role: "admin" });
    expect(error).not.toBeNull();
  });

  it("cannot read other users' profiles", async () => {
    const { data, error } = await anon.from("profiles").select("email").limit(1);
    expectDenied(error, data);
  });

  it("cannot read orders belonging to other users", async () => {
    const { data, error } = await anon.from("orders").select("id").limit(1);
    expectDenied(error, data);
  });
});