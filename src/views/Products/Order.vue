<script setup>
import { onMounted, ref } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import Product from "@/components/Product.vue";

const orderStore = useOrderStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await orderStore.getOrders();
  loading.value = false;
});
</script>

<template>
  <div class="orders-page">
    <h1 v-if="orderStore.orders && orderStore.orders.length">My orders</h1>

    <div v-if="orderStore.orders">
      <div v-for="order in orderStore.orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-number">Order №{{ order.id }}</span>
          <strong class="order-price">{{ order.order_price }} ₽</strong>
        </div>

        <div class="order-items">
          <Product
              v-for="productId in order.products"
              :key="productId"
              :product="{
                id: productId,
                name: 'Product #' + productId,
                image: '',
                description: '',
                price: 0
              }"
              :isOrder="true"/>
        </div>
      </div>
    </div>

    <div v-if="orderStore.orders && orderStore.orders.length === 0 && !loading" class="empty-orders">
      No orders yet
    </div>
  </div>
</template>

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
