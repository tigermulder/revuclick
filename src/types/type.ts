import { ReactNode } from "react"

// ** useRouter type */
export type RoutePathHook = string
export type SearchParams = Record<string, string | string[]>

// ** ErrorBoundary type */
export interface Props {
  children: ReactNode
}
export interface State {
  hasError: boolean
}

// ** 인증타입 */
export interface AuthContextType {
  isLoggedIn: boolean
  isLoading: boolean
  isError: boolean
  error: any
}
