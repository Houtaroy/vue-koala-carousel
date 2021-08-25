<template>
  <div>
    <ul>
      <template v-for="(image, index) in images" :key="index">
        <li v-show="index === currentIndex">
          <img :src="image" />
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs, watch } from 'vue';
import createCirularQueue from '../composables/CircularQueue';

export default defineComponent({
  name: 'CarouselThree',
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
    const cirularQueue = createCirularQueue(props.images, { interval: props.cycle });
    watch(toRefs(props).cycle, (newValue) => {
      cirularQueue.setIntervalTime(newValue);
    });
    return {
      currentIndex: cirularQueue.currentIndex,
      slideTo: cirularQueue.to
    };
  }
});
</script>
