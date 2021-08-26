import { ref, Ref } from 'vue';

interface ICircularQueue<T> {
  queue: T[];
  intervalTime: number;
  currentIndex: Ref<number>;
  getCurrentIndex: () => number;
  getCurrentItem: () => T;
  to: (index: number) => void;
  previous: () => void;
  next: () => void;
  start: () => void;
  stop: () => void;
  setIntervalTime: (newVal: number) => void;
}

interface CircularQueueOptions {
  interval?: number;
  startIndex?: number;
  immediate?: boolean;
}

function createCirularQueue<T>(items: T[], options?: CircularQueueOptions): ICircularQueue<T> {
  let timer: number | undefined = undefined;
  let intervalTime = options?.interval || 3000;
  const queue = items;
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
    timer = setInterval(() => next(), intervalTime);
  };
  const setIntervalTime = (newVal: number): void => {
    intervalTime = newVal;
    if (timer) {
      stop();
      start();
    }
  };
  if (immediate) start();
  return {
    queue,
    intervalTime,
    currentIndex,
    getCurrentIndex,
    getCurrentItem,
    to,
    previous,
    next,
    stop,
    start,
    setIntervalTime
  } as ICircularQueue<T>;
}

export default createCirularQueue;
