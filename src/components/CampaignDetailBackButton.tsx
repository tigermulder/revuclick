import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import IconBack from "assets/ico-campaign-detail-back.svg?react" // SVG 파일을 React 컴포넌트로 임포트

const CampaignDetailBackButton = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1) // 이전 페이지로 이동
  }

  return (
    <StyledBackButton onClick={handleBackClick}>
      <IconBack /> {/* SVG 아이콘을 React 컴포넌트로 사용 */}
    </StyledBackButton>
  )
}

export default CampaignDetailBackButton

// 스타일 정의
const StyledBackButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  width: 66px;
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`
