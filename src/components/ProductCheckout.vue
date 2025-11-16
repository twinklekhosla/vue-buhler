<template>
  <div class="checkout-page">
    <h2>Checkout</h2>

    <div v-if="cartItems.length === 0" class="empty">
      Your cart is empty.
    </div>

    <div v-else class="table-container">
      <table class="checkout-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>
              <img :src="item.imageUrl" class="thumb" />
            </td>
            <td>{{ item.name }}</td>

            <td>
              <button class="qty-btn" @click="decrease(item.id)">−</button>
              <span class="qty">{{ item.qty }}</span>
              <button class="qty-btn" @click="increase(item.id)">+</button>
            </td>

            <td>₹ {{ item.price }}</td>
            <td>₹ {{ (item.qty * item.price).toFixed(2) }}</td>

            <td>
              <button class="remove" @click="remove(item.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <h3>Total Amount: ₹ {{ cartTotal }}</h3>
        <button class="checkout-btn">Proceed to Pay</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const { cartItems, cartTotal } = storeToRefs(cartStore);

const increase = (id: string) => {
  cartStore.increaseQty(id);
};

const decrease = (id: string) => {
  cartStore.decreaseQty(id);
};

const remove = (id: string) => {
  cartStore.removeFromCart(id);
};
</script>

<style scoped>
.checkout-page {
  padding: 20px;
}

.table-container {
  margin-top: 20px;
}

.checkout-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.checkout-table th,
.checkout-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.qty-btn {
  padding: 5px 10px;
  cursor: pointer;
}

.remove {
  background: red;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.summary {
  margin-top: 20px;
  text-align: right;
}

.checkout-btn {
  padding: 10px 20px;
  background: green;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-size: 16px;
}

.empty {
  margin-top: 40px;
  font-size: 18px;
}
</style>
