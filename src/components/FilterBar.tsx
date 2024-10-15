import styled from "styled-components"
import { useRecoilState } from "recoil"
import { campaignFilterState } from "store/mainpage-recoil"

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
  gap: 8px;
  padding: 18px 0 6px;
`

const StyledButton = styled.button.attrs<{ $isActive: boolean }>(
  ({ $isActive }) => ({
    style: {
      backgroundColor: $isActive ? "#E50B14" : "white",
      color: $isActive ? "white" : "#747474",
    },
  })
)<{ $isActive: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid #eeeeee;
  font-weight: var(--font-weight-medium);
  cursor: pointer;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#E50B14" : "#f5f5f5")};
    border-color: ${({ $isActive }) => ($isActive ? "#E50B14" : "#eeeeee")};
    font-weight: ${({ $isActive }) =>
      $isActive ? "var(--font-weight-bold)" : "var(--font-weight-medium)"};
  }

  &:active {
    background-color: ${({ $isActive }) => ($isActive ? "#C20810" : "#ebebeb")};
    border-color: ${({ $isActive }) => ($isActive ? "#C20810" : "#eeeeee")};
  }
`
