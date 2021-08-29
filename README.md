# Vue Koala Carousel

a simple carousel for vue3

## Getting started

### Installation

use `yarn` or `pnpm`:

```
yarn add vue-koala-carousel

# or use pnpm
pnpm add vue-koala-carousel
```
### Basic Using

global use

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VueKoalaCarousel from 'vue-koala-carousel';

const app = createApp(App);
app.use(VueKoalaCarousel);

app.mount('#app');
```

basic

```html
<template>
  <vue-koala-carousel ref="carousel" :intervalTime="intervalTime">
    <img src="1.jpg">
    <img src="2.jpg">
    <img src="3.jpg">
  </vue-koala-carousel>
</template>
```

example is [here](https://github.com/Houtaroy/vue-koala-carousel/tree/main/examples)