import { defineStore } from "pinia";
import { reactive } from "vue";
import Cookies from "js-cookie";

export interface User {
  username: String;
  password: String;
  [key: string]: any;
}

export const useUser = defineStore("user", () => {
  const user = reactive<User>({ username: "", password: "" });

  
});
