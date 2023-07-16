import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { type Task } from "@/interfaces/Task";
import { tasksInstance } from "@/http";
import { useUser } from "./user";
import { useToast } from "vue-toastification";

export const useTasks = defineStore("tasks", () => {
  const userStore = useUser();
  const toast = useToast();
  const tasks = reactive({ list: [] as Task[] });

  async function setTasks(payload: Task[]) {
    tasks.list = payload;
  }

  async function pushTask(payload: Task) {
    tasks.list.push(payload);
  }

  async function getDashboardTasks(id: string) {
    try {
      const res = await tasksInstance.get(
        `/dashboard-tasks/${id}/user-id/${userStore.userDetails.user.id}`
      );

      if (!res) return;

      res.data.tasks.forEach(async (item: Task) => {
        await pushTask(item);
      });

      console.log(tasks.list);
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  async function dashboardTasks(id: string) {
    const filteredOnes = tasks.list.filter((task: Task) => {
      return task.id === id;
    });

    return filteredOnes;
  }

  return {
    getDashboardTasks,
    tasks,
    dashboardTasks,
  };
});
