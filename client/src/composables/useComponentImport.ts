import { defineAsyncComponent } from "vue";

export const useComponentImport = () => {
  function getComponent(name: string) {
    const component = defineAsyncComponent(
      () => import(`@/components/${name}.vue`)
    );

    if (!component) {
      throw new Error("Component not found");
    }

    return component;
  }

  return { getComponent };
};
