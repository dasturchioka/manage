import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { type Tasks } from "@/interfaces/Tasks";
import { tasksInstance } from "@/http";
import { useToast } from "vue-toastification";
import { useDashboard } from "./dashboard";

export const useTasks = defineStore("tasks", () => {
  const toast = useToast();
  const dashboardStore = useDashboard();
  const tasks = reactive({ list: [] as Tasks[] });

  async function setTasks(payload: Tasks[]) {
    tasks.list = payload;
  }

  async function pushTasks(payload: Tasks) {
    tasks.list.push(payload);
  }

  function dashboardTasks(id: string): Tasks[] {
    let dashboardId = ref(id);
    let dashboardTasks = computed(() => {
      return tasks.list.filter((task: Tasks) => {
        return task.dashboardId === dashboardId.value;
      });
    });

    return dashboardTasks.value;
  }

  async function createTask(payload: Tasks, dashboardId: string) {
    try {
      const res = await tasksInstance.post(`/create/${dashboardId}`, {
        ...payload,
      });

      if (!res) return;

      if (res.data.task) {
        await getAllTasks();

        return;
      }

      toast("Something went wrong in tasks store");
      return;
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        toast(error.response.data.msg);
      } else {
        toast(error.message);
      }
    }
  }

  async function getAllTasks() {
    try {
      const res = await tasksInstance.get(`/all`);

      if (!res) return;

      if (res.data.tasks) {
        await setTasks(res.data.tasks);

        console.log(tasks.list);

        return;
      }

      toast("Something went wrong in tasks store");

      return;
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        toast(error.response.data.msg);
      } else {
        toast(error.message);
      }
    }
  }

  async function getDashboardsTasks(dashboardId: string) {
    try {
      const res = await tasksInstance.get(`/dashboard-tasks/${dashboardId}`);

      if (!res) return;

      if (res.data.tasks) {
        res.data.tasks.forEach(async (task: Tasks) => {
          await pushTasks(task);
        });
        return
      } else {
        toast("Something went wrong in tasks store");
        return;
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response) {
        toast(error.response.data.msg);
      } else {
        toast(error.message);
      }
    }
  }

  return {
    tasks,
    setTasks,
    createTask,
    getAllTasks,
    getDashboardsTasks,
    dashboardTasks,
  };
});
