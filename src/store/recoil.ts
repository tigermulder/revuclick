import { atom, selector } from "recoil"
import { Campaign } from "types/api-types/campaign-type"

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
// 3. 필터링 및 정렬된 캠페인 리스트를 반환하는 Recoil 셀렉터 /
export const filteredCampaignList = selector<Campaign[]>({
  key: "filteredCampaignList",
  get: ({ get }) => {
    const campaigns = get(campaignListState) // 현재 캠페인 리스트
    const filter = get(campaignFilterState) // 필터링 기준

    // 깊은 복사 후 필터링 및 정렬 로직 적용
    const sortedCampaigns = [...campaigns] // 원본 배열을 복사

    switch (filter) {
      case "최신순":
        return sortedCampaigns.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime()
          const dateB = new Date(b.createdAt || 0).getTime()
          return dateB - dateA
        })

      case "마감순":
        return sortedCampaigns.sort((a, b) => {
          const dateA = new Date(a.endAt || 0).getTime()
          const dateB = new Date(b.endAt || 0).getTime()
          return dateA - dateB
        })

      case "인기순":
        return sortedCampaigns.sort((a, b) => {
          // 인기순은 favorites가 높은 순, 같은 경우 joins가 높은 순으로 정렬
          return b.favorites - a.favorites || b.joins - a.joins
        })

      default:
        return sortedCampaigns // 기본적으로 정렬 없이 반환
    }
  },
})

// ** 찜한 캠페인 ID 리스트 */
export const campaignLikeState = atom<number[]>({
  key: "campaignLikeState",
  default: [], // 찜한 캠페인 ID 리스트
});