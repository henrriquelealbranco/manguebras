"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

interface CartState {
  items: CartItem[];
  /** Código do cupom aplicado (validado em lib/cart) */
  coupon: string | null;
  addItem: (code: string, quantity?: number) => void;
  removeItem: (code: string) => void;
  setQuantity: (code: string, quantity: number) => void;
  setCoupon: (coupon: string | null) => void;
  clear: () => void;
}

/**
 * Carrinho persistido em localStorage.
 * Guarda apenas código + quantidade; os dados do produto
 * são resolvidos pelo catálogo na renderização.
 */
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      coupon: null,

      addItem: (code, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.code === code);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.code === code
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { code, quantity }] };
        }),

      removeItem: (code) =>
        set((state) => ({
          items: state.items.filter((i) => i.code !== code),
        })),

      setQuantity: (code, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.code !== code)
              : state.items.map((i) =>
                  i.code === code ? { ...i, quantity } : i,
                ),
        })),

      setCoupon: (coupon) => set({ coupon }),

      clear: () => set({ items: [], coupon: null }),
    }),
    { name: "manguebras-cart" },
  ),
);

/** Total de unidades no carrinho. */
export function useCartCount(): number {
  return useCart((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
}
