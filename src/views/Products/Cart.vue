<script setup>
import { onMounted, ref } from "vue";
import api from "@/utils/axios";
import { useCartStore } from "@/stores/cartStore";
import Product from "@/components/Product.vue";

const cartStore = useCartStore();
const loading = ref(false);
const errorMessage = ref('');

async function getCart() {
  loading.value = true;
  errorMessage.value = '';
  try {
    await cartStore.getCart();
  } catch (error) {
    errorMessage.value = error.response?.status === 401
        ? "Нужна авторизация"
        : "Не удалось загрузить корзину";
  } finally {
    loading.value = false;
  }
}

async function removeItem(productId) {
  try {
    await api.delete(`/cart/${productId}`);
  } catch (error) {
    errorMessage.value = "Ошибка при удалении";
  }
}

onMounted(getCart);
</script>

<template>
  <div class="cart-page">
    <div v-if="loading" class="status-info">Загрузка...</div>

    <div v-else-if="errorMessage" class="error-list">
      {{ errorMessage }}
    </div>

    <div v-else-if="cartStore.cart && cartStore.cart.length > 0" class="cart-wrapper">
      <div class="cart-list">
        <Product
            v-for="item in cartStore.cart"
            :key="item.id"
            :product="item"
            :is-cart="true"
        />
      </div>

      <div class="cart-total">
        <div class="total-card">
          <p>Товаров в корзине: <b>{{ cartStore.cart.length }}</b></p>
          <button class="btn btn-primary">Оформить заказ</button>
        </div>
      </div>
    </div>

    <div v-else class="empty-info">
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

.cart-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 30px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cart-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 0;
}

.item-info {
  flex: 1;
}

.btn-remove {
  background: transparent;
  border: 1px solid var(--error-color);
  color: var(--error-color);
  padding: 8px 16px;
  width: auto;
}

.btn-remove:hover {
  background: var(--error-color);
  color: white;
}

.total-card {
  background: white;
  padding: 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}

.total-card p {
  margin-bottom: 20px;
}

.status-info, .empty-info {
  text-align: center;
  padding: 60px;
}

@media (max-width: 768px) {
  .cart-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
