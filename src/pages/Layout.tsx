import { Outlet, useLocation } from "react-router-dom"
import AppBar from "components/AppBar"
import BottomTapBar from "components/BottomTapBar"
import Footer from "components/Footer"
import styled from "styled-components"

const Layout = () => {
  const location = useLocation() // 현재 경로확인

  // ** 푸터를 표시할 경로 설정 (메인 페이지와 내 정보 페이지에서만 푸터 렌더링) */
  const showFooter =
    location.pathname === "/main" || location.pathname === "/profile"
  return (
    <>
      {/* App Bar */}
      <AppBar />
      {/* 각 페이지별로 다른 콘텐츠를 보여주는 Outlet */}
      <Content>
        <Outlet />
      </Content>
      {/* 특정 경로에서만 푸터 렌더링 */}
      {showFooter && <Footer />}
      {/* Bottom Tap Bar */}
      <BottomTapBar />
    </>
  )
}

export default Layout

// 페이지 내용이 앱바와 탭바에 가려지지 않도록 적절한 margin 설정
const Content = styled.main`
  margin-top: 60px; /* AppBar 높이만큼 여백 */
  margin-bottom: 60px; /* TabBar 높이만큼 여백 */
  width: auto;
  height: 100vh;
  padding: 20px;
`
