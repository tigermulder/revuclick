import axios, { AxiosInstance } from "axios"

//** 개발환경용 */
const baseURL = import.meta.env.VITE_BASE_URL
// ** 운영배포용 꼭 baseURL수정해서 올려주세요 */
const API = import.meta.env.VITE_SERVER_URL

//** Axios 인스턴스생성 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

//** 인터셉터로 요청마다 토큰을 추가 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") // 토큰을 localStorage에서 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 토큰이 있으면 Authorization 헤더에 추가
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
