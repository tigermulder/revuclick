import { Link, useLocation } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { isGlobalCategoryMenuOpenState } from "store/mainpage-recoil"
import styled from "styled-components"
import IconCategory from "assets/ico_tab_01.svg?react"
import IconCampaign from "assets/ico_tab_02.svg?react"
import IconHome from "assets/ico_tab_03.svg?react"
import IconAlerts from "assets/ico_tab_04.svg?react"
import IconProfile from "assets/ico_tab_05.svg?react"

const BottomTabBar = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const setIsMenuOpen = useSetRecoilState(isGlobalCategoryMenuOpenState)

  const handleCategoryClick = () => {
    setIsMenuOpen(true)
  }
  return (
    <Nav className="bottom-tab-bar">
      <NavItem
        $active={currentPath === "/category"}
        onClick={handleCategoryClick}
      >
        <Link to={location}>
          <StyledIcon as={IconCategory} $active={currentPath === "/category"} />
          <NavText $active={currentPath === "/category"}>카테고리</NavText>
        </Link>
      </NavItem>

      <NavItem $active={currentPath.startsWith("/campaign")}>
        <Link to="/campaign">
          <StyledIcon
            as={IconCampaign}
            $active={currentPath.startsWith("/campaign")}
          />
          <NavText $active={currentPath.startsWith("/campaign")}>
            캠페인
          </NavText>
        </Link>
      </NavItem>

      <NavItem $active={currentPath === "/main"}>
        <Link to="/main">
          <StyledIcon as={IconHome} $active={currentPath === "/main"} />
          <NavText $active={currentPath === "/main"}>Home</NavText>
        </Link>
      </NavItem>

      <NavItem $active={currentPath === "/alerts"}>
        <Link to="/alerts">
          <StyledIcon as={IconAlerts} $active={currentPath === "/alerts"} />
          <NavText $active={currentPath === "/alerts"}>알림</NavText>
        </Link>
      </NavItem>

      <NavItem $active={currentPath === "/profile"}>
        <Link to="/profile">
          <StyledIcon as={IconProfile} $active={currentPath === "/profile"} />
          <NavText $active={currentPath === "/profile"}>내 정보</NavText>
        </Link>
      </NavItem>
    </Nav>
  )
}

export default BottomTabBar

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 6.6rem;
  padding: 1.2rem 16px;
  background: var(--white);
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  border-top: 1px solid #ddd;
`

const NavText = styled.span<{ $active: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
`

const StyledIcon = styled.svg<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  margin: 0 auto;
`

const NavItem = styled.div<{ $active: boolean }>`
  flex-basis: 20%; /* 5개의 아이템을 동일하게 20%로 배치 */
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* NavText와 StyledIcon의 색상을 상위 NavItem의 active 상태에 따라 처리 */
  & > a ${NavText}, & > a ${StyledIcon} {
    color: ${({ $active }) =>
      $active ? "var(--revu-color)" : "var(--silver)"};
  }
`
