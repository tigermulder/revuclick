import React from 'react';
import styled from 'styled-components';

const categories = [
  { name: '전체' },
  { name: '패션' },
  { name: '뷰티' },
  { name: '가구' },
  { name: '출산/육아' },
  { name: '식품' },
  { name: '생활용품' },
  { name: '반려동물' },
  { name: '디지털' },
  { name: '스포츠' },
  { name: '여행' },
  { name: '문화' },
  { name: '기타' },
];

const CategoryMenu = () => {
  const [activeCategory, setActiveCategory] = React.useState('전체');

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem key={category.name}>
          <IconWrapper
            $isActive={activeCategory === category.name}
            onClick={() => setActiveCategory(category.name)}
          >
            {/* 아이콘 이미지 추가 가능 */}
          </IconWrapper>
          <CategoryText>{category.name}</CategoryText>
        </CategoryItem>
      ))}
    </Container>
  );
};

export default CategoryMenu;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden; /* 세로 스크롤 숨기기 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.div`
  width: 60px;
  /* 높이를 자동으로 설정하여 세로 스크롤 방지 */
  height: auto;
  position: relative;
  flex-shrink: 0;
`;

const IconWrapper = styled.div<{ $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  margin-bottom: 8px; /* 아이콘과 텍스트 사이의 간격 */
  background: ${({ $isActive }) => ($isActive ? '#E9EBEC' : 'transparent')};
  border-radius: 18px;
  border: ${({ $isActive }) => ($isActive ? 'none' : '1.04px solid #F4F5F5')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryText = styled.div`
  /* 텍스트가 한 줄에 표시되도록 설정 */
  white-space: nowrap;
  text-align: center;
  color: #415058;
  font-size: 14px;
  font-family: 'SUIT', sans-serif;
  font-weight: 500;
  line-height: 1.3;
`;
