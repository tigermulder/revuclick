import styled from "styled-components"
import IconShare from "assets/ico-campaign-detail-share.svg?react" // SVG를 React 컴포넌트로 임포트

const CampaignDetailShareButton = () => {
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this campaign!",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      alert("Sharing is not supported in this browser.")
    }
  }

  return (
    <StyledShareButton onClick={handleShareClick}>
      <IconShare /> {/* SVG 아이콘 사용 */}
    </StyledShareButton>
  )
}

export default CampaignDetailShareButton

// 스타일 정의
const StyledShareButton = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.7;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 999;
`
