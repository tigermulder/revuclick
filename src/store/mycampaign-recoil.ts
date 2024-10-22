import { atom } from "recoil"
import { ReviewItem } from "@/types/api-types/review-type"

// ** 나의리뷰 참여 리스트 */
export const reviewListState = atom<ReviewItem[]>({
  key: "reviewListState",
  default: [],
})
