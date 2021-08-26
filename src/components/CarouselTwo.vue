<template>
  <div>
    <ul>
      <template v-for="(image, index) in images" :key="index">
        <li v-show="index === selectedIndex">
          <img :src="image" />
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'CarouselTwo',
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    },
    cycle: {
      type: Number,
      default: () => {
        return 3000;
      }
    }
  },
  setup(props) {
    const selectedIndex = ref(0);
    let timer: number | undefined = undefined;
    const getSelectedItemIndex = (): number => {
      return selectedIndex.value;
    };
    const getSelectedItem = (): string => {
      return props.images[selectedIndex.value];
    };
    const slideTo = (index: number): void => {
      selectedIndex.value = index;
    };
    const slidePrevious = (): void => {
      slideTo((props.images.length + selectedIndex.value - 1) % props.images.length);
    };
    const slideNext = (): void => {
      slideTo((selectedIndex.value + 1) % props.images.length);
    };
    const stop = (): void => {
      clearInterval(timer);
    };
    const start = (): void => {
      stop();
      timer = setInterval(() => slideNext(), props.cycle);
    };
    onMounted(() => {
      start();
    });
    return {
      selectedIndex,
      timer,
      getSelectedItem,
      getSelectedItemIndex,
      slideTo,
      slidePrevious,
      slideNext,
      stop,
      start
    };
  }
});
</script>
<style scoped></style>
