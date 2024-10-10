import { atom } from "recoil"
import { Toast } from "types/component-types/toast-type"

export const toastListState = atom<Toast[]>({
  key: "toastListState",
  default: [],
})
