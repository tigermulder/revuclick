import { Route, Routes as ReactRouterRoutes } from "react-router-dom"
import Layout from "./Layout"
import LoginPage from "./views/LoginPage" // 로그인 페이지
import SignUpPage from "./views/SignUpPage"
import MainPage from "./views/MainPage"
import { RoutePath } from "types/route-path"

export const AppRoute = () => {
  return (
    <ReactRouterRoutes>
      {/* Layout을 루트 경로로 지정하고, Outlet으로 자식 라우트를 렌더링 */}
      <Route element={<Layout />}>
        {/* main 페이지 */}
        <Route path={RoutePath.Home} element={<MainPage />} />
        {/* 로그인 페이지 */}
        <Route path={RoutePath.Login} element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path={RoutePath.Join} element={<SignUpPage />} />
      </Route>
    </ReactRouterRoutes>
  )
}
