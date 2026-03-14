<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const data = ref({})

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
    data.value = error.response.data
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
  <div v-if="data.message">{{data.message}}</div>
  <div v-for="(messages, field) in data.errors" :key="field">
    <li v-for="msg in messages" :key="msg">
      {{ msg }}
    </li>
  </div>
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