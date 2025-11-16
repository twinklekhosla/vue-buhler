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
        <ProductCard
        v-for="item in items"
        :key="item.id"
        :product="item"
        @open="openDetails"
        @add="addToCart"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

import productData from "@/data/products.json";
import ProductCard from "./ProductCard.vue";

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
