import type { El } from "typeit/dist/types";
import TypeIt, { type Options as TypeItOptions } from "typeit";
import { type PropType, ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "TypeIt",
  props: {
    options: {
      type: Object as PropType<TypeItOptions>,
      default: () => ({}) as TypeItOptions
    }
  },
  setup(props, { slots, expose }) {
    function throwError(message: string) {
      throw new TypeError(message);
    }

    function getBrowserLanguage() {
      return navigator.language;
    }

    const typedItRef = ref<Element | null>(null);

    onMounted(() => {
      const $typed = typedItRef.value!.querySelector(".type-it") as El;

      if (!$typed) {
        const errorMsg =
          "Please make sure that there is only one element with a Class attribute with 'type-it'";
        throwError(errorMsg);
      }

      const typeIt = new TypeIt($typed, props.options).go();

      expose({
        typeIt
      });
    });

    return () => (
      <div ref={typedItRef}>
        {slots.default?.() ?? <span class="type-it"></span>}
      </div>
    );
  }
});
