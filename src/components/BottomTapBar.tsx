import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

const BottomTabBar = () => {
  const location = useLocation() // 현재 경로 감지
  const currentPath = location.pathname

  return (
    <Nav>
      <NavItem>
        <Link
          to="/category"
          className={currentPath === "/category" ? "active" : ""}
        >
          <Icon>📂</Icon>
          <Label>카테고리</Label>
        </Link>
      </NavItem>

      <NavItem>
        <Link
          to="/campaign"
          className={currentPath.startsWith("/campaign") ? "active" : ""}
        >
          <Icon>🎉</Icon>
          <Label>캠페인</Label>
        </Link>
      </NavItem>

      <NavItem>
        <Link to="/main" className={currentPath === "/main" ? "active" : ""}>
          <Icon>🏠</Icon>
          <Label>홈</Label>
        </Link>
      </NavItem>

      <NavItem>
        <Link
          to="/alerts"
          className={currentPath === "/alerts" ? "active" : ""}
        >
          <Icon>🔔</Icon>
          <Label>알림</Label>
        </Link>
      </NavItem>

      <NavItem>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : ""}
        >
          <Icon>👤</Icon>
          <Label>내 정보</Label>
        </Link>
      </NavItem>
    </Nav>
  )
}

export default BottomTabBar

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
  border-top: 1px solid #ddd;
`

const NavItem = styled.div`
  text-align: center;

  a {
    text-decoration: none;
    color: gray;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.active {
      color: red; /* active 클래스에 따라 색상을 변경 */
    }
  }
`

const Icon = styled.div`
  font-size: 24px;
`

const Label = styled.div`
  font-size: 12px;
  margin-top: 5px;
`
