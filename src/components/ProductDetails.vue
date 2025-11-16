<template>
  <div class="pdp">
    <button class="back" @click="goBack">← Back</button>

    <div v-if="product" class="card">
        <div class="left">
      <img :src="product.imageUrl" loading="lazy" /></div>
       <div class="right">
        <h2>{{ product.name }}</h2>
        <p class="cat">Category: {{ formatCategory(product.category) }}</p>
        <p class="price">₹ {{ product.price }}</p>

        <button class="add" @click="addToCart">
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

    <p v-else>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

import productData from "@/data/products.json";
import type { Product } from "@/types/product";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);

const goBack = () => {
  router.push("/");
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
    alert(`Added ${product.value.name} to cart`);
  }
};


const formatCategory = (text: string) =>
  text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

// Load product by ID
onMounted(() => {
  const id = route.params.id?.toString();
  product.value = productData.find((p) => p.id === id) || null;
});
</script>

<style scoped>
.pdp {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.back {
  background: #777;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 25px;
}

.card {
  display: flex;
  gap: 30px;
  background: white;
  border-radius: 14px;
  padding: 25px;
  border: 1px solid #e5e5e5;
}

.left img {
  width: 360px;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
}

/* RIGHT DETAILS */
.right {
  flex: 1;
}

.right h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.cat {
  font-size: 15px;
  color: #666;
}

.price {
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0;
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
.back {
  padding: 10px 16px;
  cursor: pointer;
  border: none;
  background: #00a69c;
  color: white;
  border-radius: 6px;
  font-size: 16px;
}

.back {
  background: #777;
  margin-bottom: 20px;
}
</style>
