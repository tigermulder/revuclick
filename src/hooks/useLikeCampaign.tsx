// src/hooks/useLikeCampaign.ts
import { useRecoilState } from "recoil"
import { campaignLikeState } from "store/mainpage-recoil"

const useLikeCampaign = (campaignId: number, categoryId: number) => {
  const [campaignLikes, setCampaignLikes] = useRecoilState(campaignLikeState)
  /**
   * 캠페인이 좋아요 상태인지 확인합니다.
   */
  const isLiked = (): boolean => {
    const liked = campaignLikes[categoryId]?.includes(campaignId) || false
    return liked
  }

  /**
   * 캠페인을 좋아요 목록에 추가합니다.
   */
  const likeCampaign = (): void => {
    setCampaignLikes((prev) => {
      const currentLikes = prev[categoryId] || []
      // 이미 좋아요 된 캠페인인지 확인
      if (currentLikes.includes(campaignId)) {
        return prev // 이미 좋아요 된 경우 변경 없음
      }
      const newLikes = [...currentLikes, campaignId]
      return {
        ...prev,
        [categoryId]: newLikes,
      }
    })
  }

  /**
   * 캠페인을 좋아요 목록에서 제거합니다.
   */
  const unlikeCampaign = (): void => {
    setCampaignLikes((prev) => {
      const currentLikes = prev[categoryId] || []
      const updatedLikes = currentLikes.filter((id) => id !== campaignId)
      return {
        ...prev,
        [categoryId]: updatedLikes,
      }
    })
  }

  return { isLiked, likeCampaign, unlikeCampaign }
}

export default useLikeCampaign
