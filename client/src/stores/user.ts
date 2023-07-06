import { defineStore } from "pinia";
import { reactive } from "vue";
import Cookies from "js-cookie";

export interface User {
  username: String;
  password: String;
  [key: string]: any;
}

export const useUser = defineStore("user", () => {
  const userDetails = reactive({
    user: { username: "", password: "" } as User,
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

  return {
    setUser,
    setToken,
  };
});
