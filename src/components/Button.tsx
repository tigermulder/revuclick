
import styled from "styled-components"

// Button Component
const Button = ({
  children,
  disabled,
  $variant, // 'red' or 'outlined'
  type = "button", // default to "button" to prevent unintended form submission
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  $variant: "red" | "outlined"
  type?: "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <StyledButton disabled={disabled} $variant={$variant} type={type} onClick={onClick}>
    {children}
  </StyledButton>
)

export default Button

// Styled Button component
const StyledButton = styled.button<{ $variant: "red" | "outlined" }>`
  width: 100%;
  padding: 1.5rem;
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

  /* Optional: Add hover effects */
  &:hover {
    background-color: ${(props) =>
      !props.disabled && props.$variant === "red" ? "#cc0000" : ""};
    border-color: ${(props) =>
      !props.disabled && props.$variant === "outlined" ? "#0056b3" : ""};
  }
`
