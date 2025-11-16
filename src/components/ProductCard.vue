<template>
    <div class="product-card" @click="onClick">
        <img :src="product.imageUrl" loading="lazy" />

        <h4>{{ product.name }}</h4>
          <p>Category: {{ formattedCategory }}</p>
          <p class="price">₹ {{ product.price }}</p>

          <button class="add" @click.stop="addItem">
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
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "@/types/product";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits(["open", "add"]);

const formattedCategory = computed(() =>
  props.product.category.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
);

const onClick = () => emit("open", props.product.id);
const addItem = () => emit("add", props.product);

</script>

<style scoped>
.product-card {
  width: 240px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.product-card img {
  width: 100%;
  height: 160px;
  object-fit: contain; /* or cover */
  border-radius: 6px;
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

.price {
  font-weight: bold;
}
</style>