import { useQuery } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
import { useEffect } from "react"
import { authState } from "store/recoil"
import { keepSessionAlive } from "services/login"
import { HangResponse } from "types/api-types/hang-type"

export const useUserStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(authState)

  // React Query를 사용해 세션 유지 API를 호출
  const { data, error, isLoading, isError } = useQuery<HangResponse>({
    queryKey: ["userStatus"],
    queryFn: () => {
      const token = localStorage.getItem("authToken") // JWT 토큰을 localStorage에서 가져옴

      if (!token) {
        // 토큰이 없을 경우 에러 처리
        throw new Error("No token found, user is not authenticated.")
      }

      // 세션 유지 API 호출 시 토큰을 전달
      return keepSessionAlive({ token })
    },
    refetchInterval: 600000, // 10분마다(600,000ms) 세션 유지 API 자동 호출
    retry: 0, // 재요청 횟수
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
      } else if (data.statusCode === -1 && data.errorCode === 2) {
        // 세션 만료로 로그아웃
        console.error("세션이 만료되었습니다. 다시 로그인해주세요.")
        setIsLoggedIn(false) // 로그아웃 처리
      }
    }
  }, [data, setIsLoggedIn])

  return { isLoggedIn, isLoading, isError, error }
}
