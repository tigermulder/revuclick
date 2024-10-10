// src/pages/MainPage.tsx
import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSetRecoilState, useRecoilValue } from "recoil"
import {
  campaignListState,
  filteredAndSortedCampaignList,
  campaignLikeState,
} from "store/mainpage-recoil"
import { getCampaignList } from "services/campaign"
import CategoryMenu from "components/CategoryMenu"
import BannerSlider from "components/Banner"
import { FilterBar } from "components/FilterBar"
import styled from "styled-components"
import LikeButton from "components/LikeButton" // 새로 생성한 LikeButton 컴포넌트 임포트

const MainPage = (): JSX.Element => {
  const setCampaignList = useSetRecoilState(campaignListState)
  const filteredCampaigns = useRecoilValue(filteredAndSortedCampaignList)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const campaignLikes = useRecoilValue(campaignLikeState) // 추가

  //** Fetch campaign list */
  const fetchCampaigns = async ({ pageParam = 1 }) => {
    const requestData = {
      pageSize: 10,
      pageIndex: pageParam,
    }
    const response = await getCampaignList(requestData)
    return response
  }

  // 찜장바구니 상태값 확인
  useEffect(() => {
    console.log("현재 장바구니상태:", campaignLikes)
  }, [campaignLikes])

  //** 리액트쿼리 */
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageIndex < lastPage.totalPages) {
        return lastPage.pageIndex + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  //** 캠페인 데이터를 Recoil 상태로 업데이트 */
  useEffect(() => {
    if (data?.pages) {
      const allCampaigns = data.pages.flatMap((page) => page.list)
      setCampaignList(allCampaigns)
    }
  }, [data, setCampaignList])

  //** 무한 스크롤을 위한 Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상이 보이고 있고 다음 페이지가 있을 경우
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )
    const currentElement = loadMoreRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <>
      {/* 카테고리메뉴 */}
      <CategoryMenu />
      <BannerSlider />
      {/* 필터칩 */}
      <FilterBar />
      <CampaignList>
        {filteredCampaigns?.map((campaign) => {
          // 남은 시간 계산
          const endTime = campaign.endAt
            ? new Date(campaign.endAt).getTime()
            : 0
          const now = Date.now()
          const diffInMs = endTime - now
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
          let remainingTime
          if (diffInDays > 1) {
            remainingTime = `D-${Math.ceil(diffInDays)}일`
          } else if (diffInDays > 0) {
            const diffInHours = diffInMs / (1000 * 60 * 60)
            remainingTime = `T-${Math.ceil(diffInHours)}시간`
          } else {
            remainingTime = "캠페인 종료"
          }
          const isEnded = remainingTime === "캠페인 종료"

          return (
            <CampaignCard key={campaign.campaignId} $isEnded={isEnded}>
              <CampaignImage>
                <img
                  src={campaign.thumbnailUrl || "default-image.jpg"}
                  alt={campaign.title}
                />
                {/* 캠페인 종료 여부에 따라 RemainingDays 위치 변경 */}
                <RemainingDays $isEnded={isEnded}>
                  {isEnded ? "캠페인 종료" : remainingTime}
                </RemainingDays>
                {isEnded && <EndedOverlay />}
                {!isEnded && (
                  <LikeButton
                    categoryId={campaign.categoryId}
                    campaignId={campaign.campaignId}
                  />
                )}
              </CampaignImage>
              <CampaignCardInfo>
                <Price>{campaign.price.toLocaleString()}P</Price>
                <Title>{campaign.title}</Title>
                <Participants>
                  신청 | <em>{campaign.joins}</em>/{campaign.quota}명
                </Participants>
              </CampaignCardInfo>
            </CampaignCard>
          )
        })}
      </CampaignList>
      {/* Infinite scroll */}
      <div ref={loadMoreRef}>
        {isFetchingNextPage ? <p>Loading more...</p> : null}
      </div>
    </>
  )
}

export default MainPage

// Styled Components
const CampaignList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.4rem;
  list-style-type: none;
  padding: 24px 0 64px;
  width: 100%;
`

const CampaignCard = styled.li<{ $isEnded: boolean }>`
  position: relative; /* 딤드 및 오버레이 위치를 위해 relative 설정 */
  width: 100%;
  overflow: hidden;
  background-color: white;
  pointer-events: ${(props) =>
    props.$isEnded ? "none" : "auto"}; /* 클릭 불가 처리 */
`

const CampaignImage = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: var(--white);
  img {
    width: 100%;
    height: 178px;
    object-fit: cover;
  }
`

const RemainingDays = styled.span<{ $isEnded: boolean }>`
  position: absolute;
  top: ${(props) => (props.$isEnded ? "50%" : "10px")};
  left: ${(props) => (props.$isEnded ? "50%" : "10px")};
  transform: ${(props) => (props.$isEnded ? "translate(-50%, -50%)" : "none")};
  background-color: black;
  color: white;
  padding: 5px 6px;
  border-radius: 0.2rem;
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  z-index: 2;
`

const EndedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* 딤드 배경 */
  z-index: 1;
`

const CampaignCardInfo = styled.div`
  padding: 1.2rem 0;
`

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  line-height: var(--base-line-height);
`

const Title = styled.p`
  line-height: var(--font-h1-line-height);
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0.4rem 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Participants = styled.p`
  margin: 1rem 0 0.8rem;
  font-size: 1.2rem;
  color: var(--n200-color);
  em {
    color: var(--primary-color);
    font-weight: 500;
  }
`
