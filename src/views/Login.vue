<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
  const userData = {
    username: username.value,
    password: password.value,
  };

  try {
    const response = await authStore.login(userData);
    const token = response?.data?.token
    await router.push("/");

  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};
</script>

<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>User name</label>
    <input type="text" required v-model="username" />
    <label>Password</label>
    <input type="text" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.login input,
button {
  border: 1px solid black;
  border-radius: 5px;
}
hr {
  margin: 10px 0;
}
</style>