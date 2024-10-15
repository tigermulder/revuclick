import { AppRoute } from "pages/AppRoute"
import { useLocation, useMatch } from "react-router-dom"
import AppBar from "components/AppBar"
import BottomTapBar from "components/BottomTapBar"
import Footer from "components/Footer"
import ToastMassage from "components/ToastMassage"
import GlobalCategoryMenu from "components/GlobalCategoryMenu"
import { RoutePath } from "./types/route-path"
import { AuthProvider } from "./contexts/AuthContext"
import "./global.css"

function App() {
  const location = useLocation() // 현재 경로확인
  const isCampaignDetail = useMatch("/campaign/:campaignId") // 동적 경로 매칭 확인

  const hideBar =
    location.pathname === RoutePath.Login ||
    location.pathname === RoutePath.Join ||
    isCampaignDetail
  const showFooter = location.pathname === RoutePath.Home && !isCampaignDetail

  return (
    <div className="App">
      <AuthProvider>
        {/* App Bar */}
        {!hideBar && <AppBar />}
        {/* 라우팅컴포넌트 */}
        <AppRoute />
        {/* 특정 경로에서만 푸터 렌더링 */}
        {showFooter && <Footer />}
        {/* GlobalCategoryMenu는 항상 렌더링되어야 함 */}
        <GlobalCategoryMenu />
        {/* Bottom Tap Bar */}
        {!hideBar && <BottomTapBar />}
        {/* ToastMassage */}
        <ToastMassage />
      </AuthProvider>
    </div>
  )
}

export default App
