import { Outlet } from "react-router-dom"
import ErrorBoundary from "components/ErrorBoundary"
import styled from "styled-components"

const ProblematicComponent = () => {
  // 여기에 의도적으로 에러를 발생시킴
  throw new Error("This component has an error!")
}

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
  width: 100%;
  margin: 60px auto 0; /* AppBar 높이만큼 여백 */
  padding: 0 15px;
`
