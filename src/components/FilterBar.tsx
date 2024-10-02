import styled from "styled-components"
import { useRecoilState } from "recoil"
import { campaignFilterState } from "store/recoil"

// ** FilterBar 컴포넌트입니다 */
export const FilterBar = () => {
  const [filter, setFilter] = useRecoilState(campaignFilterState)

  return (
    <ButtonContainer>
      <Chip
        label="최신순"
        isActive={filter === "최신순"}
        onClick={() => setFilter("최신순")}
      />
      <Chip
        label="마감순"
        isActive={filter === "마감순"}
        onClick={() => setFilter("마감순")}
      />
      <Chip
        label="인기순"
        isActive={filter === "인기순"}
        onClick={() => setFilter("인기순")}
      />
    </ButtonContainer>
  )
}

// ** Chip 컴포넌트입니다 */
export const Chip = ({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <StyledButton $isActive={isActive} onClick={onClick}>
      {label}
    </StyledButton>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px; // 버튼들 사이 간격
`

const StyledButton = styled.button<{ $isActive: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #eeeeee;
  background-color: ${(props) => (props.$isActive ? "#E50B14" : "white")};
  color: ${(props) => (props.$isActive ? "white" : "black")};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#E50B14" : "#f5f5f5")};
    border-color: ${(props) => (props.$isActive ? "#E50B14" : "#eeeeee")};
  }

  /* 클릭 중(active)일 때 색상 지정 */
  &:active {
    background-color: ${(props) => (props.$isActive ? "#C20810" : "#ebebeb")};
    border-color: ${(props) => (props.$isActive ? "#C20810" : "#eeeeee")};
  }
`
