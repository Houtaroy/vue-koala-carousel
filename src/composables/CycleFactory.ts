import { ref, Ref } from 'vue';

interface ICycle {
  length: Ref<number>;
  currentIndex: Ref<number>;
  intervalTime: number;
  getCurrentIndex: () => number;
  to: (index: number) => void;
  previous: () => void;
  next: () => void;
  start: () => void;
  stop: () => void;
  reset: () => void;
  setLength: (newVal: number) => void;
  setIntervalTime: (newVal: number) => void;
}

interface CycleOptions {
  intervalTime?: number;
  startIndex?: number;
}

function create(length: Ref<number>, options?: CycleOptions): ICycle {
  if (length.value <= 0) {
    throw Error('循环长度应大于0');
  }
  let timer: number | undefined = undefined;
  const currentIndex = ref(options?.startIndex || 0);
  let intervalTime = options?.intervalTime || 3000;
  const getCurrentIndex = (): number => {
    return currentIndex.value;
  };
  const to = (index: number): void => {
    currentIndex.value = index;
  };
  const previous = (): void => {
    to((length.value + currentIndex.value - 1) % length.value);
  };
  const next = (): void => {
    to((currentIndex.value + 1) % length.value);
  };
  const stop = (): void => {
    clearInterval(timer);
  };
  const start = (): void => {
    stop();
    timer = setInterval(() => next(), intervalTime);
  };
  const reset = (): void => {
    if (timer) {
      stop();
    }
    start();
  }
  const setLength = (newVal: number): void => {
    length.value = newVal;
    currentIndex.value = 0;
    reset()
  }
  const setIntervalTime = (newVal: number): void => {
    intervalTime = newVal;
    reset()
  };
  return {
    length,
    currentIndex,
    intervalTime,
    getCurrentIndex,
    to,
    previous,
    next,
    stop,
    start,
    reset,
    setLength,
    setIntervalTime
  };
}

export default {
  create
};
