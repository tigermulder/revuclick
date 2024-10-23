export interface ButtonProps {
  children: React.ReactNode
  disabled?: boolean
  $variant:
    | "red"
    | "outlined"
    | "arrow"
    | "grey"
    | "pink"
    | "default"
    | "success"
    | "failed"
  type?: "button" | "submit" | "reset"
  $marginTop?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export interface StyledButtonProps {
  $variant:
    | "red"
    | "outlined"
    | "arrow"
    | "grey"
    | "pink"
    | "default"
    | "success"
    | "failed"
  $marginTop?: string
  disabled?: boolean
}
