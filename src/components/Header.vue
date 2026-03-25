<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">MyStore</router-link>

      <nav class="nav">
        <router-link to="/products" class="nav-link">Catalog</router-link>
        <router-link to="/cart" class="nav-link">Cart</router-link>
        <router-link to="/login" class="btn btn-login">Sign in</router-link>
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
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.btn-login {
  background: white;
  color: var(--primary-color);
  padding: 8px 16px;
  font-size: 0.9rem;
  width: auto;
}
</style>
