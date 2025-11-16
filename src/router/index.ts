import {createRouter, createWebHistory} from "vue-router";

import ProductDetails from "@/components/ProductDetails.vue";
import ProductList from "@/components/ProductList.vue";
import ProductCheckout from "@/components/ProductCheckout.vue";

const routes =  [
    {path: "/", component: ProductList},
    {path: "/products/:id", component: ProductDetails},
    {path: "/checkout", component: ProductCheckout}
];

const router= createRouter({
    history: createWebHistory(),
    routes,
});

export default router;