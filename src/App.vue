<template>
  <!-- <CarouselOne ref="one" :images="images"></CarouselOne> -->
  <!-- <CarouselTwo ref="two" :images="images"></CarouselTwo> -->
  <CarouselThree ref="three" :images="images" :cycle="cycle"></CarouselThree>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import CarouselOne from './components/CarouselOne.vue';
import CarouselTwo from './components/CarouselTwo.vue';
import CarouselThree from './components/CarouselThree.vue';

export default defineComponent({
  name: 'App',
  components: {
    CarouselOne,
    CarouselTwo,
    CarouselThree
  },
  data() {
    return {
      images: [
        'https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
        'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
        'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
        'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'
      ],
      cycle: 3000
    };
  },
  mounted() {
    console.log('第三个新组件', this.$refs.threeNew);
    (this.$refs.three as typeof CarouselThree).slideTo(2);
    setTimeout(() => {
      this.images.push(this.images[1]);
      this.cycle = 1000;
    }, 2000);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
