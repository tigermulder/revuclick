export const RoutePath = {
  Home: "/main",
  Login: "/login",
  Join: "/join",
  FindId: "/find_id1",
  FindPassword: "/find_password1",
  UserProfile: (id: string) => `/user/${id}`,
} as const

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath]
