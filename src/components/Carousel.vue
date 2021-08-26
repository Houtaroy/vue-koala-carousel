<template>
  <ul>
    <template v-for="(image, index) in images" :key="index">
      <li v-show="index === selectedIndex">
        <img :src="image" />
      </li>
    </template>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface CarouselData {
  selectedIndex: number;
  timer: number | undefined;
}

export default defineComponent({
  name: 'CarouselOne',
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
  data() {
    return {
      selectedIndex: 0,
      timer: undefined
    } as CarouselData;
  },
  methods: {
    getSelectedItemIndex(): number {
      return this.selectedIndex;
    },
    getSelectedItem(): string {
      return this.$props.images[this.selectedIndex];
    },
    slideTo(index: number): void {
      this.selectedIndex = index;
    },
    slidePrevious(): void {
      this.slideTo(
        (this.$props.images.length + this.selectedIndex - 1) % this.$props.images.length
      );
    },
    slideNext(): void {
      this.slideTo((this.selectedIndex + 1) % this.$props.images.length);
    },
    stop(): void {
      clearInterval(this.timer);
    },
    start(): void {
      this.stop();
      this.timer = setInterval(() => this.slideNext(), this.$props.cycle);
    }
  },
  mounted() {
    this.start();
  }
});
</script>
<style scoped></style>
