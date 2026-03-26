<script setup>
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
</script>

<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">MyStore</router-link>

      <nav class="nav">
        <router-link
            to="/products"
            class="nav-link"
            active-class="active-bar">
          Catalog
        </router-link>

        <router-link
            v-if="authStore.isAuthenticated"
            to="/cart"
            class="nav-link"
            active-class="active-bar">
          Cart
        </router-link>

        <router-link
            v-if="authStore.isAuthenticated"
            to="/orders"
            class="nav-link"
            active-class="active-bar">
          Orders
        </router-link>

        <router-link
            v-if="!authStore.isAuthenticated"
            to="/login"
            class="btn btn-login">
          Sign in
        </router-link>

        <button
            v-else
            @click="authStore.logout()"
            class="btn-logout">
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  padding: 5px 0;
  position: relative;
}

.active-bar {
  color: white !important;
  opacity: 1;
}

.active-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
  border-radius: 2px;
}

.btn-login, .btn-logout {
  background: white;
  color: var(--primary-color);
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: var(--radius);
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid white;
}

.btn-logout:hover {
  background: white;
  color: var(--primary-color);
}
</style>
