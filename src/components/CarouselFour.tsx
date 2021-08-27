import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'CarouselOne',
  props: {
    intervalTime: {
      type: Number,
      default: () => {
        return 3000;
      }
    }
  },
  setup(props, { slots }) {
    console.log('我是插槽', slots.default?.());
    return () => slots.default?.();
  }
});
