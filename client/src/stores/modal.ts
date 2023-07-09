import { defineStore } from "pinia";
import { ref } from "vue";

interface ModalInfo {
  show: Boolean;
  actionType: String;
  confirmed: Boolean | null;
  fn?: Function | null;
  args?: any;
}

export const useModal = defineStore("modal", () => {
  const info = ref<ModalInfo>({
    show: false,
    actionType: "",
    confirmed: null,
    fn: null,
  });

  async function askTwice(payload: {
    show: Boolean;
    actionType: String;
    fn: Function;
    args: any;
  }) {
    info.value.show = payload.show;
    info.value.actionType = payload.actionType;
    info.value.fn = payload.fn;
    info.value.args = payload.args;

    return;
  }

  async function cancel() {
    info.value = {
      show: false,
      actionType: "",
      confirmed: null,
      fn: null,
      args: null,
    };

    return;
  }

  async function confirm() {
    info.value.show = false;
    info.value.actionType = "";
    info.value.show = false;

    if (info.value.fn) {
      await info.value.fn(info.value.args);

      info.value = {
        show: false,
        actionType: "",
        confirmed: null,
        fn: null,
        args: null,
      };

      return;
    }
  }

  return {
    info,
    askTwice,
    confirm,
    cancel,
  };
});
