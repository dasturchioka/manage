import { PRIORITIES } from "@/constants";
import { ref } from "vue";

export const usePriority = () => {
  const actualPriority = ref("");

  const convertPriority = (code: number): string => {
    if (code === 0) {
      actualPriority.value = PRIORITIES.LOW;
      return actualPriority.value;
    }
    if (code === 1) {
      actualPriority.value = PRIORITIES.NORMAL;
      return actualPriority.value;
    }

    if (code === 2) {
      actualPriority.value = PRIORITIES.HIGH;
      return actualPriority.value;
    }

    if (code === 3) {
      actualPriority.value = PRIORITIES.URGENT;
      return actualPriority.value;
    }

    return actualPriority.value;
  };

  return {
    convertPriority,
  };
};
