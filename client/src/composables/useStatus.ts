import { TASK_STATUS } from "@/constants";
import { ref } from "vue";

export const useStatus = () => {
  const actualStatus = ref("");

  const convertStatus = (code: number): string => {
    if (code === 0) {
      actualStatus.value = TASK_STATUS.TODO;
      return actualStatus.value;
    }
    if (code === 1) {
      actualStatus.value = TASK_STATUS.INPROGRESS;
      return actualStatus.value;
    }

    if (code === 2) {
      actualStatus.value = TASK_STATUS.COMPLETED;
      return actualStatus.value;
    }

    if (code === 3) {
      actualStatus.value = TASK_STATUS.FAILED;
      return actualStatus.value;
    }

    return actualStatus.value;
  };

  return {
    convertStatus,
  };
};
