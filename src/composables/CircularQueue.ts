import { ref } from 'vue';

interface CircularQueueOptions {
  interval?: number;
  startIndex?: number;
  immediate?: boolean;
}

function createCirularQueue<T>(items: T[], options?: CircularQueueOptions) {
  let timer: number | undefined = undefined;
  const queue = items;
  const intervalTime = ref(options?.interval || 3000);
  const currentIndex = ref(options?.startIndex || 0);
  const immediate = options?.immediate || true;
  const getCurrentIndex = (): number => {
    return currentIndex.value;
  };
  const getCurrentItem = (): T => {
    return queue[currentIndex.value];
  };
  const to = (index: number): void => {
    currentIndex.value = index;
  };
  const previous = (): void => {
    to((queue.length + currentIndex.value - 1) % queue.length);
  };
  const next = (): void => {
    to((currentIndex.value + 1) % queue.length);
  };
  const stop = (): void => {
    clearInterval(timer);
  };
  const start = (): void => {
    stop();
    timer = setInterval(() => next(), intervalTime.value);
  };
  const setIntervalTime = (newVal: number): void => {
    intervalTime.value = newVal;
    if (timer) {
      stop();
      start();
    }
  };
  if (immediate) start();
  return {
    currentIndex,
    getCurrentIndex,
    getCurrentItem,
    to,
    previous,
    next,
    stop,
    start,
    setIntervalTime
  };
}

export default createCirularQueue;
