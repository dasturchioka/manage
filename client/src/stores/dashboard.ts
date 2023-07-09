import { defineStore } from "pinia";
import { type Dashboard } from "@/interfaces/Dashboard";
import { reactive, watch } from "vue";
import { useToast } from "vue-toastification";
import { dashboardInstance } from "@/http";
import { useUser } from "./user";
import { useRouter, useRoute } from "vue-router";
import { useModal } from "./modal";

export const useDashboard = defineStore("dashboard", () => {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const userStore = useUser();
  const modalStore = useModal();

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
      } else {
        toast("Something went wrong in dashboard store");
        return;
      }
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

      const res = await dashboardInstance.post(
        `/create/user-id/${userStore.userDetails.user.id}`,
        { name }
      );

      if (!res) return;

      const data = await res.data;

      if (data.dashboard) {
        await pushDashboard(data.dashboard);
        toast(data.msg);
        await getAllDashboards();
        router.push(`/dashboard/${data.dashboard.id}`);
      } else {
        toast("Something went wrong in dashboard store");
        return;
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  async function deleteDashboard(payload: String) {
    try {
      if (!payload.length) {
        toast("ID must be filled!");
        return;
      }

      const res = await dashboardInstance.delete(
        `/delete/user-id/${userStore.userDetails.user.id}`,
        { data: { id: payload } }
      );

      if (!res) return;

      const data = await res.data;

      if (data.status === "ok") {
        toast(data.msg);
        if (route.params.id === payload) {
          router.push("/");
        }
        if (dashboards.list.length === 1) {
          dashboards.list = [];
          return;
        }
        await getAllDashboards();
      } else {
        toast("Something went wrong in dashboard store");
        return;
      }
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
    dashboards,
    deleteDashboard,
  };
});
