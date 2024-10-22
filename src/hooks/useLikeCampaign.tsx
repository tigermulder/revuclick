import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { campaignLikeState } from "store/mainpage-recoil"

type CampaignLikes = {
  [categoryId: number]: number[]
}

const useLikeCampaign = (campaignId: number, categoryId: number) => {
  const [campaignLikes, setCampaignLikes] =
    useRecoilState<CampaignLikes>(campaignLikeState)

  /**
   * 캠페인이 좋아요 상태인지 확인합니다.
   */
  const isLiked = useCallback((): boolean => {
    return campaignLikes[categoryId]?.includes(campaignId) || false
  }, [campaignLikes, categoryId, campaignId])

  /**
   * 캠페인을 좋아요 목록에 add
   */
  const likeCampaign = useCallback((): void => {
    setCampaignLikes((prev) => {
      const currentLikes = prev[categoryId] || []
      // 이미 좋아요된 캠페인인지 확인
      if (!currentLikes.includes(campaignId)) {
        return {
          ...prev,
          [categoryId]: [...currentLikes, campaignId],
        }
      }
      return prev // 이미 좋아요된 경우 변경 없음
    })
  }, [setCampaignLikes, categoryId, campaignId])

  /**
   * 캠페인을 좋아요 목록에서 delete
   */
  const unlikeCampaign = useCallback((): void => {
    setCampaignLikes((prev) => {
      const currentLikes = prev[categoryId] || []
      // 좋아요된 캠페인인지 확인
      if (currentLikes.includes(campaignId)) {
        const updatedLikes = currentLikes.filter((id) => id !== campaignId)
        return {
          ...prev,
          [categoryId]: updatedLikes,
        }
      }
      return prev // 좋아요되지 않은 경우 변경 없음
    })
  }, [setCampaignLikes, categoryId, campaignId])

  return { isLiked, likeCampaign, unlikeCampaign }
}

export default useLikeCampaign
