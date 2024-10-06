import axiosInstance from "./axios"
import {
  ReviewListRequest,
  ReviewListResponse,
  ReviewItemRequest,
  ReviewItemResponse,
  ReviewJoinRequest,
  ReviewJoinResponse,
  ReviewCancelRequest,
  ReviewCancelResponse,
  ReviewAuthRequest,
  ReviewAuthResponse,
  ReviewSaveRequest,
  ReviewSaveResponse,
  ReviewConfirmRequest,
  ReviewConfirmResponse,
} from "types/api-types/review-type"

//** 리뷰 참여 리스트 요청 API */
export const getReviewList = async (
  data: ReviewListRequest
): Promise<ReviewListResponse> => {
  const response = await axiosInstance.post<ReviewListResponse>(
    "/review/list",
    data
  )
  return response.data
}

//** 리뷰 참여 내역 요청 API */
export const getReviewItem = async (
  data: ReviewItemRequest
): Promise<ReviewItemResponse> => {
  const response = await axiosInstance.post<ReviewItemResponse>(
    "/review/item",
    data
  )
  return response.data
}

//** 리뷰 참여 API */
export const joinReview = async (
  data: ReviewJoinRequest
): Promise<ReviewJoinResponse> => {
  const response = await axiosInstance.post<ReviewJoinResponse>(
    "/review/join",
    data
  )
  return response.data
}

//** 리뷰 참여 취소 API */
export const cancelReview = async (
  data: ReviewCancelRequest
): Promise<ReviewCancelResponse> => {
  const response = await axiosInstance.post<ReviewCancelResponse>(
    "/review/giveup",
    data
  )
  return response.data
}

//** 리뷰 결제 인증 API */
export const authReview = async (
  data: ReviewAuthRequest
): Promise<ReviewAuthResponse> => {
  const response = await axiosInstance.post<ReviewAuthResponse>(
    "/review/purchase_auth",
    data
  )
  return response.data
}

//** 리뷰 저장 API */
export const saveReview = async (
  data: ReviewSaveRequest
): Promise<ReviewSaveResponse> => {
  const response = await axiosInstance.post<ReviewSaveResponse>(
    "/review/save",
    data
  )
  return response.data
}

//** 리뷰 내용 검토 API */
export const confirmReview = async (
  data: ReviewConfirmRequest
): Promise<ReviewConfirmResponse> => {
  const response = await axiosInstance.post<ReviewConfirmResponse>(
    "/review/confirm",
    data
  )
  return response.data
}
