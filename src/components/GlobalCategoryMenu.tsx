import { useRecoilState } from "recoil"
import {
  selectedCategoryState,
  isGlobalCategoryMenuOpenState,
} from "store/mainpage-recoil"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { categories } from "utils/util"
import styled, { keyframes } from "styled-components"

const GlobalCategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  )
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(
    isGlobalCategoryMenuOpenState
  )
  const handleClose = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    // 페이지 경로가 변경될 때 메뉴 닫기
    handleClose()
  }, [location.pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  return (
    <>
      {isMenuOpen && (
        <Overlay onClick={handleClose}>
          <MenuContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose}>×</CloseButton>
            <Container>
              {categories.map((category) => (
                <CategoryItem key={category.id}>
                  <IconWrapper
                    $isActive={selectedCategory === category.id}
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setIsMenuOpen(false) // 카테고리 선택 시 메뉴 닫기
                    }}
                  >
                    {/* 아이콘 이미지 추가 가능 */}
                  </IconWrapper>
                  <CategoryText>{category.name}</CategoryText>
                </CategoryItem>
              ))}
            </Container>
          </MenuContainer>
        </Overlay>
      )}
    </>
  )
}

export default GlobalCategoryMenu

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 30;
`

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  animation: ${slideUp} 0.15s ease-out;
  padding: 4rem 2rem 3rem;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 12px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
`

const CategoryItem = styled.div`
  width: 60px;
  height: auto;
  position: relative;
  flex-shrink: 0;
`

const IconWrapper = styled.div<{ $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
  background: ${({ $isActive }) => ($isActive ? "#E9EBEC" : "transparent")};
  border-radius: 18px;
  border: ${({ $isActive }) => ($isActive ? "none" : "1.04px solid #F4F5F5")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CategoryText = styled.div`
  white-space: nowrap;
  text-align: center;
  color: #415058;
  font-size: 1.3rem;
  font-family: "SUIT", sans-serif;
  font-weight: 500;
  line-height: 1.3;
`
