import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { authState } from "store/appbar-recoil"
import { keepSessionAlive } from "services/login"
import { HangResponse } from "types/api-types/hang-type"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "@/types/route-path"
import useToast from "./useToast"

export const useUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState)
  const navigate = useNavigate()
  const { addToast } = useToast()

  // React Query를 사용해 세션 유지 API를 호출
  const token = sessionStorage.getItem("authToken")
  const { data, error, isLoading, isError } = useQuery<HangResponse>({
    queryKey: ["userStatus", token],
    queryFn: () => {
      const token = sessionStorage.getItem("authToken")
      if (!token) {
        throw new Error("토큰을 찾을 수 없습니다.")
      }
      // 세션 유지 API 호출 시 토큰을 전달
      return keepSessionAlive({ token })
    },
    refetchInterval: 10 * 60 * 1000, // 10분마다(600,000ms) 세션 유지 API 자동 호출
    staleTime: 10 * 60 * 1000, // 10분 동안 데이터가 신선함
    gcTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    retry: 0, // 재요청 횟수
    refetchOnWindowFocus: false, // 창에 포커스를 맞출 때 재패칭하지 않음
    placeholderData: undefined,
  })

  // useEffect를 사용해 data 변경 시 로그인 상태 처리
  useEffect(() => {
    if (data) {
      if (data.statusCode === 0) {
        // 세션 유지 완료
        setIsLoggedIn(true) // 로그인 상태를 true로 설정
      } else if (data.statusCode === -1 && data.errorCode === 1) {
        // 토큰 불일치
        console.error("유효하지 않은 토큰입니다. 다시 로그인해주세요.")
        setIsLoggedIn(false) // 로그아웃 상태로 처리
        addToast(
          "유효하지 않은 토큰입니다. 다시 로그인해주세요.",
          "warning",
          1000,
          "link"
        )
        navigate(RoutePath.Login) // 로그인 페이지로 리디렉션
      } else if (data.statusCode === -1 && data.errorCode === 2) {
        // 세션 만료로 로그아웃
        console.error("세션이 만료되었습니다. 다시 로그인해주세요.")
        setIsLoggedIn(false) // 로그아웃 처리
        addToast(
          "세션이 만료되었습니다. 다시 로그인해주세요.",
          "warning",
          1000,
          "link"
        )
        navigate(RoutePath.Login) // 로그인 페이지로 리디렉션
      }
    }
  }, [data, setIsLoggedIn, navigate, addToast])

  // 세션 유지 API 호출에 실패했을 때 추가 처리
  useEffect(() => {
    if (isError) {
      console.error("로그인이 필요합니다", error?.message)
      setIsLoggedIn(false)
    }
  }, [isError, error, setIsLoggedIn, navigate])

  return { isLoggedIn, isLoading, isError, error }
}
