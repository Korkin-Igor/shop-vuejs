<script setup>
import { onMounted, ref } from "vue";
import { useOrderStore } from "@/stores/orderStore";
import Product from "@/components/Product.vue";
import api from "@/utils/axios";

const orderStore = useOrderStore();
const allProducts = ref([]);
const loading = ref(false);

async function fetchData() {
  loading.value = true;
  try {
    const [ordersRes, productsRes] = await Promise.all([
      orderStore.getOrders(),
      api.get('products')
    ]);

    allProducts.value = productsRes.data.data || productsRes.data;
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  } finally {
    loading.value = false;
  }
}

function getProductById(id) {
  const found = allProducts.value.find(p => p.id === id);
  // Если нашли — отдаем объект, если нет — отдаем минимальную заглушку, чтобы не упало
  return found || { id, name: 'Product not found', price: 0, image: '', description: '' };
}

onMounted(fetchData);
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
              :product="getProductById(productId)"
              :isOrder="true"
          />
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
  margin-bottom: 25px;
  box-shadow: var(--shadow);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
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

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-orders {
  text-align: center;
  padding: 100px 0;
  color: #999;
}
</style>
