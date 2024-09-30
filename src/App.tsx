import { AppRoute } from "pages/AppRoute"
import { useLocation } from "react-router-dom"
import AppBar from "components/AppBar"
import BottomTapBar from "components/BottomTapBar"
import Footer from "components/Footer"
import "./global.css"

function App() {
  const location = useLocation() // 현재 경로확인

  // ** 푸터를 표시할 경로 설정 (메인 페이지와 내 정보 페이지에서만 푸터 렌더링) */
  const showFooter =
    location.pathname === "/main" || location.pathname === "/profile"
  return (
    <div className="App">
      {/* App Bar */}
      <AppBar />
      {/* 라우팅컴포넌트 */}
      <AppRoute />
      {/* 특정 경로에서만 푸터 렌더링 */}
      {showFooter && <Footer />}
      {/* Bottom Tap Bar */}
      <BottomTapBar />
    </div>
  )
}

export default App
