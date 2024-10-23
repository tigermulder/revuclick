import { Route, Routes as ReactRouterRoutes } from "react-router-dom"
import { RoutePath } from "types/route-path"
import Layout from "./Layout"
import LoginPage from "./views/LoginPage" // 로그인 페이지
import JoinPage from "./views/JoinPage"
import MainPage from "./views/MainPage"
import CampaignDetailPage from "./views/CampaignDetailPage"
import CampaignCart from "./views/CampaingnCart"
import FindIdPage from "./views/FindIdPage"
import FindPasswordPage from "./views/FindPasswordPage"
import MyCampaignPage from "./views/MyCampaignPage"
import MyCampaignDetailPage from "./views/MyCampaignDetailPage"

export const AppRoute = () => {
  return (
    <ReactRouterRoutes>
      {/* Layout을 루트 경로로 지정하고, Outlet으로 자식 라우트를 렌더링 */}
      <Route element={<Layout />}>
        {/* main 페이지 */}
        <Route path={RoutePath.Home} element={<MainPage />} />
        {/* 캠페인상세 페이지 */}
        <Route path="/campaign/:campaignId" element={<CampaignDetailPage />} />
        {/* 로그인 페이지 */}
        <Route path={RoutePath.Login} element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path={RoutePath.Join} element={<JoinPage />} />
        {/* 아이디찾기 페이지 */}
        <Route path={RoutePath.FindId} element={<FindIdPage />} />
        {/* 비밀번호찾기 페이지 */}
        <Route path={RoutePath.FindPassword} element={<FindPasswordPage />} />
        {/* 장바구니 페이지 */}
        <Route path={RoutePath.MyCart} element={<CampaignCart />} />
        {/* 나의 캠페인 페이지 */}
        <Route path={RoutePath.MyCampaign} element={<MyCampaignPage />} />
        {/* 나의 캠페인 페이지 */}
        <Route
          path="/my_campaign/:reviewId"
          element={<MyCampaignDetailPage />}
        />
      </Route>
    </ReactRouterRoutes>
  )
}
