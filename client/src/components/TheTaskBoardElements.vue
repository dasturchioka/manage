<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";
import Trash from "./icons/Trash.vue";
import Tick from "./icons/Tick.vue";
import Edit from "./icons/Edit.vue";
import { useTasks } from "@/stores/tasks";
import { useStatus } from "@/composables/useStatus";
import { usePriority } from "@/composables/usePriority";

const tasksStore = useTasks();
const { convertStatus } = useStatus();
const { convertPriority } = usePriority();

const props = defineProps<{
  page: "overview" | "dashboard";
  dashboardName: string;
  dashboardId: string;
}>();

const dashboardsTasks = computed(() => {
  return tasksStore.tasks.list.filter((task) => {
    return task.dashboardId === props.dashboardId;
  });
});

const elementRefs = ref([]);

const showForm = (index: number) => {
  elementRefs.value[index]?.children[1].classList.remove("flex");
  elementRefs.value[index]?.children[1].classList.add("hidden");

  elementRefs.value[index]?.children[2].classList.remove("hidden");
  elementRefs.value[index]?.children[2].classList.add("flex");
};

const closeForm = (index: number) => {
  elementRefs.value[index]?.children[1].classList.remove("hidden");
  elementRefs.value[index]?.children[1].classList.add("flex");

  elementRefs.value[index]?.children[2].classList.remove("flex");
  elementRefs.value[index]?.children[2].classList.add("hidden");
};

const showEditInput = ref(false);

const handleEditInput = () => {
  showEditInput.value = !showEditInput.value;
};
</script>

<template>
  <div class="elements space-y-4">
    <div
      v-for="(task, index) in dashboardsTasks"
      :key="index"
      ref="elementRefs"
      class="board-element bg-dark-secondary transition py-2 px-4 rounded"
    >
      <p
        class="dashboard-name mt-2 first-letter:uppercase opacity-30 text-[12px]"
      >
        {{ props.dashboardName }}
      </p>
      <h2 class="title mt-2 text-lg flex">
        {{ task.name }}
        <AppIconButton
          @click="showForm(index)"
          class="transition opacity-0 flex items-center justify-center ml-2"
        >
          <Edit />
        </AppIconButton>
      </h2>
      <form class="inline-edit-task mt-2 items-center hidden">
        <input
          type="text"
          placeholder="Edit and press Enter"
          v-model="task.name"
          autocomplete="off"
          id="title"
          class="rounded outline-none bg-transparent border border-gray-800 transition focus:border-white pl-1"
        />
        <div class="buttons flex items-center">
          <AppIconButton class="ml-2">
            <Tick />
          </AppIconButton>
          <AppIconButton
            @click="closeForm(index)"
            type="button"
            class="px-2 py-0"
          >
            <p class="text-2xl">&times;</p>
          </AppIconButton>
        </div>
      </form>
      <div class="bottom flex items-center justify-between mt-3">
        <div class="left flex items-center">
          <TheStatus :status-name="convertStatus(task.status)" variant="full" />
          <ThePriority :priority-name="convertPriority(task.priority)" variant="full" />
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
h2:hover button {
  @apply opacity-100;
}
</style>
