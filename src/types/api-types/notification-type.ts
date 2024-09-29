//** Notification 리스트 요청 type */
export interface NotificationListRequest {
  token: string
  pageSize: number
  pageIndex: number
  notificationCategory?: string // optional
  order?: string // optional, e.g., recent
}
export interface NotificationListResponse {
  statusCode: number
  errorCode?: number
  error?: string
  list: Array<{
    notificationId: number
    notificationCategory: string
    createAt: string // ISO format
    title: string
  }>
  itemTotal: number
  pageTotal: number
  pageSize: number
  pageIndex: number
  notificationCategory?: string
  order?: string
}

//** Notification 상세 내용 요청 type */
export interface NotificationItemRequest {
  token: string
  notificationId: number
}
export interface NotificationItemResponse {
  statusCode: number
  errorCode?: number
  error?: string
  notification: {
    notificationId: number
    noticeCategory: string
    createAt: string // ISO format
    title: string
    content: string
  }
}
