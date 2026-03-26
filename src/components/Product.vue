<script setup>
import {computed} from "vue";
import {useCartStore} from "@/stores/cartStore";

const props = defineProps({
  product: Object,
  isCart: Boolean
})

const image_url = computed(() => {
  if (!props.product?.image) return '';
  return process.env.VUE_APP_API_URL_IMAGE + props.product.image
})

const cartStore = useCartStore()
</script>


<template>
  <div class="product-item" :class="{ 'cart-item': isCart }">
    <div class="product-image">
      <img
          :src="image_url"
          :alt="product.name"
          :class="{'cart-product-image': isCart}"
      />
    </div>

    <div class="product-info">
      <h3 class="product-title">{{ product.name }}</h3>

      <p v-if="!isCart" class="product-desc">{{ product.description }}</p>

      <div class="product-footer">
        <span class="product-price">{{ product.price }} ₽</span>

        <button
            v-if="!isCart"
            class="btn-primary"
            @click="cartStore.addItem(product.id)"
        >
          В корзину
        </button>

        <button
            v-else
            class="btn-remove"
            @click="cartStore.removeItem(product.id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  max-width: 300px;
}

.product-item:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  background: #f9f9f9;
}

.product-image img {
  width: 100%;
  height: 100%;
}

.product-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
}

.product-title {
  margin: 0 0 10px;
  font-size: 1.1rem;
  color: #333;
}

.product-desc {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: scroll;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}

.btn-primary {
  width: 30%;
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.cart-product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f9f9f9;
}

.btn-remove {
  background-color: transparent;
  color: var(--error-color, #ef4444);
  border: 1px solid var(--error-color, #ef4444);
  padding: 6px 14px;
  border-radius: var(--radius, 8px);
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-remove:hover {
  background-color: var(--error-color, #ef4444);
  color: white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
}

.cart-item {
  flex-direction: row;
  max-width: 100%;
  height: 120px;
}
</style>
