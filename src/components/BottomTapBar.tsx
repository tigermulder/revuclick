import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isGlobalCategoryMenuOpenState } from "store/mainpage-recoil";
import { RoutePath } from "@/types/route-path";
import styled from "styled-components";
import IconCategory from "assets/ico_tab_01.svg?react";
import IconCampaign from "assets/ico_tab_02.svg?react";
import IconHome from "assets/ico_tab_03.svg?react";
import IconAlerts from "assets/ico_tab_04.svg?react";
import IconProfile from "assets/ico_tab_05.svg?react";
import { useState, useEffect } from "react";

const BottomTabBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const setIsMenuOpen = useSetRecoilState(isGlobalCategoryMenuOpenState);

  const [activeTab, setActiveTab] = useState("");

  // 현재 경로에 따라 activeTab 설정
  useEffect(() => {
    if (currentPath.startsWith(RoutePath.Camera)) {
      setActiveTab("campaign");
    } else if (currentPath === RoutePath.Home) {
      setActiveTab("home");
    } else if (currentPath === "/alerts") {
      setActiveTab("alerts");
    } else if (currentPath === "/profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("");
    }
  }, [currentPath]);

  const handleCategoryClick = () => {
    setActiveTab("category");
    setIsMenuOpen(true);
  };

  const handleTabClick = (tabName:any) => {
    setActiveTab(tabName);
    setIsMenuOpen(false); // 카테고리 메뉴 닫기
  };

  return (
    <Nav className="bottom-tab-bar">
      <NavItem $active={activeTab === "category"} onClick={handleCategoryClick}>
        <StyledIcon as={IconCategory} $active={activeTab === "category"} />
        <NavText $active={activeTab === "category"}>카테고리</NavText>
      </NavItem>

      <NavItem $active={activeTab === "campaign"} onClick={() => handleTabClick("campaign")}>
        <Link to={RoutePath.Camera}>
          <StyledIcon as={IconCampaign} $active={activeTab === "campaign"} />
          <NavText $active={activeTab === "campaign"}>나의 캠페인</NavText>
        </Link>
      </NavItem>

      <NavItem $active={activeTab === "home"} onClick={() => handleTabClick("home")}>
        <Link to={RoutePath.Home}>
          <StyledIcon as={IconHome} $active={activeTab === "home"} />
          <NavText $active={activeTab === "home"}>Home</NavText>
        </Link>
      </NavItem>

      <NavItem $active={activeTab === "alerts"} onClick={() => handleTabClick("alerts")}>
        <Link to="/alerts">
          <StyledIcon as={IconAlerts} $active={activeTab === "alerts"} />
          <NavText $active={activeTab === "alerts"}>알림</NavText>
        </Link>
      </NavItem>

      <NavItem $active={activeTab === "profile"} onClick={() => handleTabClick("profile")}>
        <Link to="/profile">
          <StyledIcon as={IconProfile} $active={activeTab === "profile"} />
          <NavText $active={activeTab === "profile"}>내 정보</NavText>
        </Link>
      </NavItem>
    </Nav>
  );
};

export default BottomTabBar;

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
`;

const NavText = styled.span<{ $active: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: ${({ $active }) => ($active ? "var(--revu-color)" : "var(--silver)")};
`;

const StyledIcon = styled.svg<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  color: ${({ $active }) => ($active ? "var(--revu-color)" : "var(--silver)")};
`;

const NavItem = styled.div<{ $active: boolean }>`
  flex-basis: 20%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;
