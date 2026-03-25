<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="wrapper">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
