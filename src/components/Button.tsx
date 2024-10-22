import IconArrowGo from "assets/ico_arr_go.svg?url"
import {
  ButtonProps,
  StyledButtonProps,
} from "@/types/component-types/button-type"
import styled, { css } from "styled-components"

const Button = ({
  children,
  disabled,
  $variant,
  type = "button",
  $marginTop,
  onClick,
}: ButtonProps) => (
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
            background: url("${IconArrowGo}") no-repeat center / 100%;
            width: 0.9rem;
            height: 0.9rem;
          }
        `
      case "grey":
        return css`
          background-color: var(--n40-color);
          color: var(--n400-color);
          border: none;
        `
      case "pink":
        return css`
          background-color: var(--prim-L20);
          color: var(--prim-L400);
          border: none;
        `
      default:
        return ""
    }
  }}
`
