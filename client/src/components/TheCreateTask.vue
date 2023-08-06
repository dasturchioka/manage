<script lang="ts" setup>
import { reactive, ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";
import Trash from "./icons/Trash.vue";
import { useTasks } from "@/stores/tasks";
import { type Tasks } from "@/interfaces/Tasks";
import { useStatus } from "@/composables/useStatus";
import { usePriority } from "@/composables/usePriority";
import AppButton from "./UI/AppButton.vue";

const props = defineProps<{
  priority: number | 1;
  status: number | 0;
  showStatus: boolean;
  dashboardId: string;
}>();

const tasksStore = useTasks();
const { recoverStatus, convertStatus } = useStatus();
const { recoverPriority, convertPriority } = usePriority();

const showForm = ref(false);

const handleForm = (): void => {
  showForm.value = !showForm.value;
};

const subtasks = reactive<{ task: string; done: boolean }[]>([]);

const addSubTask = (): void => {
  subtasks.push({ task: "", done: false });
};

const removeSubTask = (index: number): void => {
  subtasks.splice(index, 1);
};

const task = reactive<Tasks>({
  name: "",
  description: "",
  priority: props.priority ? props.priority : 1,
  status: props.status ? props.status : 0,
  subtasks,
});

const statusSelected = (status: string): void => {
  task.status = recoverStatus(status);
};

const prioritySelected = (priority: string): void => {
  task.priority = recoverPriority(priority);
};

const submitForm = async (): Promise<void> => {
  await tasksStore.createTask(task, props.dashboardId);
  await tasksStore.createNewCurrentDashboardTask(props.dashboardId, task)
  showForm.value = false;

  console.log(props);

  task.name = "";
  task.description = "";
  task.priority = 0;
  task.status = 0;
  task.subtasks = [];
};
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="overflow-x-auto w-full overflow-auto"
  >
    <div class="w-full overflow-auto">
      <button
        type="button"
        @click="handleForm"
        class="create-btn text-sm opacity-30 flex items-center transition hover:bg-[#e5e7eb] hover:bg-opacity-[15%] px-2 py-1 rounded w-full"
      >
        <span class="text-lg mr-2">{{ !showForm ? `&plus;` : `&minus;` }}</span>
        {{ !showForm ? "Create new task" : "Discard" }}
      </button>
      <transition name="fade" mode="out-in">
        <div
          v-if="showForm"
          class="form-group mt-2 w-full overflow-auto min-h-[500px]"
        >
          <input
            required
            v-model="task.name"
            type="text"
            placeholder="Title"
            class="outline-none bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded"
          />
          <textarea
            required
            v-model="task.description"
            type="text"
            placeholder="Description"
            class="outline-none mt-5 bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded h-[150px] max-h-[150px]"
          ></textarea>
          <div class="options flex items-center">
            <TheStatus
              @status-selected="statusSelected"
              v-if="showStatus"
              :status-name="convertStatus(task.status)"
              variant="full"
            />
            <ThePriority
              @priority-selected="prioritySelected"
              :priority-name="convertPriority(task.priority)"
              variant="full"
            />
          </div>
          <div class="subtasks mt-4">
            <p class="subtasks-title">Subtasks</p>
            <ul
              v-if="subtasks.length"
              class="subtasks-list mt-2 list-disc space-y-2"
            >
              <div
                v-for="(subtask, index) in subtasks"
                :key="index"
                class="form-group flex items-center space-x-3"
              >
                <input
                  :required="true"
                  type="text"
                  v-model="subtask.task"
                  class="outline-none bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded"
                />
                <AppIconButton @click="removeSubTask(index)" type="button">
                  <Trash />
                </AppIconButton>
              </div>
            </ul>
            <AppIconButton
              @click="addSubTask"
              type="button"
              class="text-gray w-full mt-2 flex items-center"
            >
              <p class="mr-2 text-lg">&plus;</p>
              Add new subtask
            </AppIconButton>
          </div>
          <AppButton> CREATE </AppButton>
        </div>
      </transition>
    </div>
  </form>
</template>
