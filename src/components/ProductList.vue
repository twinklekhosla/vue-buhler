<template>
  <div class="container">
    <h2>Product List</h2>

    <div
      v-for="(items, category) in groupedProducts"
      :key="category"
      class="section"
    >
      <h3>{{ formatCategory(category) }}</h3>

      <div class="product-grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="product-card"
          @click="openDetails(item.id)"
        >
          <img :src="item.imageUrl" loading="lazy" />

          <h4>{{ item.name }}</h4>
          <p>Category: {{ formatCategory(category) }}</p>
          <p class="price">₹ {{ item.price }}</p>

          <button class="add" @click.stop="addToCart(item)">
            <svg
            fill="currentColor"
            id="Cart"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 902.86 902.86"
          >
            <path d="M731.6 610.4c-47.9 0-86.8 38.9-86.8 86.8s38.9 86.8 86.8 86.8 86.8-38.9 86.8-86.8-38.9-86.8-86.8-86.8zm0 127.5c-22.4 0-40.7-18.3-40.7-40.7s18.3-40.7 40.7-40.7 40.7 18.3 40.7 40.7-18.3 40.7-40.7 40.7zM349.5 610.4c-47.9 0-86.8 38.9-86.8 86.8s38.9 86.8 86.8 86.8 86.8-38.9 86.8-86.8-38.9-86.8-86.8-86.8zm0 127.5c-22.4 0-40.7-18.3-40.7-40.7s18.3-40.7 40.7-40.7 40.7 18.3 40.7 40.7-18.3 40.7-40.7 40.7z"/>
            <path d="M842.2 165.5H189.6l-16.4-84.6c-1.9-9.7-10.6-16.8-20.5-16.8H60.6c-11.5 0-20.8 9.3-20.8 20.8s9.3 20.8 20.8 20.8H133l95.2 491.2c1.9 9.7 10.6 16.8 20.5 16.8h508.2c11.5 0 20.8-9.3 20.8-20.8s-9.3-20.8-20.8-20.8H261.4l-13.6-70.1h525.4c9.9 0 18.5-7 20.5-16.8L866.7 186c1.2-6-0.3-12.3-4.2-16.9-3.9-4.6-9.6-7.3-15.3-7.3z"/>
          </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

import productData from "@/data/products.json";

const router = useRouter();
const cartStore = useCartStore();

// Hold product data
const products = ref<any[]>(productData);

// Group products by category
const groupedProducts = computed(() => {
  const groups: Record<string, any[]> = {};

  products.value.forEach((item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  });

  return groups;
});

// Navigate to product detail
const openDetails = (id: string) => {
  router.push(`/products/${id}`);
};

// Add item to cart
const addToCart = (item: any) => {
  cartStore.addToCart(item);
};

// Format category names
const formatCategory = (text: string) =>
  text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
</script>

<style scoped>
.container {
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  width: 220px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background: white;
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.price {
  font-weight: bold;
}

.add {
  background: #ffffff;
  color: #00a69c;
  border: 0px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.25s ease;
}
</style>
