//** 리뷰참여리스트 요청 type */
export interface ReviewListRequest {
  token: string
  pageSize?: number // optional
  pageIndex?: number // optional
  order?: string // optional, e.g., recent
  status?: string // optional, e.g., "join/purchase/confirm/upload/reward/giveup/timeout"
  startAt?: string // optional
  endAt?: string // optional
}
export interface ReviewListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    review_obj: any // 리뷰 객체 정의 필요
  }>
  totalItems: number
  totalPages: number
  pageSize: number
  pageIndex: number
}

//** 리뷰 참여 내역 요청 type */
export interface ReviewItemRequest {
  token: string
  reviewId: number
}
export interface ReviewItemResponse {
  statusCode: number
  errorCode?: number
  error?: string
  review: {
    reviewId: number
    status: string // 리뷰 상태 (예: join, purchase, confirm, etc.)
    reviewText: string // 리뷰 내용
    createdAt: string // ISO 형식 날짜
    updatedAt: string // ISO 형식 날짜 (리뷰가 업데이트된 시간)
    // 추가적인 리뷰 관련 정보는 여기에 정의할 수 있습니다.
  }
  campaign: {
    campaignId: number
    title: string
    category: string
    price: number // 캠페인 관련 정보
    reward: number
    startAt: string // ISO 형식 날짜 (캠페인 시작일)
    endAt: string // ISO 형식 날짜 (캠페인 종료일)
    // 캠페인 관련 추가 정보가 있으면 여기 정의
  }
}

//** 리뷰참여 요청 type */
export interface ReviewJoinRequest {
  token: string
  campaignId: number
}
export interface ReviewJoinResponse {
  statusCode: number
  errorCode?: number
  error?: string
  reviewId: number
  campaignId: number
}

//** 리뷰 참여 취소 요청 type */
export interface ReviewCancelRequest {
  token: string
  reviewId: number
}
export interface ReviewCancelResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 리뷰 결제 인증 요청 type */
export interface ReviewAuthRequest {
  token: string
  reviewId: number
  ocr_data: string
}
export interface ReviewAuthResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** 리뷰 저장 요청 type */
export interface ReviewSaveRequest {
  token: string
  reviewId: number
  reviewText: string
}
export interface ReviewSaveResponse {
  statusCode: number
  errorCode?: number
  error?: string
  reviewId: number
}

//** 리뷰 내용 검토 type */
export interface ReviewConfirmRequest {
  token: string
  reviewId: number
  reviewText: string
}
export interface ReviewConfirmResponse {
  statusCode: number
  errorCode?: number
  error?: string
  reviewId: number
  reviewText?: string // 변경된 텍스트 알고리즘상 text에 변형을 줄수있음
}
