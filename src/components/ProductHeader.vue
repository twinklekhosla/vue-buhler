<template>
    <header class="header">
        <div class="logo" @click="goHome">
            <img src="@/assets/buhler-logo.svg" class="logo" />
        </div>
        <div class="dateTime">{{ dateTime }}</div>

        <div class="cart" @click="checkout()">
            Cart ({{ cartCount }})
        </div>
        
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";
const cartStore = useCartStore();
const { cartCount } = storeToRefs(cartStore);

const router= useRouter()
const goHome= () => {
    router.push('/')
}
const checkout= () => {
    router.push('/checkout')
}
const dateTime= ref('')

const currentTime = () => {
  dateTime.value = new Date().toLocaleString()
}

onMounted(() => {
    currentTime()
    setInterval(currentTime,1000)
})
</script>

<style scoped>
.header{
    background-color: #f3f3f3;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
}
.logo{
     width: 150px;
  height: 30px;
  object-fit: contain;
}
</style>