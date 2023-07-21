import { defineStore } from "pinia";
import { type Dashboard } from "@/interfaces/Dashboard";
import { computed, reactive } from "vue";
import { useToast } from "vue-toastification";
import { dashboardInstance } from "@/http";
import { useUser } from "./user";
import { useTasks } from "./tasks";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
import type { Tasks } from "@/interfaces/Tasks";

export const useDashboard = defineStore("dashboard", () => {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();
  const userStore = useUser();
  const tasksStore = useTasks();

  const dashboards = reactive({
    list: [] as Dashboard[],
  });

  const dashboardListLength = computed(() => {
    return dashboards.list.length;
  });

  const getOneDashboard = (id: string): Dashboard => {
    const foundDashboard = dashboards.list.find((item: any) => {
      return item.id === id;
    });

    return foundDashboard as Dashboard;
  };

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

        if (Cookies.get("dashboardsLength")) {
          Cookies.remove("dashboardsLength");
          Cookies.set("dashboardsLength", data.dashboards.length as string);
        } else {
          Cookies.set("dashboardsLength", data.dashboards.length as string);
        }
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

  async function editDashboard(name: string, id: string) {
    try {
      console.log(name, id);
      
      const currentDashboard = getOneDashboard(id);

      if (!name.length) {
        toast("ID must be filled!");
        return;
      }

      const res = await dashboardInstance.put(
        `/edit/user-id/${userStore.userDetails.user.id}`,
        { name, id: currentDashboard.id }
      );

      if (!res) return;

      if (res.data.status === "ok") {
        const indexOfEditedObj = dashboards.list.findIndex(
          (obj) => obj.id === res.data.dashboard.id
        );

        if (indexOfEditedObj > -1) {
          dashboards.list.splice(indexOfEditedObj, 1);
          await pushDashboard(res.data.dashboard);
          return;
        }
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
    dashboardListLength,
    editDashboard,
    getOneDashboard,
  };
});
