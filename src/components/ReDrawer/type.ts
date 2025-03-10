import type { CSSProperties, VNode, Component } from "vue";

type DoneFn = (cancel?: boolean) => void;
type EventType = "open" | "close" | "openAutoFocus" | "closeAutoFocus";
type ArgsType = {
  command: "cancel" | "sure" | "close";
};
type ButtonType =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "text";

type DrawerProps = {
  visible?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  lockScroll?: boolean;
  beforeClose?: (done: DoneFn) => void;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  openDelay?: number;
  closeDelay?: number;
  class?: string;
  style?: CSSProperties;
  destoryOnClose?: boolean;
  modal?: boolean;
  direction?: "rtl" | "ltr" | "ttb" | "btt";
  size?: string | number;
  title?: string;
  withHeader?: boolean;
  modalClass?: string;
  zIndex?: number;
  headerAriaLevel?: string;
};

type PopConfirm = {
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: ButtonType;
  cancelButtonType?: ButtonType;
  icon?: string | Component;
  iconColor?: string;
  hideIcon?: boolean;
  hideAfter?: number;
  teleported?: boolean;
  persistent?: boolean;
  width?: string | number;
};

type BtnClickDrawer = {
  options?: DrawerOptions;
  index?: number;
};

type BtnClickButton = {
  btn?: ButtonProps;
  index?: number;
};

type ButtonProps = {
  label: string;
  size?: "large" | "default" | "small";
  type?: "primary" | "success" | "warning" | "danger" | "info";
  plain?: boolean;
  text?: boolean;
  bg?: boolean;
  link?: boolean;
  round?: boolean;
  circle?: boolean;
  popConfirm?: PopConfirm;
  loading?: boolean;
  loadingIcon?: string | Component;
  disabled?: boolean;
  icon?: string | Component;
  autofocus?: boolean;
  nativeType?: "button" | "submit" | "reset";
  autoInsertSpace?: boolean;
  color?: string;
  dark?: boolean;
  tag?: string | Component;
  btnClick?: ({
    drawer,
    button
  }: {
    drawer: BtnClickDrawer;
    button: BtnClickButton;
  }) => void;
};

interface DrawerOptions extends DrawerProps {
  props?: any;
  hideFooter?: boolean;
  popConfirm?: PopConfirm;
  sureBtnLoading?: boolean;
  headerRenderer?: ({
    close,
    titleId,
    titleClass
  }: {
    close: Function;
    titleId: string;
    titleClass: string;
  }) => VNode | Component;
  contentRenderer?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => VNode | Component;
  footerRenderer?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => VNode | Component;
  footerButtons?: ButtonProps[];
  open?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  close?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  closeCallBack?: ({
    options,
    index,
    args
  }: {
    options: DrawerOptions;
    index: number;
    args: any;
  }) => void;
  openAutoFocus?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  closeAutoFocus?: ({
    options,
    index
  }: {
    options: DrawerOptions;
    index: number;
  }) => void;
  beforeCancel?: (
    done: Function,
    {
      options,
      index
    }: {
      options: DrawerOptions;
      index: number;
    }
  ) => void;
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading
    }: {
      options: DrawerOptions;
      index: number;
      closeLoading: Function;
    }
  ) => void;
}

export type { ButtonProps, DrawerOptions, ArgsType, DrawerProps, EventType };
