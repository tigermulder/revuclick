export interface Tab {
  label: string
  value: string
}
export interface TabsProps {
  tabs: Tab[]
  selectedTab: string
  onTabSelect: (value: string) => void
}
