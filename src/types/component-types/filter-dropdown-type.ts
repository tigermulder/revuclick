
// 필터 옵션 객체 배열
export type FilterOption = {
  id: number;
  label: string;
}
export const dropDownOptions: FilterOption[] = [
  { id: 1, label: "최신순" },
  { id: 2, label: "신청자 많은순" },
  { id: 3, label: "신청자 낮은순" },
  { id: 4, label: "마감 임박순" },
  { id: 5, label: "포인트 높은순" },
  { id: 6, label: "포인트 낮은순" },
]
