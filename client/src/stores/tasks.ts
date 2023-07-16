import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { type Tasks } from "@/interfaces/Tasks";
import { tasksInstance } from "@/http";
import { useUser } from "./user";
import { useToast } from "vue-toastification";

export const useTasks = defineStore("tasks", () => {
  const userStore = useUser();
  const toast = useToast();
  const tasks = reactive({ list: [] as Tasks[] });

  async function setTasks(payload: Tasks[]) {
    tasks.list = payload;
  }

  async function getDashboardTasks(id: string) {
    try {
      const res = await tasksInstance.get(
        `/dashboard-tasks/${id}/user-id/${userStore.userDetails.user.id}`
      );

      if (!res) return;

      res.data.tasks.forEach(async (item: Tasks) => {
        tasks.list.push(item);
      });

      console.log(tasks.list);
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  return {
    getDashboardTasks,
    tasks,
    setTasks
  };
});
