import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { isGlobalCategoryMenuOpenState } from "store/mainpage-recoil"
import { RoutePath } from "@/types/route-path"
import { useAuth } from "@/contexts/AuthContext"
import useToast from "@/hooks/useToast"
import IconCategory from "assets/ico_tab_01.svg?react"
import IconCampaign from "assets/ico_tab_02.svg?react"
import IconHome from "assets/ico_tab_03.svg?react"
import IconAlerts from "assets/ico_tab_04.svg?react"
import IconProfile from "assets/ico_tab_05.svg?react"
import styled from "styled-components"

const BottomTabBar = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const setIsMenuOpen = useSetRecoilState(isGlobalCategoryMenuOpenState)
  const { isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    if (currentPath.startsWith(RoutePath.MyCart)) {
      setActiveTab("campaign")
    } else if (currentPath === RoutePath.Home) {
      setActiveTab("home")
    } else if (currentPath === "/alerts") {
      setActiveTab("alerts")
    } else if (currentPath === "/profile") {
      setActiveTab("profile")
    }
  }, [currentPath])

  const handleCategoryClick = () => {
    setActiveTab("category")
    setIsMenuOpen(true)
  }

  const handleTabClick = (
    tabName: string,
    requiresAuth: boolean,
    path: string
  ) => {
    setActiveTab(tabName)
    if (requiresAuth && !isLoggedIn) {
      addToast("로그인이 필요합니다.", "warning", 1000, "login")
      navigate(RoutePath.Login, { replace: true })
    } else {
      navigate(path)
    }
  }

  return (
    <Nav className="bottom-tab-bar">
      <NavItem $active={activeTab === "category"} onClick={handleCategoryClick}>
        <StyledIcon as={IconCategory} $active={activeTab === "category"} />
        <NavText $active={activeTab === "category"}>카테고리</NavText>
      </NavItem>
      <NavItem
        $active={activeTab === "campaign"}
        onClick={() => handleTabClick("campaign", true, RoutePath.MyCart)}
      >
        <Link to={RoutePath.MyCart}>
          <StyledIcon as={IconCampaign} $active={activeTab === "campaign"} />
          <NavText $active={activeTab === "campaign"}>나의 캠페인</NavText>
        </Link>
      </NavItem>
      <NavItem
        $active={activeTab === "home"}
        onClick={() => handleTabClick("home", false, RoutePath.Home)}
      >
        <Link to={RoutePath.Home}>
          <StyledIcon as={IconHome} $active={activeTab === "home"} />
          <NavText $active={activeTab === "home"}>Home</NavText>
        </Link>
      </NavItem>
      <NavItem
        $active={activeTab === "alerts"}
        onClick={() => handleTabClick("alerts", true, "/alerts")}
      >
        <Link to="/alerts">
          <StyledIcon as={IconAlerts} $active={activeTab === "alerts"} />
          <NavText $active={activeTab === "alerts"}>알림</NavText>
        </Link>
      </NavItem>
      <NavItem
        $active={activeTab === "profile"}
        onClick={() => handleTabClick("profile", true, "/profile")}
      >
        <Link to="/profile">
          <StyledIcon as={IconProfile} $active={activeTab === "profile"} />
          <NavText $active={activeTab === "profile"}>내 정보</NavText>
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
  z-index: 40;
  width: 100%;
  height: 5.9rem;
  padding: 1.2rem 16px;
  background: var(--white);
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  border-top: 1px solid #ddd;
`

const NavText = styled.span.attrs<{ $active: boolean }>(({ $active }) => ({
  "aria-current": $active ? "page" : undefined,
}))<{ $active: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: ${({ $active }) => ($active ? "var(--revu-color)" : "var(--silver)")};
`

const StyledIcon = styled.svg.attrs<{ $active: boolean }>(({ $active }) => ({
  "aria-hidden": true,
}))<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  color: ${({ $active }) => ($active ? "var(--revu-color)" : "var(--silver)")};
`

const NavItem = styled.div.attrs<{ $active: boolean }>(({ $active }) => ({
  role: "button",
  "aria-pressed": $active,
}))<{ $active: boolean }>`
  flex-basis: 20%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`
