import { createContext, useContext, PropsWithChildren } from "react"
import { useUserStatus } from "@/hooks/useUserStatus"
import { AuthContextType } from "@/types/type"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = useUserStatus()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.")
  }
  return context
}
