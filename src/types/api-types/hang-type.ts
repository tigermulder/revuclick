//** 세션 유지 type */
export interface HangRequest {
  token: string
}
export interface HangResponse {
  statusCode: number
  errorCode?: number
  error?: string
}
