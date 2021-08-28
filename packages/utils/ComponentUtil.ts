import { VNode, Slots, isVNode, Slot  } from 'vue'

function getSlotVNodeChildren(slot: Slot | undefined): VNode[] {
    const result: VNode[] = [];
    if (!slot) {
        return result;
    }
    const slotChildren = slot()[0].children;
    (Array.isArray(slotChildren) ? slotChildren : [slotChildren]).map(child => {
        if (isVNode(child)) result.push(child)
    });
    return result;
}

export default {
    getSlotVNodeChildren
}