//** 캠페인리스트 요청 type */
export interface CampaignListRequest {
  token?: string
  pageSize?: number // optional
  pageIndex?: number // optional
  order?: string // optional, e.g., recent, joinDesc
  category?: string // optional
  keyword?: string // optional
  startAt?: string // optional, yyyyMMdd
  endAt?: string // optional, yyyyMMdd
}
export interface CampaignListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    campaign_obj: any // 캠페인 객체 정의 필요
    join: number // 1: 참여, 0: 미참여
  }>
  totalItems: number
  totalPages: number
  pageSize: number
  pageIndex: number
}

//** 캠페인 상세 정보 요청 */
export interface CampaignItemRequest {
  token: string
  campaignId: number
}
export interface CampaignItemResponse {
  statusCode: number
  campaign: {
    campaign_obj: any // 캠페인 객체 정의 필요
    join: number // 1: 참여, 0: 미참여
  }
}
