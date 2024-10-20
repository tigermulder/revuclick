import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RecoilRoot } from "recoil"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import App from "./App"

// QueryClient 인스턴스 생성
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <App /> {/* // 라우팅 컴포넌트 */}
        </AuthProvider>
      </Router>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </RecoilRoot>
)
