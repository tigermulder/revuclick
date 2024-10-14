import IcoChkOff from "assets/ico_chk_off.svg"
import IcoChkOn from "assets/ico_chk_on.svg"
import { CheckboxProps } from "@/types/component-types/check-box-type"
import styled from "styled-components"

const Checkbox = ({
  label,
  checked,
  onChange,
  isTitle = false,
}: CheckboxProps) => {
  return (
    <CheckboxLabel>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCustom />
      <CheckboxText isTitle={isTitle}>{label}</CheckboxText>
    </CheckboxLabel>
  )
}

export default Checkbox

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CheckboxInput = styled.input`
  display: none;
`

const CheckboxCustom = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  background: url(${IcoChkOff}) no-repeat center / 100%;
  margin-right: 0.8rem;
  transition: background 0.3s;

  ${CheckboxInput}:checked + & {
    background: url(${IcoChkOn}) no-repeat center / 100%;
  }
`

const CheckboxText = styled.span<{ isTitle: boolean }>`
  font-size: ${({ isTitle }) =>
    isTitle ? "var(--font-title-size)" : "var(--font-caption-size)"};
  font-weight: ${({ isTitle }) =>
    isTitle ? "var(--font-title-weight)" : "normal"};
  line-height: ${({ isTitle }) =>
    isTitle ? "var(--font-title-line-height)" : "normal"};
  letter-spacing: ${({ isTitle }) =>
    isTitle ? "var(--font-title-letter-spacing)" : "normal"};
  color: ${({ isTitle }) =>
    isTitle ? "var(--n600-color)" : "var(--n400-color)"};
`
