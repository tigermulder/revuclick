export interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  $isTitle?: boolean // 새로운 프롭 추가
}
