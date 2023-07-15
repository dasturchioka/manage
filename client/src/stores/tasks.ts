import { defineStore } from "pinia";
import { reactive } from "vue";
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
        `/dashboard-tasks/user-id/${userStore.userDetails.user.id}`,
        { data: { id } }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
      toast("Something went wrong in dashboard store");
    }
  }

  return {
    getDashboardTasks,
  };
});
