import { defineStore } from "pinia";
import { authInstance } from "@/http";
import { useToast } from "vue-toastification";
import { useUser, type User } from "./user";
import Cookies from "js-cookie";

const toast = useToast();

export const useAuth = defineStore("auth", () => {  
  async function register(payload: User) {
    try {
      if (!payload.username.length) {
        toast("Username must be filled!");
        return;
      } else if (!payload.password.length) {
        toast("Password must be filled");
        return;
      }

      const res = await authInstance.post("/register", { ...payload });

      if (!res) return;

      const data = res.data;

      if (data.token) {
        Cookies.set("token", data.token);
        Cookies.set("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    register,
  };
});
