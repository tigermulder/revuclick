import IconArrowGo from "assets/ico_arr_go.svg?url"
import styled, { css } from "styled-components"

const Button = ({
  children,
  disabled,
  $variant, // 'red' | 'outlined' | 'arrow'
  type = "button",
  $marginTop,
  onClick,
}: {
  children: React.ReactNode
  disabled?: boolean
  $variant: "red" | "outlined" | "arrow"
  type?: "button" | "submit" | "reset"
  $marginTop?: string // 옵션
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <StyledButton
    disabled={disabled}
    $variant={$variant}
    type={type}
    onClick={onClick}
    $marginTop={$marginTop}
  >
    {children}
  </StyledButton>
)

export default Button

interface StyledButtonProps {
  $variant: "red" | "outlined" | "arrow"
  $marginTop?: string
  disabled?: boolean
}

const StyledButton = styled.button.attrs<StyledButtonProps>((props) => ({
  "data-variant": props.$variant,
  disabled: props.disabled,
}))<StyledButtonProps>`
  width: 100%;
  padding: 1.2rem;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  ${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}

  ${({ $variant, disabled }) => {
    switch ($variant) {
      case "red":
        return css`
          background-color: ${disabled ? "#FCC0C2" : "#ff0000"};
          color: white;
          border: none;
        `
      case "outlined":
        return css`
          background-color: transparent;
          color: var(--primary-color);
          border: 1px solid var(--n80-color);
        `
      case "arrow":
        return css`
          background-color: var(--n20-color);
          color: var(--primary-color);
          border: 0.1rem solid var(--n60-color);
          height: 3.8rem;
          font-size: var(--font-title-size);
          font-weight: var(--font-title-weight);
          line-height: var(--font-title-line-height);
          letter-spacing: var(--font-title-letter-spacing);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          color: var(--n400-color);

          &::after {
            content: "";
            background: url(${IconArrowGo}) no-repeat center / 100%;
            width: 0.9rem;
            height: 0.9rem;
          }
        `
      default:
        return ""
    }
  }}
`
