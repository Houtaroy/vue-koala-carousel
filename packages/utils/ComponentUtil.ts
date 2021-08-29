import { VNode, isVNode, Slot, App, Plugin } from 'vue';

function getSlotVNodeChildren(slot: Slot | undefined): VNode[] {
  const result: VNode[] = [];
  if (!slot) {
    return result;
  }
  const slotChildren = slot()[0].children;
  (Array.isArray(slotChildren) ? slotChildren : [slotChildren]).map((child) => {
    if (isVNode(child)) result.push(child);
  });
  return result;
}

const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;
  c.install = function(app: App) {
    app.component(c.displayName || c.name, comp);
  };

  return comp as T & Plugin;
};

export default {
  getSlotVNodeChildren,
  withInstall
};
