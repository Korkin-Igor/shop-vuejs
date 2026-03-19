<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const fio = ref('');
const email = ref('');
const password = ref('');

const data = ref({})

const register = async () => {
  const userData = {
    fio: fio.value,
    email: email.value,
    password: password.value,
  };

  try {
    const response = await authStore.register(userData);
    const token = response?.data?.token
    await router.push("/");

  } catch (error) {
    data.value = error.response.data
  }
};
</script>

<template>
  <form class="register" @submit.prevent="register">
    <h1>Sign up</h1>
    <label>Name</label>
    <input type="text" required v-model="fio" />
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Password</label>
    <input type="password" required v-model="password" />
    <hr />
    <button class="btn btn-primary" type="submit">Register</button>
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

.register {
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

a {
  text-align: center;
}
</style>