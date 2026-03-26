<script setup>
import {onMounted, ref} from "vue";
import api from "@/utils/axios";
import {useCartStore} from "@/stores/cartStore";

const cartStore = useCartStore()
const loading = ref(false);
const errorMessage = ref('');

async function fetchCart() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await api.get('cart');
    cartStore.cart.value = response.data;
  } catch (error) {
    errorMessage.value = error.response?.status === 401
        ? "Нужна авторизация для просмотра корзины"
        : "Не удалось загрузить корзину";
  } finally {
    loading.value = false;
  }
}

async function removeItem(productId) {
  try {
    await api.delete(`/cart/${productId}`);
    cartStore.cart.value = cartStore.cart.value.filter(item => item.id !== productId);
  } catch (error) {
    errorMessage.value = "Ошибка при удалении товара";
  }
}

onMounted(fetchCart);
</script>

<template>

</template>

<style scoped>

</style>