import { Outlet, useLocation, useMatch } from "react-router-dom"
import { ContentProps } from "@/types/route-path"
import { RoutePath } from "@/types/route-path"
import ErrorBoundary from "components/ErrorBoundary"
import styled from "styled-components"

const Layout = () => {
  const location = useLocation() // 현재 경로 감지
  const isCampaignDetail = !!useMatch("/campaign/:campaignId") // 캠페인 상세 경로 감지
  const isLoginPage = location.pathname === RoutePath.Login // 로그인 페이지 감지
  const isJoinPage = location.pathname === RoutePath.Join // 회원가입 페이지 감지
  const isFindIdPage = location.pathname === RoutePath.FindId // 아이디찾기 페이지 감지
  const isFindPassWordPage = location.pathname === RoutePath.FindPassword // 아이디찾기 페이지 감지
  const isMyCartPage = location.pathname === RoutePath.MyCart // 장바구니 페이지 감지
  const isSpecialPage =
    isLoginPage ||
    isCampaignDetail ||
    isMyCartPage ||
    isFindIdPage ||
    isJoinPage ||
    isFindPassWordPage

  return (
    <>
      {/* 에러 바운더리 */}
      <ErrorBoundary>
        <Content
          $isSpecialPage={isSpecialPage}
          $isCampaignDetail={isCampaignDetail}
        >
          {/* 각 페이지별로 다른 콘텐츠를 보여주는 Outlet */}
          <Outlet />
        </Content>
      </ErrorBoundary>
    </>
  )
}

export default Layout

const Content = styled.main<ContentProps>`
  width: 100%;
  position: relative;
  overflow: hidden;

  ${({ $isSpecialPage, $isCampaignDetail }) =>
    $isSpecialPage
      ? $isCampaignDetail
        ? `
            height: 100vh;
            margin: 0;
          `
        : `
            height: 100vh;
            margin: 0;
            padding: 0 15px;
          `
      : `
          margin: 60px auto 0;
          padding: 0 15px;
        `};

  /* ::before 가상 요소로 상단 여백 추가 */
  &::before {
    content: "";
    position: absolute;
    top: -100vh; /* 화면 위로 충분히 크게 */
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff; /* 흰색 배경 */
    z-index: -1; /* 콘텐츠 뒤로 배치 */
  }

  /* ::after 가상 요소로 하단 여백 추가 */
  &::after {
    content: "";
    position: absolute;
    bottom: -100vh; /* 화면 아래로 충분히 크게 */
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff; /* 흰색 배경 */
    z-index: -1; /* 콘텐츠 뒤로 배치 */
  }
`
