// src/components/CheckBox.tsx
import IcoChkOff from "assets/ico_chk_off.svg?react"
import IcoChkOn from "assets/ico_chk_on.svg?react"
import { CheckboxProps } from "@/types/component-types/check-box-type"
import styled from "styled-components"

const Checkbox = ({
  label,
  checked,
  onChange,
  $isTitle = false,
}: CheckboxProps) => {
  return (
    <CheckboxLabel>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCustom checked={checked}>
        <IcoChkOff />
        <IcoChkOn />
      </CheckboxCustom>
      <CheckboxText $isTitle={$isTitle}>{label}</CheckboxText>
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

const CheckboxCustom = styled.span<{ checked: boolean }>`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.8rem;
  position: relative;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${(props) => (props.checked ? "block" : "none")};
  }

  & > svg:first-child {
    display: ${(props) => (props.checked ? "none" : "block")};
  }
`

const CheckboxText = styled.span<{ $isTitle: boolean }>`
  font-size: ${({ $isTitle }) =>
    $isTitle ? "var(--font-title-size)" : "var(--font-caption-size)"};
  font-weight: ${({ $isTitle }) =>
    $isTitle ? "var(--font-title-weight)" : "normal"};
  line-height: ${({ $isTitle }) =>
    $isTitle ? "var(--font-title-line-height)" : "normal"};
  letter-spacing: ${({ $isTitle }) =>
    $isTitle ? "var(--font-title-letter-spacing)" : "normal"};
  color: ${({ $isTitle }) =>
    $isTitle ? "var(--n600-color)" : "var(--n400-color)"};
`
