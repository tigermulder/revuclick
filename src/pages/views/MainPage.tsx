import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import {
  campaignListState,
  filteredCampaignList,
  campaignLikeState,
} from "store/recoil"
import { getCampaignList } from "services/campaign"
import { FilterBar } from "components/FilterBar"
import styled from "styled-components"

const MainPage = () => {
  const setCampaignList = useSetRecoilState(campaignListState)
  const filteredCampaigns = useRecoilValue(filteredCampaignList)
  const [likedCampaigns, setLikedCampaigns] = useRecoilState(campaignLikeState)
  const loadMoreRef = useRef(null)

  //** Fetch campaign list */
  const fetchCampaigns = async ({ pageParam = 1 }) => {
    const requestData = {
      pageSize: 10,
      pageIndex: pageParam,
    }
    const response = await getCampaignList(requestData)
    return response
  }

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

  //** 찜(좋아요) 상태 변경 함수 */
  const toggleLike = (categoryId: number, campaignId: number) => {
    setLikedCampaigns((prevLikes) => {
      // 현재 카테고리의 캠페인 ID 목록을 가져옴. 없으면 빈 배열로 초기화
      const currentLikes = prevLikes[categoryId] || []

      if (currentLikes.includes(campaignId)) {
        // 이미 찜한 경우 해당 캠페인을 제거
        return {
          ...prevLikes,
          [categoryId]: currentLikes.filter((id) => id !== campaignId),
        }
      } else {
        // 찜하지 않은 경우 캠페인을 추가
        return {
          ...prevLikes,
          [categoryId]: [...currentLikes, campaignId],
        }
      }
    })
  }

  useEffect(() => {
    console.log(likedCampaigns)
  }, [likedCampaigns])

  return (
    <>
      <FilterBar />
      <CampaignList>
        {filteredCampaigns?.map((campaign) => {
          // 남은 시간 계산
          const endTime = new Date(campaign.endAt).getTime()
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

          // 해당 캠페인이 찜되어 있는지 확인
          const isLiked =
            likedCampaigns[campaign.categoryId]?.includes(
              campaign.campaignId
            ) ?? false
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
                    onClick={() =>
                      toggleLike(campaign.categoryId, campaign.campaignId)
                    }
                  >
                    {isLiked ? "❤️" : "🤍"}
                  </LikeButton>
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

const CampaignList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style-type: none;
  padding: 24px 0;
  width: 100%;
`

const CampaignCard = styled.li<{ $isEnded: boolean }>`
  position: relative; /* 딤드 및 오버레이 위치를 위해 relative 설정 */
  width: 48.5%;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  pointer-events: ${(props) =>
    props.$isEnded ? "none" : "auto"}; /* 클릭 불가 처리 */
`

const CampaignImage = styled.div`
  position: relative;
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
  border-radius: 1px;
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

const LikeButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`

const CampaignCardInfo = styled.div`
  padding: 9px 2px;
`

const Price = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`

const Title = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
`

const Participants = styled.p`
  margin-top: 10px;
  font-size: 12px;
  color: #888;

  em {
    color: var(--primary-color);
  }
`
