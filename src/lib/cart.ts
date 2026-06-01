export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const KEY = "ergo:cart";

export const getCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const setCart = (items: CartItem[]) => {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:change"));
};

export const addToCart = (item: Omit<CartItem, "qty">, qty = 1) => {
  const cart = getCart();
  const idx = cart.findIndex((c) => c.slug === item.slug);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ ...item, qty });
  setCart(cart);
  window.dispatchEvent(new CustomEvent("cart:add", { detail: item }));
};

export const updateQty = (slug: string, qty: number) => {
  const cart = getCart().map((c) => (c.slug === slug ? { ...c, qty } : c)).filter((c) => c.qty > 0);
  setCart(cart);
};

export const removeItem = (slug: string) => {
  setCart(getCart().filter((c) => c.slug !== slug));
};

export const cartCount = () => getCart().reduce((s, i) => s + i.qty, 0);