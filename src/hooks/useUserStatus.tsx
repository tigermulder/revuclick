import { useMemo, useEffect } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useRecoilState } from "recoil"
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
  const token = useMemo(() => sessionStorage.getItem("authToken"), [])

  // React Query를 사용해 세션 유지 API를 호출
  const queryKey = useMemo(() => ["userStatus"], []);
  const queryFn = useMemo(
    () => () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        // 토큰이 없으면 에러를 발생시킵니다.
        return Promise.reject(new Error("토큰이 없습니다."));
      }
      // 토큰이 있으면 keepSessionAlive를 호출합니다.
      return keepSessionAlive({ token });
    },
    []
  );

  const { data, error, isLoading, isError } = useQuery<HangResponse>({
    queryKey,
    queryFn,
    refetchInterval: 10 * 60 * 1000, // 10분마다 세션 유지 API 자동 호출
    staleTime: 10 * 60 * 1000, // 10분 동안 데이터가 신선함
    gcTime: 11 * 60 * 1000, // 11분 동안 캐시 유지
    placeholderData: keepPreviousData, // 올바른 옵션 설정
    refetchOnWindowFocus: false, // 창에 포커스를 맞출 때 재패칭하지 않음
    enabled: !!token, // 토큰이 있을 때만 쿼리 실행
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
      addToast("로그인이 필요합니다. 다시 로그인해주세요.", "warning", 1000, "link")
      navigate(RoutePath.Login) // 로그인 페이지로 리디렉션
    }
  }, [isError, error, setIsLoggedIn, navigate, addToast])

  // authState를 메모이제이션하여 불필요한 리렌더링 방지
  const authStateMemo = useMemo(() => ({
    isLoggedIn,
    isLoading,
    isError,
    error,
  }), [isLoggedIn, isLoading, isError, error])

  return authStateMemo
}