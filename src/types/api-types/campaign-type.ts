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
  list: Campaign[]
  totalItems: number
  totalPages: number
  pageSize: number
  pageIndex: number
}
// 캠페인 개체의 타입
export interface Campaign {
  campaignId: number
  advertiserId: number
  title: string
  categoryId: number
  NSproductNo: string
  price: number
  reward: number
  cost: number
  snsUrl: string
  costPartner: number
  reviewKeyword: string | null
  thumbnailUrl: string
  startAt: string // ISO 형식의 날짜 문자열
  endAt: string // ISO 형식의 날짜 문자열
  status: string
  quota: number
  joins: number
  uploads: number
  favorites: number
  createdAt: string // ISO 형식의 날짜 문자열
  is_join: number // 1: 참여, 0: 미참여
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
