import { createContext, PropsWithChildren, useMemo } from "react"
import { useUserStatus } from "@/hooks/useUserStatus"
import { AuthContextType } from "@/types/type"

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = useUserStatus()

  // auth 객체의 관련 상태를 의존성 배열에 추가하여 메모이제이션
  const memoizedAuth = useMemo(() => auth, [
    auth.isLoggedIn,
    auth.isLoading,
    auth.error,
    // auth 객체 내 필요한 다른 상태들 추가
  ])

  return <AuthContext.Provider value={memoizedAuth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const token = sessionStorage.getItem("authToken");
  const isLoggedIn = !!token; // 토큰이 있으면 true, 없으면 false

  return { isLoggedIn };
};