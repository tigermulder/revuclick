import axiosInstance from "./axios"
import {
  NoticeListRequest,
  NoticeListResponse,
  NoticeItemRequest,
  NoticeItemResponse,
} from "types/api-types/notice-list-type"

//** NOTICE 리스트 요청 API */
export const getNoticeList = async (
  data: NoticeListRequest
): Promise<NoticeListResponse> => {
  const response = await axiosInstance.post<NoticeListResponse>(
    "/notice/list",
    data
  )
  return response.data
}

//** NOTICE 상세 내용 요청 API */
export const getNoticeItem = async (
  data: NoticeItemRequest
): Promise<NoticeItemResponse> => {
  const response = await axiosInstance.post<NoticeItemResponse>(
    "/notice/item",
    data
  )
  return response.data
}
