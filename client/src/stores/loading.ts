import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoading = defineStore("loading", () => {
  const loading = ref<Boolean>(false);

  function setLoading(payload: boolean): void {
    loading.value = payload;
  }

  return {
    loading,
    setLoading,
  };
});
