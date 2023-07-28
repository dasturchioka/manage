import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { type Tasks } from "@/interfaces/Tasks";
import { tasksInstance } from "@/http";
import { useToast } from "vue-toastification";

export const useTasks = defineStore("tasks", () => {
  const toast = useToast();
  const tasks = reactive({ list: [] as Tasks[] });

  async function setTasks(payload: Tasks[]): Promise<void> {
    tasks.list = payload;
  }

  async function pushTasks(payload: Tasks): Promise<void> {
    tasks.list.push(payload);
  }

  async function changeOneTask(id: string, payload: Tasks): Promise<void> {
    let foundObj = tasks.list.find((task: Tasks) => {
      return task.id === id;
    });

    foundObj = { ...payload };
  }

  async function setStatusOrPriority(
    field: "status" | "priority",
    value: number,
    id: string
  ): Promise<void> {
    let foundObj = tasks.list.find((task: Tasks) => {
      return task.id === id;
    });

    if (field === "priority" && foundObj?.priority) {
      foundObj.priority = value;

      return;
    }

    if (field === "status" && foundObj?.status) {
      foundObj.status = value;

      return;
    }
  }

  function dashboardTasks(id: string, status: number): Tasks[] {
    let dashboardId = ref(id);
    let dashboardStatus = ref(status);

    let dashboardTasks = computed(() => {
      return tasks.list.filter((task: Tasks) => {
        if (dashboardStatus.value >= 0) {
          return (
            task.dashboardId === dashboardId.value &&
            task.status === dashboardStatus.value
          );
        } else {
          return task.dashboardId === dashboardId.value;
        }
      });
    });

    return dashboardTasks.value;
  }

  async function createTask(
    payload: Tasks,
    dashboardId: string
  ): Promise<void> {
    try {
      await pushTasks(payload);
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

  async function getAllTasks(): Promise<void> {
    try {
      const res = await tasksInstance.get(`/all`);

      if (!res) return;

      if (res.data.tasks) {
        await setTasks(res.data.tasks);

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

  async function updateTask(payload: Tasks): Promise<void> {
    try {
      await changeOneTask(payload.id as string, payload);

      const res = await tasksInstance.put(`/update/${payload.id}`, {
        ...payload,
      });

      if (!res) return;

      if (res.data.task) {
        toast(res.data.msg);
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

  async function updateStatusOrPriority(
    field: "status" | "priority",
    value: number,
    taskId: string
  ): Promise<void> {
    try {
      const res = await tasksInstance.put(
        `/update-status-priority/${field}/${taskId}`,
        { field: value }
      );

      if (!res) return;

      if (res.data.task) {
        await setStatusOrPriority(field, value, taskId);

        return;
      }

      toast("Something went wrong in tasks store");
      return;
    } catch (error: any) {
      if (error?.response) {
        toast(error.response.data.msg);
      } else {
        toast(error.message);
      }
    }
  }

  async function deleteTask(taskId: string): Promise<void> {
    try {
      const res = await tasksInstance.delete(`/delete-task/${taskId}`);

      if (!res) return;

      if (res.data.tasks) {
        await setTasks(res.data.tasks);
        toast(res.data.msg);
        return;
      }

      toast("Something went wrong in tasks store");
      return;
    } catch (error: any) {
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
    dashboardTasks,
    updateTask,
    updateStatusOrPriority,
    deleteTask,
  };
});
