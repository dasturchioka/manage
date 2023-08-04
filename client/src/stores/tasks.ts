import { defineStore } from "pinia";
import { ref } from "vue";
import { type Tasks } from "@/interfaces/Tasks";
import { tasksInstance } from "@/http";
import { useToast } from "vue-toastification";

interface DashboardTasks {
  [propName: string]: Tasks[];
}

export const useTasks = defineStore("tasks", () => {
  const toast = useToast();

  const dashboardTasks = ref<DashboardTasks>({});
  const currentDashboardTasks = ref<Tasks[]>([]);

  async function setCurrentDashboardTasks(payload: Tasks[]) {
    currentDashboardTasks.value = payload;
  }

  async function setDashboardTasks(payload: DashboardTasks) {
    dashboardTasks.value = payload;
  }

  async function createNewDashboardTask(dashboardId: string, payload: Tasks) {
    if (!dashboardTasks.value[dashboardId]) {
      dashboardTasks.value[dashboardId] = [];
    }

    dashboardTasks.value[dashboardId].push(payload);
  }

  async function deleteTaskFromStore(
    dashboardId: string,
    taskId: string
  ): Promise<void> {
    console.log(dashboardId);

    const indexInDashboardTasks = dashboardTasks.value[dashboardId].findIndex(
      (task: Tasks) => task.id === taskId
    );

    dashboardTasks.value[dashboardId].splice(indexInDashboardTasks, 1);

    if (currentDashboardTasks.value.length) {
      if (dashboardId === currentDashboardTasks.value[0].dashboardId) {
        const indexInCurrentTasks = currentDashboardTasks.value.findIndex(
          (task: Tasks) => task.id === taskId
        );

        currentDashboardTasks.value.splice(indexInCurrentTasks, 1);
      }
    }
  }

  async function changeOneTask(
    id: string,
    payload: Tasks,
    dashboardId: string
  ): Promise<void> {
    let foundArray = dashboardTasks.value[dashboardId];
    let foundTask = foundArray.find((item: Tasks) => {
      item.id === id;
    });

    foundTask = { ...payload };
  }

  async function setStatusOrPriority(
    field: "status" | "priority",
    value: number,
    id: string,
    dashboardId: string
  ): Promise<void> {
    let foundArray = dashboardTasks.value[dashboardId];
    let foundTask = foundArray.find((item: Tasks) => {
      item.id === id;
    });

    if (field === "priority" && foundTask?.priority) {
      foundTask.priority = value;

      return;
    }

    if (field === "status" && foundTask?.status) {
      foundTask.status = value;

      return;
    }
  }

  async function getDashboardTasks(dashboardId: string) {
    try {
      const res = await tasksInstance.get(`/dashboard-tasks/${dashboardId}`);

      if (res) {
        await setCurrentDashboardTasks(res.data.tasks);
        return;
      }

      currentDashboardTasks.value = [];
      return;
    } catch (error: any) {
      if (error?.response) {
        toast(error.response.data.msg);
      } else {
        toast(error.message);
      }
    }
  }

  async function createTask(
    payload: Tasks,
    dashboardId: string
  ): Promise<void> {
    try {
      await createNewDashboardTask(dashboardId, payload);
      const res = await tasksInstance.post(`/create/${dashboardId}`, {
        ...payload,
      });

      if (res?.data?.task) {
        await getAllTasks();
      } else {
        toast("Something went wrong in tasks store");
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

  async function getAllTasks(): Promise<void> {
    try {
      const res = await tasksInstance.get("/all");

      if (res?.data?.tasks) {
        await setDashboardTasks(res.data.tasks);
      } else {
        toast("Something went wrong in tasks store");
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

  async function updateTask(payload: Tasks): Promise<void> {
    try {
      await changeOneTask(
        payload.id as string,
        payload,
        payload.dashboardId as string
      );

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
        await setStatusOrPriority(
          field,
          value,
          taskId,
          res.data.task.dashboardId
        );
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

  async function deleteTask(
    taskId: string,
    dashboardId: string
  ): Promise<void> {
    try {
      await deleteTaskFromStore(dashboardId, taskId);
      const res = await tasksInstance.delete(`/delete-task/${taskId}`);

      if (!res) return;

      if (res.data.tasks) {
        await setDashboardTasks(res.data.tasks);

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

  return {
    createTask,
    getAllTasks,
    updateTask,
    updateStatusOrPriority,
    deleteTask,
    dashboardTasks,
    currentDashboardTasks,
    setCurrentDashboardTasks,
    getDashboardTasks,
  };
});
