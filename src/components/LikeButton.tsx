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
  const router = useRouter() // 네비게이션 커스텀 훅

  const handleLike = (event: React.MouseEvent): void => {
    event.stopPropagation() // 이벤트 전파 막기
    const token = localStorage.getItem("authToken") // 로컬 스토리지에서 토큰 확인
    if (!token) {
      addToast("로그인이 필요합니다.", "warning", 2000, "login")
      router.push(RoutePath.Login) // 로그인 페이지로 리디렉션
      return // 좋아요 로직 실행하지 않음
    }
    if (isLiked()) {
      unlikeCampaign()
      addToast("찜목록에서 제거되었습니다.", "uncheck", 1000, "like")
    } else {
      likeCampaign()
      addToast("찜목록에 추가되었습니다.", "check", 1000, "like")
    }
  }

  // 캠페인 상세 페이지 확인 (useMatch 사용)
  const isCampaignPage = useMatch("/campaign/:campaignId")

  if (isCampaignPage) {
    // 캠페인 상세 페이지일 때
    return (
      <CampaignHeart
        onClick={handleLike}
        aria-label={isLiked() ? "좋아요 취소" : "좋아요"}
        isLiked={isLiked()}
      >
        <StyledIcoCampaignHeart $isLiked={isLiked()} />
        <HeartText>찜하기</HeartText>
      </CampaignHeart>
    )
  } else {
    // 그 외의 페이지일 때
    return (
      <Button
        onClick={handleLike}
        aria-label={isLiked() ? "좋아요 취소" : "좋아요"}
        aria-pressed={isLiked()}
      >
        <StyledHeartIcon $isLiked={isLiked()} />
      </Button>
    )
  }
}

export default LikeButton

// Styled Components

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

const CampaignHeart = styled.div<{ isLiked: boolean }>`
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
