import { atom } from "recoil"

//** 로그인 */
export const authState = atom({
  key: "authState",
  default: false, // 기본 값은 로그인되지 않은 상태
})
