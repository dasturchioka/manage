import { defineStore } from "pinia";
import { type Dashboard } from "@/interfaces/Dashboard";
import { computed, reactive } from "vue";
import { useToast } from "vue-toastification";
import { dashboardInstance } from "@/http";

import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";

export const useDashboard = defineStore("dashboard", () => {
  const router = useRouter();
  const route = useRoute();
  const toast = useToast();

  const dashboards = reactive({
    list: [] as Dashboard[],
  });

  const currentDashboard = reactive({
    details: {} as Dashboard,
  });

  const dashboardListLength = computed(() => {
    return dashboards.list.length;
  });

  const getOneDashboard = (id: string): Dashboard => {
    const foundDashboard = dashboards.list.find((item: any) => {
      return item.id === id;
    });

    currentDashboard.details = foundDashboard as Dashboard;

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
      const res = await dashboardInstance.get(`/all`);

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

      const res = await dashboardInstance.post(`/create`, { name });

      if (!res) return;

      const data = await res.data;

      if (data.dashboard) {
        await pushDashboard(data.dashboard);
        toast(data.msg);
        await getAllDashboards();
        router.push(`/dashboard/${data.dashboard.id}/${data.dashboard.name}`);

        return;
      }
      toast("Something went wrong in dashboard store");
      return;
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

      const res = await dashboardInstance.delete(`/delete`, {
        data: { id: payload },
      });

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
      const currentDashboard = getOneDashboard(id);

      if (!name.length) {
        toast("ID must be filled!");
        return;
      }

      const res = await dashboardInstance.put(`/edit`, {
        name,
        id: currentDashboard.id,
      });

      if (!res) return;

      if (res.data.status === "ok") {
        let foundObj = dashboards.list.find(
          (obj) => obj.id === res.data.dashboard.id
        );

        if (foundObj?.name) {
          foundObj.name = res.data.dashboard.name;

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
    currentDashboard,
  };
});
