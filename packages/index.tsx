import {
  defineComponent,
  toRefs,
  watch,
  onMounted,
  onUpdated,
  getCurrentInstance,
  ref,
  Plugin
} from 'vue';
import CycleFactory from './CycleFactory';
import ComponentUtil from './utils/ComponentUtil';

const VueKoalaCarousel = ComponentUtil.withInstall(
  defineComponent({
    name: 'VueKoalaCarousel',
    props: {
      intervalTime: {
        type: Number,
        default: () => {
          return 3000;
        }
      }
    },
    setup(props, { slots }) {
      const cycle = CycleFactory.create(
        ref(ComponentUtil.getSlotVNodeChildren(slots.default).length)
      );
      watch(toRefs(props).intervalTime, (newVal) => {
        cycle.setIntervalTime(newVal);
      });
      onMounted(() => {
        cycle.start();
      });
      onUpdated(() => {
        const itemsLength = ComponentUtil.getSlotVNodeChildren(
          getCurrentInstance()?.slots?.default
        ).length;
        if (cycle.length.value != itemsLength) cycle.setLength(itemsLength);
      });
      return {
        currentIndex: cycle.currentIndex,
        slideTo: cycle.to,
        slideNext: cycle.next,
        slidePrevious: cycle.previous
      };
    },
    render() {
      return ComponentUtil.getSlotVNodeChildren(this.$slots.default).map((item, index) => {
        return <div v-show={index === this.currentIndex}>{item}</div>;
      });
    }
  })
);

export default VueKoalaCarousel;
