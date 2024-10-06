//** 이메일 체크 type */
export interface EmailCheckRequest {
  email: string
}
export interface EmailCheckResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 이메일 인증 코드 전송 type */
export interface SendEmailCodeRequest {
  email: string
}
export interface SendEmailCodeResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 이메일 인증 코드 확인 type */
export interface VerifyEmailCodeRequest {
  code: string
}
export interface VerifyEmailCodeResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 회원가입 처리 type */
export interface JoinRequest {
  email: string
  password: string
  nickname: string
  phone: string
  partner_uid?: string // optional
  hmac?: string // optional
  space_code?: string // optional
}
export interface JoinResponse {
  statusCode: number
  errorCode?: number
  error?: string
}
