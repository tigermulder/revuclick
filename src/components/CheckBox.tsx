import styled from "styled-components";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <CheckboxLabel>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCustom />
      <CheckboxText>{label}</CheckboxText>
    </CheckboxLabel>
  );
};

export default Checkbox;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxCustom = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  background: url(/assets/img/ico_chk_off.svg) no-repeat center / 100%;
  margin-right: 0.8rem;

  ${CheckboxInput}:checked + & {
    background: url(/assets/img/ico_chk_on.svg) no-repeat center / 100%;
  }
`;

const CheckboxText = styled.span`
  font-size: var(--font-body-size);
  color: var(--n600-color);
`;
