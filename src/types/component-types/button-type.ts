export interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  $variant: "red" | "outlined" | "arrow" | "grey" | "pink"
  type?: "button" | "submit" | "reset"
  $marginTop?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export interface StyledButtonProps {
  $variant: "red" | "outlined" | "arrow" | "grey" | "pink"
  $marginTop?: string
  disabled?: boolean
}
