<script lang="ts" setup>
import { reactive } from "vue";

import Logo from "../assets/icons/logo.svg";
import AppButton from "../components/UI/AppButton.vue";

import { useAuth } from "@/stores/auth";
import { type User } from "@/interfaces/User";

const auth = useAuth();

const user = reactive<User>({ username: "", password: "", dashboards: [] });
</script>

<template>
  <div
    class="auth-layout font-main flex flex-col items-center justify-around container mx-auto sm:px-4 px-2 min-h-screen text-white"
  >
    <div class="titles flex flex-col items-center justify-center space-y-2">
      <p class="text-xl opacity-50">Welcome to</p>
      <img :src="Logo" alt="logo" />
    </div>
    <div class="form w-[500px] bg-dark-secondary rounded-md sm:p-6 p-5">
      <h1 class="title text-2xl font-bold mb-8">Authentication</h1>
      <div class="form-groups space-y-5">
        <div class="group flex flex-col space-y-2">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            id="username"
            placeholder="dasturchioka"
            class="outline-none bg-black border border-transparent transition focus:border-white rounded px-4 py-2"
          />
        </div>
        <div class="group flex flex-col space-y-2">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="password"
            placeholder="*******"
            class="outline-none bg-black border border-transparent transition focus:border-white rounded px-4 py-2"
          />
        </div>
      </div>
      <div class="buttons grid grid-cols-2 gap-5 mt-6">
        <AppButton @click="auth.register(user)" type="button" :purpleBg="false">
          REGISTER
        </AppButton>
        <AppButton @click="auth.login(user)" type="button" :purpleBg="true">
          LOGIN
        </AppButton>
      </div>
    </div>
    <footer class="footer font-semibold text-sm opacity-50">
      powered by
      <a target="_blank" href="https://dasturchioka.uz"
        ><span class="text-purple">@</span>dasturchioka</a
      >
    </footer>
  </div>
</template>

<style scoped>
@media (max-width: 540px) {
  .form {
    width: 100%;
  }

  .buttons {
    grid-template-columns: 1fr;
  }
}
</style>
