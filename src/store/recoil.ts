import { atom, selector } from "recoil"
import { Campaign } from "types/api-types/campaign-type"

//** 로그인 */
export const authState = atom({
  key: "authState",
  default: false, // 기본 값은 로그인되지 않은 상태
})

//** 캠페인 리스트 */
// 1. 캠페인 리스트를 저장 아톰 /
export const campaignListState = atom<Campaign[]>({
  key: "campaignListState",
  default: [],
})
// 2. 캠페인 리스트필터 저장 아톰 /
export const campaignFilterState = atom<string>({
  key: "campaignFilterState",
  default: "최신순",
})
// 3. 필터링 및 정렬된 캠페인 리스트를 반환하는 Recoil 셀렉터
export const filteredCampaignList = selector<Campaign[]>({
  key: "filteredCampaignList",
  get: ({ get }) => {
    const campaigns = get(campaignListState) // 현재 캠페인 리스트
    const filter = get(campaignFilterState) // 필터링 기준

    // 현재 시간을 가져옴
    const now = new Date().getTime()

    // 깊은 복사 후 필터링 및 정렬 로직 적용
    const sortedCampaigns = [...campaigns] // 원본 배열을 복사

    // 마감된 캠페인을 맨 아래로 보내는 조건 추가
    const sortedWithEndCheck = sortedCampaigns.sort((a, b) => {
      const isAEnded = new Date(a.endAt || 0).getTime() < now
      const isBEnded = new Date(b.endAt || 0).getTime() < now

      // 두 캠페인 중 하나라도 마감된 경우
      if (isAEnded && !isBEnded) return 1 // a가 마감된 경우 뒤로
      if (!isAEnded && isBEnded) return -1 // b가 마감된 경우 뒤로

      // 둘 다 마감되었거나 둘 다 마감되지 않은 경우, 다른 기준으로 정렬
      switch (filter) {
        case "최신순":
          const dateA = new Date(a.createdAt || 0).getTime()
          const dateB = new Date(b.createdAt || 0).getTime()
          return dateB - dateA // 최신순 정렬
        case "마감순":
          const endDateA = new Date(a.endAt || 0).getTime()
          const endDateB = new Date(b.endAt || 0).getTime()
          return endDateA - endDateB // 마감순 정렬
        case "인기순":
          return b.favorites - a.favorites || b.joins - a.joins // 인기순 정렬
        default:
          return 0 // 기본적으로 정렬 없이 반환
      }
    })

    return sortedWithEndCheck
  },
})

// ** 찜한 캠페인 ID 리스트 */
export const campaignLikeState = atom<{ [categoryId: number]: number[] }>({
  key: "campaignLikeState",
  default: {}, // 카테고리별로 찜한 캠페인 ID 리스트를 관리하는 객체
})
