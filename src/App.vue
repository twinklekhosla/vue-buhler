<template>
  <ProductHeader />
  <router-view />
</template>

<script setup lang="ts">
import ProductHeader from './components/ProductHeader.vue';
</script>

<style>
:root {
  --text-color: #009b91; /* change this to ANY color you want */
}

body, #app {
  color: var(--text-color);
  font-family: Arial, sans-serif;
}
</style>

