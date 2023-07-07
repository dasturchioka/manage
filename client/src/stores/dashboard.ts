import { defineStore } from "pinia";
import { type Dashboard } from "@/interfaces/Dashboard";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { dashboardInstance } from "@/http";
import { useUser } from "./user";
import Cookies from "js-cookie";

export const useDashboard = defineStore("dashboard", () => {
  const toast = useToast();
  const userStore = useUser();

  const dashboard = reactive({
    details: {} as Dashboard,
  });

  async function getAllDashboards() {
    try {
      const res = await dashboardInstance.get(
        `/all/user-id/${userStore.userDetails.user.id}`
      );

      if (!res) return

      const data = await res.data

      if (data.dashboards) {
        
      }
    } catch (error) {}
  }
});
