import axiosInstance from "./axios"
import {
  FaqListRequest,
  FaqListResponse,
  FaqItemRequest,
  FaqItemResponse,
} from "types/api-types/faq-type"

//** FAQ 리스트 요청 API */
export const getFaqList = async (
  data: FaqListRequest
): Promise<FaqListResponse> => {
  const response = await axiosInstance.post<FaqListResponse>("/faq/list", data)
  return response.data
}

//** FAQ 상세 내용 요청 API */
export const getFaqItem = async (
  data: FaqItemRequest
): Promise<FaqItemResponse> => {
  const response = await axiosInstance.post<FaqItemResponse>("/faq/item", data)
  return response.data
}
