export interface ButtonProps {
  size?: 'XXXL' | 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS' | 'XXS' | 'XXXS';
  color?: 'red' | 'black';
  state?: 'enabled' | 'disabled' | 'pressed';
  label: string;
  disableable?: boolean; // 비활성화 가능 여부 (optional, 기본값 false)
}