import useLikeCampaign from "hooks/useLikeCampaign"
import useToast from "../hooks/useToast"
import { LikeButtonProps } from "types/component-types/likebutton-type"
import IcoHeart from "assets/ico-appbar-heart.svg?react"
import { useRouter } from "hooks/useRouting"
import { RoutePath } from "types/route-path"
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
  const router = useRouter() // 네비게이션 커스텀훅

  const handleLike = (): void => {
    const token = localStorage.getItem("token") // 로컬 스토리지에서 토큰 확인

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
