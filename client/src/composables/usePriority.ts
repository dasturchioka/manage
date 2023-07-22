import { PRIORITIES } from "@/constants";
import { ref } from "vue";

export const usePriority = () => {
  const actualPriority = ref<string>("");
  const codePriority = ref<number>(0);

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

  const recoverPriority = (priority: string): number => {
    if (priority === PRIORITIES.LOW) {
      codePriority.value = 0;
      return codePriority.value;
    }
    if (priority === PRIORITIES.NORMAL) {
      codePriority.value = 1;
      return codePriority.value;
    }
    if (priority === PRIORITIES.HIGH) {
      codePriority.value = 2;
      return codePriority.value;
    }
    if (priority === PRIORITIES.URGENT) {
      codePriority.value = 3;
      return codePriority.value;
    }

    return codePriority.value;
  };

  return {
    convertPriority,
    recoverPriority,
  };
};
