import { defineStore } from "pinia";
import { reactive } from "vue";
import { type Task } from "@/interfaces/Task";


export const useTasks = defineStore("tasks", () => {
  const tasks = reactive({ list: [] as Task[] });

  
});
