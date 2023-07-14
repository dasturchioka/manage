<script lang="ts" setup>
import { reactive, ref } from "vue";
import AppIconButton from "./UI/AppIconButton.vue";
import ThePriority from "./ThePriority.vue";
import TheStatus from "./TheStatus.vue";

const showForm = ref(false);

const handleForm = () => {
  showForm.value = !showForm.value;
};

const subTasks = reactive<{ task: string; done: boolean }[]>([]);

const addSubTask = () => {
  subTasks.push({ task: "", done: false });
};
</script>

<template>
  <form class="overflow-x-auto w-full overflow-auto">
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
        <div v-if="showForm" class="form-group mt-2 w-full overflow-auto min-h-[500px]">
          <input
            type="text"
            placeholder="Title"
            class="outline-none bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded"
          />
          <textarea
            type="text"
            placeholder="Description"
            class="outline-none mt-5 bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded h-[150px] max-h-[150px]"
          ></textarea>
          <div class="options flex items-center">
            <TheStatus status-name="todo" variant="full"/>
            <ThePriority  priority-name="high" variant="full"/>
          </div>
          <p class="subtasks-title mt-4">Subtasks</p>
          <div v-if="subTasks.length" class="subtasks">
            <ul class="subtasks mt-2 list-disc space-y-2">
              <input
                v-for="(subtask, index) in subTasks"
                :key="index"
                type="text"
                v-model="subtask.task"
                class="outline-none bg-transparent px-3 py-1 w-full border border-gray-700 transition focus:border-white rounded"
              />
            </ul>
          </div>
          <AppIconButton
            @click="addSubTask"
            type="button"
            class="text-gray w-full mt-2 flex items-center"
          >
            <p class="mr-2 text-lg">&plus;</p>
            Add new subtask
          </AppIconButton>
        </div>
      </transition>
    </div>
  </form>
</template>
