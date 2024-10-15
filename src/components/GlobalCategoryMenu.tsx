import { useRecoilState } from "recoil"
import {
  selectedCategoryState,
  isGlobalCategoryMenuOpenState,
} from "store/mainpage-recoil"
import { useEffect } from "react"
import { categories } from "utils/util"
import IconClose from "assets/ico_close.svg?react"
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
            <Header>
              <HeaderTitle>카테고리</HeaderTitle>
              <CloseButton onClick={handleClose}>
                <IconClose />
              </CloseButton>
            </Header>
            <CategoryList>
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
            </CategoryList>
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
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.5);
`

const MenuContainer = styled.div.attrs(() => ({
  style: {
    animation: `${slideUp} 0.15s ease-out`,
  },
}))`
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  background: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  width: 100%;
  padding: 12px 0;
  background: white;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom: 1px solid #f4f5f5;
  position: relative;
`

const HeaderTitle = styled.div`
  text-align: center;
  color: #202020;
  font-size: 18px;
  font-weight: 700;
`

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  width: 18px;
  height: 18px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`

const CategoryList = styled.div`
  width: 100%;
  padding: 2rem 1.5rem 8.4rem;
  background: white;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`

const CategoryItem = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const IconWrapper = styled.div.attrs<{ $isActive?: boolean }>(
  ({ $isActive }) => ({
    style: {
      background: $isActive ? "#E9EBEC" : "transparent",
      border: $isActive ? "none" : "1px solid #F4F5F5",
    },
  })
)<{ $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  margin-bottom: 10px;
  cursor: pointer;
`

const CategoryText = styled.div`
  text-align: center;
  color: #415058;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  word-wrap: break-word;
`
