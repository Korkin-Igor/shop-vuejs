<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const data = ref({})

const login = async () => {
  const userData = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await authStore.login(userData);
    const token = response?.data?.token
    await router.push("/");

  } catch (error) {
    data.value = error.response.data
  }
};
</script>

<template>
  <form class="login" @submit.prevent="login">
    <h1>Sign in</h1>
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Login</button>
  </form>
  <div v-if="data.message">{{data.message}}</div>
  <div v-else-if="data.error" class="error-list">{{data.error.message}}</div>
  <ul v-else v-for="(messages, field) in data.errors" :key="field">
    <li class="error-list" v-for="msg in messages" :key="msg">
      {{ msg }}
    </li>
  </ul>
</template>

<style scoped>
h1 {
  text-align: center;
}

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