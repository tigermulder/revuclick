import { Route, Routes as ReactRouterRoutes } from "react-router-dom"
import Layout from "./Layout"
import LoginPage from "./views/LoginPage" // 로그인 페이지
import SignUpPage from "./views/SignUpPage" // 회원가입 페이지
import MainPage from "./views/MainPage"

export const AppRoute = () => {
  return (
    <ReactRouterRoutes>
      {/* Layout을 루트 경로로 지정하고, Outlet으로 자식 라우트를 렌더링 */}
      <Route path="/" element={<Layout />}>
        {/* main 페이지 */}
        <Route path="main" element={<MainPage />} />
        {/* 로그인 페이지 */}
        <Route path="login" element={<LoginPage />} />
        {/* 회원가입 페이지 */}
        <Route path="signIn" element={<SignUpPage />} />
      </Route>
    </ReactRouterRoutes>
  )
}
