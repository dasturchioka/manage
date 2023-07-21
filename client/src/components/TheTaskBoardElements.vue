<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
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
import { tasksInstance } from "@/http";
import { useUser } from "@/stores/user";
import type { Tasks } from "@/interfaces/Tasks";

const userStore = useUser();

const { convertStatus } = useStatus();
const { convertPriority } = usePriority();
const { sliceLetter } = useSlicedLetter();

const props = defineProps<{
  page: "overview" | "dashboard";
  dashboardName: string;
  dashboardId: string;
}>();

const tasks = ref<Tasks[]>([]);

async function getDashboardTasks(id: string) {
  try {
    const res = await tasksInstance.get(
      `/dashboard-tasks/${id}/user-id/${userStore.userDetails.user.id}`
    );

    if (!res) return;

    tasks.value = res.data.tasks;
    console.log(tasks.value);
    return;
  } catch (error) {
    console.log(error);
  }
}

const elementRefs = ref([]);

const showForm = (index: number) => {
  const title = elementRefs.value[index]?.children[1];
  const form = elementRefs.value[index]?.children[2];

  title.classList.remove("flex");
  title.classList.add("hidden");

  form.classList.remove("hidden");
  form.classList.add("flex");
};

const closeForm = (index: number) => {
  const title = elementRefs.value[index]?.children[1];
  const form = elementRefs.value[index]?.children[2];

  title.classList.remove("hidden");
  title.classList.add("flex");

  form.classList.remove("flex");
  form.classList.add("hidden");
};

const isDataFetching = ref(false);

onMounted(async () => {
  if (!isDataFetching.value) {
    isDataFetching.value = true;

    try {
      await getDashboardTasks(props.dashboardId);
    } catch (error) {
      console.log(error);
    }

    isDataFetching.value = false;
  }
});
</script>

<template>
  <div v-if="tasks.length" class="elements space-y-4">
    <div
      v-for="(task, index) in tasks"
      :key="task.id"
      ref="elementRefs"
      class="board-element bg-dark-secondary transition py-2 px-4 rounded"
    >
      <p
        class="dashboard-name mt-2 first-letter:uppercase opacity-30 text-[12px]"
      >
        {{ props.dashboardName }}
      </p>
      <div class="title mt-2 flex flex-col">
        <div class="task-info top flex">
          <h1 class="task-name text-lg">{{ task.name }}</h1>
          <AppIconButton
            @click="showForm(index)"
            class="edit-icon transition opacity-0 flex items-center justify-center ml-2"
          >
            <Edit />
          </AppIconButton>
        </div>
        <p class="description text-sm opacity-50 mt-2">
          {{ sliceLetter(43, task.description) }}
        </p>
      </div>
      <form class="inline-edit-task mt-2 flex-col items-start hidden">
        <div class="form-groups flex flex-col w-full">
          <input
            type="text"
            placeholder="Edit and press Enter"
            v-model="task.name"
            autocomplete="off"
            id="title"
            class="rounded text-sm py-2 pl-2 outline-none bg-transparent border border-gray-800 transition focus:border-white"
          />
          <textarea
            v-model="task.description"
            class="rounded h-[100px] mt-3 max-h-[100px] py-2 pl-2 outline-none bg-transparent border border-gray-800 transition focus:border-white"
          ></textarea>
        </div>
        <div class="buttons flex items-center mt-2">
          <AppIconButton class="flex items-center px-4">
            <Tick class="mr-2" /> DONE
          </AppIconButton>
          <AppIconButton
            @click="closeForm(index)"
            type="button"
            class="px-4 flex items-center"
          >
            <Times class="mr-2" />
            CLOSE
          </AppIconButton>
        </div>
      </form>
      <div class="bottom flex items-center justify-between mt-3">
        <div class="left flex items-center">
          <TheStatus :status-name="convertStatus(task.status)" variant="full" />
          <ThePriority
            :priority-name="convertPriority(task.priority)"
            variant="full"
          />
        </div>
        <div class="right flex items-center">
          <AppIconButton>
            <Trash />
          </AppIconButton>
          <AppIconButton>
            <Tick />
          </AppIconButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-info:hover .edit-icon {
  @apply opacity-100;
}
</style>
