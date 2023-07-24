<script setup lang="ts">
import { ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";
import Trash from "./icons/Trash.vue";
import Tick from "./icons/Tick.vue";
import Edit from "./icons/Edit.vue";
import Times from "./icons/Times.vue";
import { useStatus } from "@/composables/useStatus";
import { usePriority } from "@/composables/usePriority";
import { useSlicedLetter } from "@/composables/useSlicedLetter";
import type { Tasks } from "@/interfaces/Tasks";

const { convertStatus, recoverStatus } = useStatus();
const { convertPriority, recoverPriority } = usePriority();
const { sliceLetter } = useSlicedLetter();

const showForm = ref(false);
const expandTask = ref(false);

const handleForm = () => {
  showForm.value = !showForm.value;
};

const handleExpandTask = () => {
  expandTask.value = !expandTask.value;
};

const props = defineProps<{
  page: "overview" | "dashboard";
  dashboardName: string;
  dashboardId: string;
  dashboardTask: Tasks;
  index: number;
}>();

let taskPayload = ref<Tasks>(props.dashboardTask);

const setStatusAndPriority = (
  mode: "status" | "priority",
  payload: string
): void => {
  if (mode === "priority") {
    console.log(taskPayload.value);
    taskPayload.value.priority = recoverPriority(payload);
    return;
  }

  if (mode === "status") {
    console.log(taskPayload.value);
    taskPayload.value.status = recoverStatus(payload);
    return;
  }
};
</script>

<template>
  <div class="board-element bg-dark-secondary transition py-2 px-4 rounded">
    <p
      class="dashboard-name mt-2 first-letter:uppercase opacity-30 text-[12px]"
    >
      {{ props.dashboardName }}
    </p>
    <div v-show="!showForm" class="title mt-2 flex flex-col">
      <div class="task-info top flex items-center">
        <h1 class="task-name text-xl font-bold">{{ dashboardTask.name }}</h1>
        <AppIconButton
          @click="handleForm"
          class="edit-icon transition flex items-center justify-center ml-2"
        >
          <Edit />
        </AppIconButton>
      </div>
      <div v-show="expandTask" class="expand-content">
        <p class="description text-sm opacity-50">
          {{ dashboardTask.description }}
        </p>
        <ul v-if="dashboardTask.subtasks.length" class="subtasks mt-4">
          <p class="text-sm">Subtasks</p>
          <li
            class="text-sm bg-gray bg-opacity-5 rounded px-2 py-1 mt-2"
            v-for="subtask in dashboardTask.subtasks"
          >
            - {{ subtask.task }}
          </li>
        </ul>
      </div>
      <button
        @click="handleExpandTask"
        class="toggle-btn mt-2 w-auto self-start px-2 text-sm opacity-60 border rounded"
        :class="{ 'mt-5': expandTask }"
      >
        {{ expandTask ? "Collapse" : "Expand" }}
      </button>
    </div>
    <form
      v-show="showForm"
      class="inline-edit-task mt-2 flex flex-col items-start"
    >
      <div class="form-groups flex flex-col w-full">
        <input
          type="text"
          placeholder="Edit and press Enter"
          v-model="dashboardTask.name"
          autocomplete="off"
          id="title"
          class="rounded text-sm py-2 pl-2 outline-none bg-transparent border border-gray-800 transition focus:border-white"
        />
        <textarea
          v-model="dashboardTask.description"
          class="rounded h-[100px] mt-3 max-h-[100px] py-2 pl-2 outline-none bg-transparent border border-gray-800 transition focus:border-white"
        ></textarea>
        <div
          v-if="dashboardTask.subtasks.length"
          class="subtasks mt-4 space-y-2"
        >
          <div
            v-for="subtask in dashboardTask.subtasks"
            class="form-group flex items-center space-x-2"
          >
            <input
              :required="true"
              type="text"
              v-model="subtask.task"
              class="outline-none bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded"
            />
            <AppIconButton type="button">
              <Trash />
            </AppIconButton>
          </div>
        </div>
        <AppIconButton
          type="button"
          class="text-gray w-full mt-2 flex items-center"
        >
          <p class="mr-2 text-lg">&plus;</p>
          Add new subtask
        </AppIconButton>
      </div>
      <div class="buttons flex items-center mt-2">
        <AppIconButton class="flex items-center text-sm px-4">
          <Tick class="mr-2 w-4" /> DONE
        </AppIconButton>
        <AppIconButton
          @click="handleForm"
          type="button"
          class="px-4 flex items-center text-sm"
        >
          <Times class="mr-2 w-4" />
          CLOSE
        </AppIconButton>
      </div>
    </form>
    <div class="bottom flex items-center justify-between mt-3">
      <div class="left flex items-center space-x-2">
        <TheStatus
          @status-selected="(e) => setStatusAndPriority('status', e)"
          :status-name="convertStatus(dashboardTask.status)"
          variant="full"
        />
        <ThePriority
          @priority-selected="(e) => setStatusAndPriority('status', e)"
          :priority-name="convertPriority(dashboardTask.priority)"
          variant="full"
        />
      </div>
      <div class="right flex items-center">
        <AppIconButton>
          <Trash />
        </AppIconButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-info:hover .edit-icon {
  @apply opacity-100;
}
</style>
