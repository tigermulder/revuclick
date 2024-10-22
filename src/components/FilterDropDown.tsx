import { useState } from "react"
import { dropDownOptions } from "@/types/component-types/filter-dropdown-type"
import { selectedFilterState } from "@/store/dropdown-recoil"
import IconDropDown from "assets/ico-dropdown-arrow.svg?react"
import { useRecoilState } from "recoil"
import styled from "styled-components"

const FilterDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] =
    useRecoilState(selectedFilterState)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: (typeof dropDownOptions)[0]) => {
    setSelectedFilter(option) // 선택된 필터 업데이트
    setIsOpen(false) // 드롭다운 닫기
  }

  return (
    <>
      {/* 드롭다운을 열기 위한 버튼 - 선택된 옵션에 따라 텍스트가 변경됨 */}
      <DropdownButton onClick={toggleDropdown}>
        <span>{selectedFilter.label}</span>
        <IconDropDown />
      </DropdownButton>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <DropDownContainer>
          {dropDownOptions.map((option) => (
            <DropDownItem
              key={option.id}
              $highlighted={option.id === selectedFilter.id}
              onClick={() => handleOptionClick(option)} // 옵션 클릭 처리
            >
              {option.label}
            </DropDownItem>
          ))}
        </DropDownContainer>
      )}
    </>
  )
}

export default FilterDropDown

// 드롭다운 버튼 스타일
const DropdownButton = styled.div`
  width: auto;
  height: 2.8rem;
  padding: 0 0.8rem;
  background: white;
  box-shadow: 0px 0px 6px rgba(41, 54, 61, 0.05);
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid var(--n200-color);
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
  cursor: pointer;

  span {
    font-size: 1.4rem;
    color: var(--gray);
    width: 100%;
  }
`

// 드롭다운 메뉴 스타일
const DropDownContainer = styled.div`
  width: 160px;
  padding: 1rem 0.8rem;
  background: white;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid #e2e4e4;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  top: 40px;
  right: 1.5rem;
`

const DropDownItem = styled.div<{ $highlighted?: boolean }>`
  width: 100%;
  height: 3.2rem;
  position: relative;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  background: ${({ $highlighted }) => ($highlighted ? "#F4F5F5" : "white")};
  color: #788991;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;
  border: ${({ $highlighted }) =>
    $highlighted ? "none" : "1px solid transparent"};
  cursor: pointer;
  &:hover {
    background-color: #e2e4e4;
  }
`
