import { ReactNode } from "react"

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
  thumbnailUrl: string
  description: string
  title: string
  statusCode: number
  campaign: Campaign
  reviews: Review[]
}

export interface Review {
  // 리뷰 객체가 어떻게 구성되어 있는지 모르기 때문에 임시로 빈 객체로 정의
  [key: string]: any
}

//** 카테고리별로 좋아요된 캠페인 ID 배열 */
export interface CampaignLikeState {
  [categoryId: number]: number[]
}
