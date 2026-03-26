<template>
  <div class="orders-page">
    <h1>Мои заказы</h1>

    <div v-if="orderStore.orders.length > 0" class="orders-list">
      <div v-for="order in orderStore.orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-number">Заказ №{{ order.id }}</span>
          <span class="order-price">{{ order.order_price }} ₽</span>
        </div>

        <div class="order-items-count">
          Количество товаров: {{ order.products.length }}
        </div>
      </div>
    </div>

    <div v-else class="empty-orders">
      <p>Список заказов пуст</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/orderStore';

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.fetchOrders();
});
</script>

<style scoped>
.orders-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.order-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: var(--shadow);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-number {
  font-weight: 800;
  font-size: 1.1rem;
}

.order-price {
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.2rem;
}

.order-items-count {
  color: #666;
  font-size: 0.9rem;
}

.empty-orders {
  text-align: center;
  padding: 100px 0;
  color: #999;
}
</style>
