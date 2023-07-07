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

  const dashboards = reactive({
    list: [] as Dashboard[],
  });

  async function pushDashboard(payload: Dashboard) {
    dashboards.list.push(payload);
  }

  async function setDashboards(payload: Dashboard[]) {
    dashboards.list = payload;
  }

  async function getAllDashboards() {
    try {
      const res = await dashboardInstance.get(
        `/all/user-id/${userStore.userDetails.user.id}`
      );

      if (!res) return;

      const data = await res.data;

      if (data.dashboards) {
        await setDashboards(data.dashboards);
        return;
      }

      toast("Something went wrong in dashboard store");
      return;
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  async function createDashboard(name: string) {
    try {
      if (!name.length) {
        toast("Name must be filled!");
        return;
      }

      const res = await dashboardInstance.get(
        `/create/user-id/${userStore.userDetails.user.id}`
      );

      if (!res) return;

      const data = await res.data;

      if (data.dashboards) {
        await pushDashboard(data.dashboard);
        toast(data.msg);
        return;
      }

      toast("Something went wrong in dashboard store");
      return;
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  return {
    setDashboards,
    pushDashboard,
    getAllDashboards,
    createDashboard,
    dashboards
  };
});
