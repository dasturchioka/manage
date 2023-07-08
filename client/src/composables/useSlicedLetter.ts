import { computed } from "vue";
export function useSlicedLetter() {
  const sliceLetter = (limit: number, content: string) => {
    const letter = computed(() => {
      if (content.length > 17) {
        return content.slice(0, limit) + "...";
      } else {
        return content;
      }
    });

    return letter.value;
  };

  return { sliceLetter }; 
}
