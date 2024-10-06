import axiosInstance from "./axios"
import {
  LoginCheckResponse,
  LoginRequest,
  LoginResponse,
} from "types/api-types/login-type"
import { LogoutRequest, LogoutResponse } from "types/api-types/logout-type"
import { HangRequest, HangResponse } from "types/api-types/hang-type"

//** 로그인 여부체크 API */
export const checkLoginStatus = async (): Promise<LoginCheckResponse> => {
  const response = await axiosInstance.get<LoginCheckResponse>("/login/check")
  return response.data
}

//** 로그인 처리 API */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", data)
  return response.data
}

//** 로그아웃 처리 API */
export const logout = async (data: LogoutRequest): Promise<LogoutResponse> => {
  const response = await axiosInstance.post<LogoutResponse>("/logout", data)
  return response.data
}

// ** 세션 유지용 API */
export const keepSessionAlive = async (
  data: HangRequest
): Promise<HangResponse> => {
  const response = await axiosInstance.post<HangResponse>("/hang", {
    token: data.token, // data 객체에서 전달된 토큰을 그대로 사용
  })

  return response.data
}
