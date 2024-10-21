import { atom } from "recoil"
// 공유 모달 상태 관리
export const isShareModalOpenState = atom({
  key: "isShareModalOpenState",
  default: false,
})

// 모달 상태 관리
export const isModalOpenState = atom({
  key: "isModalOpenState",
  default: false,
})
