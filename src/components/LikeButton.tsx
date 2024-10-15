import useLikeCampaign from "hooks/useLikeCampaign"
import useToast from "@/hooks/useToast"
import { LikeButtonProps } from "types/component-types/likebutton-type"
import IcoHeart from "assets/ico-appbar-heart.svg?react"
import IcoCampaignHeart from "assets/ico-campaign-detail-heart.svg?react"
import { useRouter } from "hooks/useRouting"
import { RoutePath } from "types/route-path"
import { useMatch } from "react-router-dom"
import styled from "styled-components"

const LikeButton = ({
  categoryId,
  campaignId,
}: LikeButtonProps): JSX.Element => {
  const { isLiked, likeCampaign, unlikeCampaign } = useLikeCampaign(
    campaignId,
    categoryId
  )
  const { addToast } = useToast()
  const router = useRouter()

  const handleLike = (event: React.MouseEvent): void => {
    event.stopPropagation()
    const token = sessionStorage.getItem("authToken")
    if (!token) {
      addToast("로그인이 필요합니다.", "warning", 1000, "login")
      router.push(RoutePath.Login)
      return
    }
    if (isLiked()) {
      unlikeCampaign()
      addToast("찜한 목록에서 해제했어요.", "uncheck", 1000, "like")
    } else {
      likeCampaign()
      addToast("💝찜한 목록에 추가했어요.", "check", 1000, "like")
    }
  }

  const isCampaignPage = useMatch("/campaign/:campaignId")

  if (isCampaignPage) {
    return (
      <CampaignHeart
        onClick={handleLike}
        aria-label={isLiked() ? "좋아요 취소" : "좋아요"}
        $isLiked={isLiked()} // 수정된 부분
      >
        <StyledIcoCampaignHeart $isLiked={isLiked()} /> {/* 수정된 부분 */}
        <HeartText>찜하기</HeartText>
      </CampaignHeart>
    )
  } else {
    return (
      <Button
        onClick={handleLike}
        aria-label={isLiked() ? "좋아요 취소" : "좋아요"}
        aria-pressed={isLiked()}
      >
        <StyledHeartIcon $isLiked={isLiked()} /> {/* 수정된 부분 */}
      </Button>
    )
  }
}

export default LikeButton

const Button = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`

const StyledHeartIcon = styled(IcoHeart)<{ $isLiked: boolean }>`
  width: 24px;
  height: auto;
  color: ${({ $isLiked }) =>
    $isLiked ? "var(--revu-color)" : "var(--n40-color)"};
  transition: transform 0.1s ease;
`

const StyledIcoCampaignHeart = styled(IcoCampaignHeart)<{ $isLiked: boolean }>`
  width: 24px;
  height: auto;
  color: ${({ $isLiked }) => ($isLiked ? "var(--revu-color)" : "#fff")};
`

const CampaignHeart = styled.div<{ $isLiked: boolean }>`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 3px;
  display: inline-flex;
  cursor: pointer;
`

const HeartText = styled.div`
  text-align: center;
  color: #e50b14;
  font-size: 7px;
  font-family: "SUIT", sans-serif;
  font-weight: 600;
  word-wrap: break-word;
`
