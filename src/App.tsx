import { AppRoute } from "pages/AppRoute"
import { useLocation } from "react-router-dom"
import AppBar from "components/AppBar"
import BottomTapBar from "components/BottomTapBar"
import Footer from "components/Footer"
import ToastMassage from "components/ToastMassage"
import GlobalCategoryMenu from "components/GlobalCategoryMenu"
import { RoutePath } from "./types/route-path"
import "./global.css"

function App() {
  const location = useLocation() // 현재 경로확인

  const hideBar =
    location.pathname === RoutePath.Login || location.pathname === RoutePath.Login
  const showFooter =
    location.pathname === RoutePath.Home

  return (
    <div className="App">
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
    </div>
  )
}

export default App
