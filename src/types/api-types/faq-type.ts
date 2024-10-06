//** FAQ 리스트 요청 type */
export interface FaqListRequest {
  token: string
  pageSize: number
  pageIndex: number
  faqCategory?: string // optional
  order?: string // optional, e.g., recent, orderNo
}
export interface FaqListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    faqId: number
    faqCategory: string
    createAt: string // ISO format
    title: string
    orderNo: number
  }>
  itemTotal: number
  pageTotal: number
  pageSize: number
  pageIndex: number
  faqCategory: string
  order: string
}

//** FAQ 상세 내용 요청 type */
export interface FaqItemRequest {
  token: string
  faqId: number
}
export interface FaqItemResponse {
  statusCode: number
  errorCode?: number
  error?: string
  faq: {
    faqId: number
    faqCategory: string
    createAt: string // ISO format
    title: string
    content: string
  }
}
