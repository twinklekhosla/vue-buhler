import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as any[],
  }),

  getters: {
    cartCount: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.qty, 0),

    cartTotal: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.qty * item.price, 0).toFixed(2),
  },

  actions: {
    addToCart(product: any) {
      const exists = this.cartItems.find((item) => item.id === product.id);

      if (exists) exists.qty++;
      else
        this.cartItems.push({
          ...product,
          qty: 1,
        });
    },

    increaseQty(id: string) {
      const item = this.cartItems.find((i) => i.id === id);
      if (item) item.qty++;
    },

    decreaseQty(id: string) {
      const item = this.cartItems.find((i) => i.id === id);
      if (item && item.qty > 1) item.qty--;
    },

    removeFromCart(id: string) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
    },
  },
});
