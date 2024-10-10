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
