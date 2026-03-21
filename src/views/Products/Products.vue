<script setup>
import {getProductsRequest} from "@/utils/api";
import {ref, onMounted} from "vue";

const products = ref([]);
const isLoading = ref(true);

const loadProducts = async () => {
  try {
    products.value = await getProductsRequest();
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadProducts);
</script>

<template>
<section class="products-section">
  <h1>Products</h1>
  <ul class="products-list">
    <li v-for="product of products.data" :key="product.id" class="product-card">
      <img src="" alt="product-image">
      {{ product }}
    </li>
  </ul>
</section>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.products-section {
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
}

.products-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.product-card {
  max-width: 400px;
  height: 300px;
}
</style>