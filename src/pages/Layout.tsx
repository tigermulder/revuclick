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
  ${({ $isSpecialPage, $isCampaignDetail }) =>
    $isSpecialPage
      ? $isCampaignDetail
        ? "height: 100vh; margin: 0;" // 캠페인 상세 페이지일 경우
        : "height: 100vh; margin: 0; padding: 0 15px;" // 로그인 페이지일 경우
      : "margin: 60px auto 0; padding: 0 15px;"};
`
