import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSetRecoilState, useRecoilValue } from "recoil"
import { getCampaignList } from "services/campaign"
import { campaignListState, filteredCampaignList } from "store/recoil"
import { CampaignListRequest } from "types/api-types/campaign-type"
import { FilterBar } from "components/FilterBar"
import styled from "styled-components"

const MainPage = () => {
  const setCampaignList = useSetRecoilState(campaignListState) // 캠페인 리스트 설정
  const filteredCampaigns = useRecoilValue(filteredCampaignList) // 필터링된 캠페인 리스트 읽기
  // const [likedCampaigns, setLikedCampaigns] = useRecoilState(campaignLikeState); // 찜한 캠페인 상태

  // 쿼리 함수: CampaignListRequest를 보내고, getCampaignList로 데이터를 가져옴
  const fetchCampaigns = async (): Promise<any> => {
    const requestData: CampaignListRequest = {
      pageSize: 20,
      pageIndex: 1,
    }
    return await getCampaignList(requestData) // API 호출
  }

  // React Query로 API 호출
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  })

  // API 응답 데이터를 Recoil 아톰에 저장
  useEffect(() => {
    if (data?.list) {
      setCampaignList(data.list)
    }
  }, [data, setCampaignList])

  // 찜하기 기능 토글
  // const toggleLike = (campaignId: number) => {
  //   if (likedCampaigns.includes(campaignId)) {
  //     setLikedCampaigns(likedCampaigns.filter(id => id !== campaignId)); // 찜 해제
  //   } else {
  //     setLikedCampaigns([...likedCampaigns, campaignId]); // 찜 추가
  //   }
  // };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading campaigns</div>

  return (
    <>
      <FilterBar />

      <CampaignList>
        {filteredCampaigns.map((campaign) => {
          // const isLiked = likedCampaigns.includes(campaign.campaignId); // 찜 여부 확인
          const remainingDays = Math.floor(
            (new Date(campaign.endAt).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          ) // 남은 일수 계산

          return (
            <CampaignCard key={campaign.campaignId}>
              <CampaignImage>
                <img
                  src={campaign.thumbnailUrl || "default-image.jpg"}
                  alt={campaign.title}
                />
                <RemainingDays>-{remainingDays}일</RemainingDays>
              </CampaignImage>

              <Price>{campaign.price.toLocaleString()}P</Price>
              <Title>{campaign.title}</Title>
              <Participants>
                신청 | {campaign.joins}/{campaign.quota}명
              </Participants>
            </CampaignCard>
          )
        })}
      </CampaignList>
    </>
  )
}

export default MainPage

const CampaignList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 카드 사이의 간격 */
  list-style-type: none;
  padding: 0;
  width: 100%;
`

const CampaignCard = styled.li`
  width: 48.5%; /* 항상 2열로 배치 */
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  padding: 10px;
`

const CampaignImage = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`

const RemainingDays = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
`

const LikeButton = styled.button<{ isLiked: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.isLiked ? "red" : "gray")};
`

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`

const Title = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
`

const Participants = styled.p`
  font-size: 12px;
  color: #888;
  margin: 10px 0;
`
