import { ref } from "vue";
import reDrawer from "./index.vue";
import { useTimeoutFn } from "@vueuse/core";
import { withInstall } from "@pureadmin/utils";
import type {
  EventType,
  ArgsType,
  DrawerOptions,
  DrawerProps,
  ButtonProps
} from "./type";

const drawerStore = ref<DrawerOptions[]>([]);

const addDrawer = (options: DrawerOptions) => {
  const open = () =>
    drawerStore.value.push(Object.assign(options, { visible: true }));
  if (options?.openDelay) {
    useTimeoutFn(() => open(), options.openDelay);
  } else {
    open();
  }
};

const closeDrawer = (options: DrawerOptions, index: number, args?: any) => {
  drawerStore.value[index].visible = false;
  options.closeCallBack && options.closeCallBack({ options, index, args });

  const closeDelay = options?.closeDelay ?? 200;
  useTimeoutFn(() => {
    drawerStore.value.splice(index, 1);
  }, closeDelay);
};

const updateDrawer = (value: any, key = "title", index = 0) => {
  drawerStore.value[index][key] = value;
};

const closeAllDrawer = () => {
  drawerStore.value = [];
};

const ReDrawer = withInstall(reDrawer);

export type { EventType, ArgsType, DrawerOptions, DrawerProps, ButtonProps };
export {
  ReDrawer,
  drawerStore,
  addDrawer,
  closeDrawer,
  updateDrawer,
  closeAllDrawer
};
