import styled from 'styled-components';
import { ButtonProps } from 'types/component-types/button-type';  // ButtonProps를 가져옴

const Button = ({ 
  color = 'red',  
  label
}: ButtonProps) => {
  return (
    <StyledButton $colors={colorMap[color]}>
      {label}
    </StyledButton>
  );
};

export default Button;

// 스타일 정의: 상대 단위 사용
const colorMap = {
  red: {
    enabled: '#d32f2f',    // 빨간색 (Enabled)
    active: '#8b0000',     // 진한 빨간색 (Pressed)
  },
  black: {
    enabled: '#202020',    // 검정색 (Enabled)
    active: '#415058',     // 회색 (Pressed)
  },
};

// Styled-components: 상대 단위를 사용한 반응형 버튼
const StyledButton = styled.button<{ $colors: { enabled: string; active: string; } }>`
  border-radius: 10px;
  font-size: 14px;   // 텍스트 크기 또한 유연한 rem 단위로 설정
  width: 100%;         // 버튼의 너비를 부모 요소에 맞춰 100%로 설정
  max-width: 480px;    // 최대 너비를 설정하여 너무 커지지 않도록 함
  line-height: 44px;
  color: white;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.$colors.enabled};
  transition: background-color 0.3s ease;

  /* Active 상태 (클릭 중) */
  &:active {
    background-color: ${(props) => props.$colors.active};
  }

  /* 반응형 디자인을 위한 미디어 쿼리 */
  @media (max-width: 768px) {

  }
  @media (max-width: 480px) {

  }
`;
