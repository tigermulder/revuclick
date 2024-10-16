import { atom, selector } from "recoil"
import { Campaign, CampaignLikeState } from "types/api-types/campaign-type"

//** 캠페인 리스트 */
// 1. 캠페인 리스트를 저장 아톰 /
export const campaignListState = atom<Campaign[]>({
  key: "campaignListState",
  default: [],
})

// 2. 선택된 카테고리 저장 아톰 (예: 패션, 뷰티 등 선택된 카테고리)
export const selectedCategoryState = atom<number>({
  key: "selectedCategoryState",
  default: 1, // 기본값은 '전체' 카테고리 (전체는 특별 처리)
})
// 글로벌 카테고리메뉴
export const isGlobalCategoryMenuOpenState = atom({
  key: "isGlobalCategoryMenuOpenState",
  default: false,
})

// 3. 캠페인 리스트필터 저장 아톰 /
export const campaignFilterState = atom<string>({
  key: "campaignFilterState",
  default: "최신순", // 기본값: 최신순
})

// 4. 카테고리 필터링된 캠페인 리스트 셀렉터
export const filteredByCategoryCampaignList = selector<Campaign[]>({
  key: "filteredByCategoryCampaignList",
  get: ({ get }) => {
    const campaigns = get(campaignListState)
    const selectedCategory = get(selectedCategoryState)

    if (selectedCategory === 1) {
      return campaigns
    }

    return campaigns.filter(
      (campaign) => campaign.categoryId === selectedCategory
    )
  },
})

// 5. 필터링된 캠페인 리스트를 정렬 기준에 따라 정렬하는 셀렉터
export const filteredAndSortedCampaignList = selector<Campaign[]>({
  key: "filteredAndSortedCampaignList",
  get: ({ get }) => {
    const campaigns = get(campaignListState)
    const selectedCategory = get(selectedCategoryState)
    const filter = get(campaignFilterState)
    const now = Date.now()

    // 카테고리 필터링
    let filteredCampaigns = campaigns
    if (selectedCategory !== 1) {
      filteredCampaigns = campaigns.filter(
        (campaign) => campaign.categoryId === selectedCategory
      )
    }

    // 정렬 로직
    const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
      const isAEnded = a.endAt ? new Date(a.endAt).getTime() < now : false
      const isBEnded = b.endAt ? new Date(b.endAt).getTime() < now : false

      // 마감 여부에 따라 정렬 (마감된 캠페인은 아래로 이동)
      if (isAEnded && !isBEnded) return 1
      if (!isAEnded && isBEnded) return -1

      // 마감 여부가 동일하면 선택한 정렬 기준에 따라 정렬
      switch (filter) {
        case "최신순":
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA // 최신순 정렬 (내림차순)
        case "마감순":
          const endDateA = a.endAt ? new Date(a.endAt).getTime() : Infinity
          const endDateB = b.endAt ? new Date(b.endAt).getTime() : Infinity
          return endDateA - endDateB // 마감순 정렬 (오름차순)
        case "인기순":
          const favoritesA = a.favorites ?? 0
          const favoritesB = b.favorites ?? 0
          const joinsA = a.joins ?? 0
          const joinsB = b.joins ?? 0
          // 인기순: 좋아요 수 기준으로 내림차순, 같으면 참여자 수 기준으로 내림차순
          return favoritesB - favoritesA || joinsB - joinsA
        default:
          return 0
      }
    })

    return sortedCampaigns
  },
})

// 찜한 캠페인 ID를 저장하는 아톰 (로컬 스토리지 연동)
const getStoredState = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key)
  return storedValue ? JSON.parse(storedValue) : defaultValue
}
export const campaignLikeState = atom({
  key: "campaignLikeState",
  default: getStoredState("campaignLikeState", {}), // 로컬 스토리지에서 값 불러옴
  effects: [
    ({ onSet }) => {
      // 상태가 변경될 때 로컬 스토리지에 저장
      onSet((newValue) => {
        localStorage.setItem("campaignLikeState", JSON.stringify(newValue))
      })
    },
  ],
})
