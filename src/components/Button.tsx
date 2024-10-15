import styled from "styled-components"

// Button Component
const Button = ({
  children,
  disabled,
  $variant, // 'red' or 'outlined'
  type = "button",
  $marginTop,
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  $variant: "red" | "outlined"
  type?: "button" | "submit" | "reset"
  $marginTop?: string // Made optional
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <StyledButton
    disabled={disabled}
    $variant={$variant}
    type={type}
    onClick={onClick}
    $marginTop={$marginTop} // Pass down to StyledButton
  >
    {children}
  </StyledButton>
)

export default Button

interface StyledButtonProps {
  $variant: "red" | "outlined"
  $marginTop?: string
  disabled?: boolean
}
const StyledButton = styled.button.attrs<StyledButtonProps>((props) => ({
  "data-variant": props.$variant,
  disabled: props.disabled,
}))<StyledButtonProps>`
  width: 100%;
  padding: 1.2rem;
  background-color: ${({ $variant, disabled }) =>
    $variant === "red" ? (disabled ? "#ccc" : "#ff0000") : "transparent"};
  color: ${({ $variant }) =>
    $variant === "red" ? "white" : "var(--primary-color)"};
  border: ${({ $variant }) =>
    $variant === "outlined" ? "1px solid var(--n80-color)" : "none"};
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  /* Conditionally apply margin-top */
  ${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
`
