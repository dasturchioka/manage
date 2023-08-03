import { TASK_STATUS } from "@/constants";
import { ref } from "vue";

export const useStatus = () => {
  const actualStatus = ref<string>("");
  const codeStatus = ref<number>(0);

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

  const recoverStatus = (status: string): number => {
    
    if (status === TASK_STATUS.TODO) {
      console.log(status);
      codeStatus.value = 0;
      return codeStatus.value;
    }
    if (status === TASK_STATUS.INPROGRESS) {
      codeStatus.value = 1;
      return codeStatus.value;
    }
    if (status === TASK_STATUS.COMPLETED) {
      codeStatus.value = 2;
      return codeStatus.value;
    }
    if (status === TASK_STATUS.FAILED) {
      codeStatus.value = 3;
      return codeStatus.value;
    }

    return codeStatus.value;
  };

  return {
    convertStatus,
    recoverStatus,
  };
};
