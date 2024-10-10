import { Outlet, useLocation } from "react-router-dom";
import { ContentProps } from "@/types/route-path";
import { RoutePath } from "@/types/route-path";
import ErrorBoundary from "components/ErrorBoundary";
import styled from "styled-components";


const Layout = () => {
  const location = useLocation();  // 현재 경로 감지

  return (
    <>
      {/* 에러 바운더리 */}
      <ErrorBoundary>
        <Content $isLoginPage={location.pathname === RoutePath.Login}>
          {/* 각 페이지별로 다른 콘텐츠를 보여주는 Outlet */}
          <Outlet />
        </Content>
      </ErrorBoundary>
    </>
  );
}

export default Layout;

// 페이지 내용이 앱바와 탭바에 가려지지 않도록 적절한 margin 설정
const Content = styled.main<ContentProps>`
  width: 100%;
  ${({ $isLoginPage }) => 
    $isLoginPage ? 
    "height: 100vh; margin: 0;" : 
    "margin: 60px auto 0;"
  };
  padding: 0 15px;
`;
