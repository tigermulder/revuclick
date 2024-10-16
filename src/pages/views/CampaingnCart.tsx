import { useState, useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { campaignListState, campaignLikeState } from "@/store/mainpage-recoil"
import LikeButton from "components/LikeButton"
import FilterDropDown from "@/components/FilterDropDown"
import dummyImage from "assets/dummy-image.png"
import BackIcon from "assets/ico_back.svg?react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import useToast from "@/hooks/useToast"

const CampaignCart = () => {
  const likedCampaigns = useRecoilValue(campaignLikeState)
  const campaigns = useRecoilValue(campaignListState) // 캠페인 리스트 상태
  const setLikedCampaigns = useSetRecoilState(campaignLikeState)
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([])
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    // likedCampaigns에서 캠페인 ID들을 배열로 변환
    const campaignIds = Object.values(likedCampaigns).flat()

    // 캠페인 리스트에서 찜한 캠페인 필터링
    const filtered = campaigns.filter((campaign: any) =>
      campaignIds.includes(campaign.campaignId)
    )
    setFilteredCampaigns(filtered)
  }, [likedCampaigns, campaigns])

  // 찜 해제 시 로컬 스토리지와 상태 업데이트
  const handleUnlike = (campaignId: number, categoryId: number) => {
    const updatedLikes = { ...likedCampaigns }
    updatedLikes[categoryId] = updatedLikes[categoryId].filter(
      (id: number) => id !== campaignId
    )
    if (updatedLikes[categoryId].length === 0) {
      delete updatedLikes[categoryId]
    }
    setLikedCampaigns(updatedLikes) // Recoil 상태 업데이트 및 로컬 스토리지 반영
    addToast("찜한 목록에서 해제했어요.", "uncheck", 1000, "like")
  }

  return (
    <Container>
      {/* 공통 헤더 */}
      <Header>
        <HeaderLink onClick={() => navigate(-1)}>
          <BackIcon aria-label="뒤로가기" />
        </HeaderLink>
        <HeaderTitle>찜한 목록</HeaderTitle>
      </Header>

      {/* 캠페인 리스트 */}
      <CampaignList>
        <FilterContainer>
          <FilterDropDown />
        </FilterContainer>
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => {
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
              <CampaignItem key={campaign.campaignId}>
                <CampaignThumb>
                  <CampaignImage
                    src={campaign.thumbnailUrl || dummyImage}
                    alt={campaign.title}
                  />
                  <RemainingDays $isEnded={isEnded}>
                    {isEnded ? "캠페인 종료" : remainingTime}
                  </RemainingDays>
                </CampaignThumb>
                <CampaignInfo>
                  <CampaignPoints>
                    {campaign.price.toLocaleString()}P
                  </CampaignPoints>
                  <CampaignTitle>{campaign.title}</CampaignTitle>
                  <CampaignDescription>
                    신청 | <Join>{campaign.joins}</Join>/{campaign.quota}명
                  </CampaignDescription>
                  {/* 찜하기 버튼: 장바구니에서는 항상 찜된 상태 */}
                  <CustomLikeButton
                    categoryId={campaign.categoryId}
                    campaignId={campaign.campaignId}
                    onLikeToggle={() =>
                      handleUnlike(campaign.campaignId, campaign.categoryId)
                    }
                    isLiked={true}
                    className="cart-like-button"
                  />
                </CampaignInfo>
              </CampaignItem>
            )
          })
        ) : (
          <NoCampaigns>찜한 캠페인이 없습니다.</NoCampaigns>
        )}
      </CampaignList>
    </Container>
  )
}

export default CampaignCart

const CustomLikeButton = styled(LikeButton)`
  position: absolute;
  bottom: 50%;
  transform: translateY(55%);
  right: 1.5rem;
`

const Container = styled.div`
  padding: 0 0 2rem;
`

const Header = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white, #fff);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  z-index: 20;
`

const FilterContainer = styled.div`
  position: fixed;
  top: 3.8rem;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  background: #f5f6f8;
  padding: 0.8rem 1.5rem;
  z-index: 20;
`

const HeaderLink = styled.a`
  position: absolute;
  width: 1.9rem;
  left: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
  }
`

const HeaderTitle = styled.h1`
  font-size: var(--font-h3-size);
  font-weight: var(--font-h3-weight);
  line-height: var(--font-h3-line-height);
  letter-spacing: var(--font-h3-letter-spacing);
`

const CampaignList = styled.ul`
  padding: 8.6rem 0 5rem;
  list-style: none;
`

const CampaignItem = styled.li`
  display: flex;
  padding: 1.4rem 0;
  border-radius: 10px;
  width: 100%;
`

const CampaignThumb = styled.div`
  position: relative;
  width: 8.1rem;
  height: 8.1rem;
  overflow: hidden;
  border-radius: 1rem;
  flex-shrink: 0;
`

const CampaignImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`

const RemainingDays = styled.span<{ $isEnded: boolean }>`
  position: absolute;
  bottom: 0.7rem;
  left: 0;
  padding: 0.2rem 0.6rem;
  border-radius: 0.2rem;
  font-size: var(--font-caption-size);
  font-weight: var(--font-caption-weight);
  line-height: var(--font-caption-line-height);
  letter-spacing: var(--font-caption-letter-spacing);
  background: ${({ $isEnded }) =>
    $isEnded ? "rgba(0,0,0,0.5)" : "var(--primary-color)"};
  color: var(--white);
`

const CampaignInfo = styled.div`
  position: relative;
  padding: 0 1.4rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const CampaignPoints = styled.p`
  font-size: var(--font-h4-size);
  font-weight: var(--font-h4-weight);
  line-height: var(--font-h4-line-height);
  letter-spacing: var(--font-h4-letter-spacing);
`

const CampaignTitle = styled.span`
  margin-top: 0.5rem;
  font-size: var(--font-bodyM-size);
  font-weight: var(--font-bodyM-weight);
  line-height: var(--font-bodyM-line-height);
  letter-spacing: var(--font-bodyM-letter-spacing);
`

const CampaignDescription = styled.div`
  margin-top: 0.6rem;
  font-size: 1.2rem;
  font-weight: var(--font-weight-light);
  color: var(--n200-color);
`

const Join = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color);
`

const NoCampaigns = styled.p`
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--n200-color);
`
