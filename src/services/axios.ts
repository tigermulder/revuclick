import axios, { AxiosInstance } from "axios"

//** Axios 인스턴스생성 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
