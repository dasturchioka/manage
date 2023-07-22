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

  async function createTask(payload: Tasks, dashboardId: string) {
    try {
      const res = await tasksInstance.post(`/create/${dashboardId}`, {
        task: payload,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    tasks,
    setTasks,
    createTask,
  };
});
