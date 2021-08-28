<template>
  <Carousel ref="carousel" :intervalTime="intervalTime">
    <img v-for="(image, index) in images" :key="index" :src="image" />
  </Carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Carousel from 'vue-koala-carousel';

export default defineComponent({
  name: 'App',
  components: {
    Carousel
  },
  data() {
    return {
      images: [
        'https://p5.ssl.qhimg.com/t0119c74624763dd070.png',
        'https://p4.ssl.qhimg.com/t01adbe3351db853eb3.jpg',
        'https://p2.ssl.qhimg.com/t01645cd5ba0c3b60cb.jpg',
        'https://p4.ssl.qhimg.com/t01331ac159b58f5478.jpg'
      ],
      intervalTime: 3000
    };
  },
  mounted() {
    (this.$refs.carousel as typeof Carousel).slideTo(2);
    setTimeout(() => {
      this.images.push(this.images[1]);
      this.intervalTime = 1000;
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
