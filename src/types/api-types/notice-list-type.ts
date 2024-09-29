//** NOTICE 리스트 요청 type */
export interface NoticeListRequest {
  token: string
  pageSize: number
  pageIndex: number
  noticeCategory?: string // optional
  order?: string // optional, e.g., recent, orderNo
}
export interface NoticeListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    noticeId: number
    noticeCategory: string
    createAt: string // ISO format
    title: string
    orderNo: number
  }>
  itemTotal: number
  pageTotal: number
  pageSize: number
  pageIndex: number
  faqCategory?: string
  order?: string
}

//** NOTICE 상세 내용 요청 type */
export interface NoticeItemRequest {
  token: string
  noticeId: number
}
export interface NoticeItemResponse {
  statusCode: number
  errorCode?: number
  error?: string
  notice: {
    noticeId: number
    noticeCategory: string
    createAt: string // ISO format
    title: string
    content: string
  }
}
