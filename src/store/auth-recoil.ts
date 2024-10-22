import { atom } from "recoil"
import { AuthType } from "@/types/type"

export const authState = atom<AuthType>({
  key: "authState",
  default: {
    isLoggedIn: false,
    token: null,
  },
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const token = sessionStorage.getItem("authToken")
      if (token) {
        setSelf({
          isLoggedIn: true,
          token,
        })
      }
      onSet((newValue, _, isReset) => {
        if (isReset) {
          sessionStorage.removeItem("authToken")
        } else {
          sessionStorage.setItem("authToken", newValue.token || "")
        }
      })
    },
  ],
})
