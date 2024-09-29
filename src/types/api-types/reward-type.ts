//** 리워드 적립 내역 요청 type */
export interface RewardListRequest {
  token: string
  pageSize?: number // optional
  pageIndex?: number // optional
  order?: string // optional, e.g., recent
  startAt?: string // optional, yyyyMMdd
  endAt?: string // optional, yyyyMMdd
}
export interface RewardListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    rewardAt: string // 적립 시각 (ISO format)
    campaignId: number
    campaignTitle: string
    reward: number
    status: string // e.g., "reward"
  }>
  totalItems: number
  totalPages: number
  pageSize: number
  pageIndex: number
}
