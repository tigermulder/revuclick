//** 내 정보 수정 (비밀번호 변경) type */
export interface ModifyUserRequest {
  token: string
  password?: string // optional
  phone: string
}
export interface ModifyUserResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 회원탈퇴 type */
export interface QuitUserRequest {
  token: string
  reason: string
}
export interface QuitUserResponse {
  statusCode: number
  errorCode?: number
  error?: string
}
