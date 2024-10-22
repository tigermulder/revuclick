import { useNavigate } from "react-router-dom"
import { HeaderProps } from "@/types/component-types/reuse-header-type"
import BackIcon from "assets/ico_back.svg?react"
import styled from "styled-components"

const ReuseHeader = ({ title, onBack }: HeaderProps) => {
  const navigate = useNavigate()

  // 기본 동작으로 뒤로 가기
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <HeaderContainer>
      <BackButton onClick={handleBack}>
        <BackIcon />
      </BackButton>
      <Title>{title}</Title>
    </HeaderContainer>
  )
}

export default ReuseHeader

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 4.4rem;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
`

const BackButton = styled.button`
  position: absolute;
  left: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: var(--font-h3-size);
  font-weight: var(--font-h3-weight);
  line-height: var(--font-h3-line-height);
  letter-spacing: var(--font-h3-letter-spacing);
`
