export const RoutePath = {
  Home: "/main",
  Login: "/login",
  Join: "/join",
  FindId: "/find_id",
  FindPassword: "/find_password",
  CampaignDetail: (campaignId: string) => `/campaign/${campaignId}`,
  Camera: "/camera",
  UserProfile: (id: string) => `/user/${id}`,
} as const

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath]

export interface ContentProps {
  $isSpecialPage: boolean
  $isCampaignDetail: boolean
}
