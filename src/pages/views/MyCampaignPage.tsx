import { useEffect, useState } from "react"
import FilterCalendar from "@/components/FilterCalander"
import { useQuery } from "@tanstack/react-query"
import { getReviewList } from "@/services/review"
import styled from "styled-components"
import { useSetRecoilState } from "recoil"
import { reviewListState } from "@/store/mycampaign-recoil"
import Button from "@/components/Button"
import dummyImage from "assets/dummy-image.png"

const MyCampaignPage = () => {
  const [selectedChip, setSelectedChip] = useState("전체")
  const setReivewList = useSetRecoilState(reviewListState)
  const chips = [
    "전체",
    "상품구매",
    "리뷰검수",
    "리뷰등록",
    "지급완료",
    "미션실패",
  ]
  const handleSelectChip = (chip: string) => {
    setSelectedChip(chip)
  }
  const handleFixedButtonClick = () => {
    console.log("Fixed Button Clicked")
    // 추가 동작 구현
  }

  //** 리액트쿼리 나의 리뷰리스트 */
  const fetchCampaignList = async ({ queryKey }: { queryKey: string[] }) => {
    const [_key] = queryKey
    const requestData = {
      pageSize: 20,
      pageIndex: 1, // 고정값이 아니라 동적으로 설정하려면 추가 로직 필요
    }
    const response = await getReviewList(requestData)
    return response
  }
  const { data } = useQuery({
    queryKey: ["reviewList"],
    queryFn: fetchCampaignList,
    refetchInterval: 10 * 60 * 1000, // 10분 마다 리패치
    staleTime: 10 * 60 * 1000, // 10분 동안 데이터가 신선함
    gcTime: 11 * 60 * 1000, // 20분 동안 캐시 유지
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  })
  // ** 현재 신청한캠페인 갯수 */
  const reviewLength = data?.totalItems
  const reviewList = data?.list
  // ** 나의리뷰리스트 데이터를 Recoil 상태로 업데이트  */
  useEffect(() => {
    if (data?.list) {
      const allReivews = data.list
      setReivewList(allReivews)
    }
  }, [data, setReivewList])

  return (
    <>
      <FilterCalendar
        chips={chips}
        selectedChip={selectedChip}
        onSelect={handleSelectChip}
        onFixedButtonClick={handleFixedButtonClick}
      />
      {/* 다른 컴포넌트들 */}
      <CartCardDesc>
        <p>
          신청한 캠페인
          <Result>{reviewLength}</Result>
          <Total>/3</Total>
        </p>
      </CartCardDesc>
      <MyReviewContainer>
        {reviewList?.map((reviewItem) => {
          return (
            <li key={reviewItem.reviewId}>
              <ReviewCardHeader>
                <ReviewCardThumb>
                  <img src={dummyImage} alt="리뷰리스트" />
                  <ReviewCardThumbText>
                    <span>-2</span>일
                  </ReviewCardThumbText>
                </ReviewCardThumb>
                <ReviewCardInfo>
                  <CardDate>2024.08.05</CardDate>
                  <CardTitle>
                    [리뷰] 리뷰가 한줄이상이상이상이상이상일경우우우
                  </CardTitle>
                  <CardPoint>25,000P</CardPoint>
                </ReviewCardInfo>
              </ReviewCardHeader>
              <Button $variant="grey">상품구매</Button>
            </li>
          )
        })}
      </MyReviewContainer>
    </>
  )
}

export default MyCampaignPage

const CartCardDesc = styled.div`
  margin-bottom: 1.2rem;
  padding: 1.5rem 2rem;
  font-size: var(--font-h5-size);
  font-weight: var(--font-h5-weight);
  letter-spacing: var(--font-h5-letter-spacing);
  border-radius: 1.2rem;
  background: var(--white);
`

const Result = styled.span`
  margin-left: 0.4rem;
  color: var(--success-color);
`

const Total = styled.span`
  font-size: var(--font-callout-small-size);
  font-weight: var(--font-callout-small-weight);
  letter-spacing: var(--font-callout-small-letter-spacing);
`

const MyReviewContainer = styled.ul`
  margin-top: 1.2rem;
  background: var(--white);
  border-radius: 1.2rem;
  li {
    position: relative;
    padding: 2.7rem 1.6rem;
  }
  li:not(:last-child):after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1rem;
    background: var(--n40-color);
  }
`

const ReviewCardHeader = styled.div`
  position: relative;
  margin-bottom: 2rem;
  border-radius: 0.8rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ReviewCardThumb = styled.div`
  position: relative;
  width: 8.1rem;
  height: 8.1rem;
  overflow: hidden;
  border-radius: 1rem;
  flex-shrink: 0;
`

const ReviewCardThumbText = styled.span`
  position: absolute;
  bottom: 0.7rem;
  left: 0;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
  font-size: var(--font-caption-size);
  font-weight: var(--font-caption-weight);
  line-height: var(--font-caption-line-height);
  letter-spacing: var(--font-caption-letter-spacing);
  background: var(--primary-color);
  color: var(--white);
`

const ReviewCardInfo = styled.div`
  margin-left: 1.4rem;
  flex-grow: 1;
  min-width: 0;
`

const CardDate = styled.p`
  font-size: var(--font-caption-size);
  font-weight: var(--font-caption-weight);
  line-height: var(--font-caption-line-height);
  letter-spacing: var(--font-caption-letter-spacing);
  color: var(--quicksilver);
`

const CardTitle = styled.span`
  display: block;
  width: 100%;
  margin-top: 0.4rem;
  padding-right: 1rem;
  font-size: var(--font-h5-size);
  font-weight: var(--font-h5-weight);
  line-height: var(--font-h5-line-height);
  letter-spacing: var(--font-h5-letter-spacing);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardPoint = styled.p`
  font-size: var(--font-h4-size);
  font-weight: var(--font-h4-weight);
  letter-spacing: var(--font-h4-letter-spacing);
`
