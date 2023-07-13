import { defineStore } from "pinia";
import { reactive } from "vue";
import Cookies from "js-cookie";
import { userInstance } from "@/http";
import { useToast } from "vue-toastification";
import { type User } from "@/interfaces/User";
import { AxiosError } from "axios";

const toast = useToast();

export const useUser = defineStore("user", () => {
  const userDetails = reactive({
    user: { username: "", password: "", dashboards: [] } as User,
    token: "",
  });

  async function setUser(payload: User) {
    if (Cookies.get("user")) {
      Cookies.remove("user");
      Cookies.set("user", JSON.stringify(payload));
      userDetails.user = payload;
    } else {
      Cookies.set("user", JSON.stringify(payload));
      userDetails.user = payload;
    }
  }

  async function setToken(token: string) {
    if (Cookies.get("token")) {
      Cookies.remove("token");
      Cookies.set("token", token);
      userDetails.token = token;
    } else {
      Cookies.set("token", token);
      userDetails.token = token;
    }
  }

  async function getUser() {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) return;

      const parsedUser = JSON.parse(userCookie);

      const res = await userInstance.get(`/${parsedUser.id}`);

      const data = res.data;

      if (data.token) {
        Cookies.set("token", data.token);
        Cookies.set("user", JSON.stringify(data.user));
        await setUser(data.user);
        await setToken(data.token);

        return;
      }
    } catch (error) {
      toast("Something went wrong in user store");
    }
  }

  return {
    setUser,
    setToken,
    getUser,
    userDetails,
  };
});
