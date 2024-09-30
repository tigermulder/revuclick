import { Outlet } from "react-router-dom"
import ErrorBoundary from "components/ErrorBoundary"
import styled from "styled-components"

const Layout = () => {
  return (
    <>
      {/* 에러바운더리 */}
      <ErrorBoundary>
        <Content>
          {/* 각 페이지별로 다른 콘텐츠를 보여주는 Outlet */}
          <Outlet />
        </Content>
      </ErrorBoundary>
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
