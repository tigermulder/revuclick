export const RoutePath = {
  Home: "/main",
  Login: "/login",
  Join: "/join",
  FindId: "/find_id",
  FindPassword: "/find_password",
  MyCart: "/my_cart",
  MyCampaign: "/my_campaign",
  CampaignDetail: (campaignId: string) => `/campaign/${campaignId}`,
  UserProfile: (id: string) => `/user/${id}`,
} as const

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath]

export interface ContentProps {
  $isSpecialPage: boolean
  $isCampaignDetail: boolean
  $isMyCampaignPage: boolean
}
