//** Favorite 리스트 요청 type */
export interface FavoriteListRequest {
  token: string
  pageSize: number
  pageIndex: number
}
export interface FavoriteListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<any> // 캠페인 객체 정의 필요
  totalItems: number
  totalPages: number
  pageSize: number
  pageIndex: number
}

//** Favorite 추가 요청 type */
export interface FavoriteAddRequest {
  token: string
  campaignId: number
}
export interface FavoriteAddResponse {
  statusCode: number
  errorCode?: number
  error?: string
}

//** Favorite 제거 요청 type */
export interface FavoriteRemoveRequest {
  token: string
  campaignId: number
}
export interface FavoriteRemoveResponse {
  statusCode: number
  errorCode?: number
  error?: string
}
