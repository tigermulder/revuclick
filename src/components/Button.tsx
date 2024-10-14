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

// Styled Button component
const StyledButton = styled.button<{
  $variant: "red" | "outlined"
  $marginTop?: string // Added to props
}>`
  width: 100%;
  padding: 1.2rem;
  background-color: ${(props) =>
    props.$variant === "red"
      ? props.disabled
        ? "#ccc"
        : "#ff0000"
      : "transparent"};
  color: ${(props) =>
    props.$variant === "red" ? "white" : "var(--primary-color)"};
  border: ${(props) =>
    props.$variant === "outlined" ? "1px solid var(--n80-color)" : "none"};
  border-radius: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  /* Conditionally apply margin-top */
  ${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
`
