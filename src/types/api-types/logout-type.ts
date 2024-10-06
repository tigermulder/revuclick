//** 로그아웃처리 type */
export interface LogoutRequest {
  token: string
}
export interface LogoutResponse {
  statusCode: number
  errorCode?: number
  error?: string
}
