import { useRecoilState } from 'recoil';
import { selectedCategoryState } from 'store/recoil';
import styled from 'styled-components';

// 카테고리 데이터
const categories = [
  { id: 1, name: '전체' }, // '전체'는 특별하게 처리
  { id: 2, name: '패션' },
  { id: 3, name: '뷰티' },
  { id: 4, name: '가구' },
  { id: 5, name: '출산/육아' },
  { id: 6, name: '식품' },
  { id: 7, name: '생활용품' },
  { id: 8, name: '반려동물' },
  { id: 9, name: '디지털' },
  { id: 10, name: '스포츠' },
  { id: 11, name: '여행' },
  { id: 12, name: '문화' },
  { id: 13, name: '기타' },
];

const CategoryMenu = () => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem key={category.id}>
          <IconWrapper
            $isActive={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
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
  cursor: pointer; /* 클릭 가능한 커서 표시 */
`;

const CategoryText = styled.div`
  white-space: nowrap; /* 텍스트가 한 줄에 표시되도록 설정 */
  text-align: center;
  color: #415058;
  font-size: 14px;
  font-family: 'SUIT', sans-serif;
  font-weight: 500;
  line-height: 1.3;
`;
