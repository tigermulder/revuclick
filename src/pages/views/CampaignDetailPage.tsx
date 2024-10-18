import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { getCampaignItem } from "services/campaign"
import { CampaignItemResponse } from "@/types/api-types/campaign-type"
import { formatDate, disCountRate } from "@/utils/util"
import IconNoticeArrow from "assets/ico-notice-arrow.svg?react"
import IconStar from "assets/ico-star.svg?url"
import CampaignDetailBackButton from "@/components/CampaignDetailBackButton"
import CampaignDetailShareButton from "@/components/CampaignDetailShareButton"
import Button from "@/components/Button"
import LikeButton from "@/components/LikeButton"
import ShareModal from "@/components/ShareModal"
import useToast from "@/hooks/useToast"
import styled from "styled-components"
import { RoutePath } from "@/types/route-path"
import ContentTab from "@/components/Tab"
import dummyImage from "assets/dummy-image.png"

// React Query 키
const CAMPAIGN_ITEM_QUERY_KEY = (campaignId: string | number) => [
  "campaign",
  campaignId,
]

const CampaignDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState("info") // 기본선택
  const [isGuideOpen, setIsGuideOpen] = useState(false) // 가이드 표시 여부 상태 추가
  const [popUpOffsetY, setPopUpOffsetY] = useState(-62) // PopUp 위치 상태 추가
  const [scale, setScale] = useState(1) // 배경 이미지 확대 상태
  const [headerOpacity, setHeaderOpacity] = useState(1) // 헤더 투명도 상태
  const { campaignId } = useParams()
  const { isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 가이드 토글 핸들러
  const toggleGuide = () => {
    setIsGuideOpen(true)
  }

  // 탭 설정
  const singleTab = [{ label: "캠페인 정보", value: "info" }]
  const handleTabSelect = (tabValue: string) => {
    setSelectedTab(tabValue)
  }

  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight

      // 스크롤 위치를 0과 maxScroll 사이로 제한
      const clampedScrollPosition = Math.max(
        0,
        Math.min(scrollPosition, maxScroll)
      )

      // PopUp 위치 업데이트
      let newOffsetY = -62

      if (clampedScrollPosition <= 100) {
        newOffsetY = -62 + (clampedScrollPosition / 100) * 62
      } else {
        newOffsetY = 0
      }

      setPopUpOffsetY(newOffsetY)

      // 배경 이미지 확대 효과 적용 (최상단에서)
      if (scrollPosition < 0) {
        const scaleFactor = 1 - scrollPosition / 400
        setScale(scaleFactor)
      } else {
        setScale(1)
      }

      // 하단에서 오버 스크롤 시 헤더 숨기기
      if (scrollPosition >= maxScroll) {
        setHeaderOpacity(0)
      } else {
        setHeaderOpacity(1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!campaignId) {
    return <div>유효하지 않은 캠페인 ID입니다.</div>
  }

  // 캠페인 상세 데이터 가져오기
  const token = sessionStorage.getItem("authToken") || ""
  const {
    data: campaignData,
    isLoading,
    isError,
    error,
  } = useQuery<CampaignItemResponse, Error>({
    queryKey: CAMPAIGN_ITEM_QUERY_KEY(campaignId),
    queryFn: () =>
      getCampaignItem({
        campaignId: Number(campaignId),
        token: token,
      }),
    enabled: !!campaignId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })

  // 에러 처리
  if (isError) {
    return <div>{error?.message || "캠페인 정보를 불러오지 못했습니다."}</div>
  }

  // 데이터 없을 때
  if (!campaignData) {
    return <div>캠페인 정보를 불러올 수 없습니다.</div>
  }

  const campaignDetail = campaignData.campaign

  // D-Day 계산
  const today = new Date()
  const endDate = new Date(campaignDetail.endAt)
  const diffTime = endDate.getTime() - today.getTime()
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // 캠페인 신청하기 버튼 클릭 핸들러
  const handleApply = () => {
    if (!isLoggedIn) {
      // 토스트 메시지 추가
      addToast("로그인이 필요합니다.", "warning", 1000, "login")
      navigate(RoutePath.Login, { replace: true })
    } else {
      // 로그인된 상태에서 캠페인 신청 로직 수행
      navigate(`/campaign/${campaignId}/apply`)
    }
  }

  const thumbnailUrl = campaignDetail.thumbnailUrl || dummyImage
  return (
    <>
      <CampaignDetailBackButton />
      <CampaignDetailShareButton />
      <ShareModal />
      <DetailHeader>
        <Background
          $imageUrl={thumbnailUrl}
          $scale={scale}
          $opacity={headerOpacity}
        />
      </DetailHeader>
      <DetailBody>
        {/* PopUp을 DetailBody 내부에 조건부로 렌더링 */}
        <PopUp $offsetY={popUpOffsetY}>
          🎉 신청을 서두르세요! 신청인원 {campaignDetail.joins}/
          {campaignDetail.quota}
        </PopUp>
        <Dday>{`D-${dDay}`}</Dday>
        <Title>{campaignDetail.title}</Title>
        <Divider />
        <CampaignContainer>
          <CampaignDetails>
            <li>
              <span>캠페인 신청기간</span>
              <DetailInfo>
                {formatDate(campaignDetail.startAt)} ~{" "}
                {formatDate(campaignDetail.endAt)}
              </DetailInfo>
            </li>
            <li>
              <span>미션완료기간</span>
              <DetailInfo>미션 완료 기간 정보 없음</DetailInfo>
            </li>
            <li>
              <span>판매가(적립률)</span>
              <DetailInfo>
                {campaignDetail.price.toLocaleString()}원(
                {disCountRate(campaignDetail.reward, campaignDetail.price)}%)
              </DetailInfo>
            </li>
            <li>
              <span>적립포인트</span>
              <DetailInfo>{campaignDetail.reward.toLocaleString()}P</DetailInfo>
            </li>
          </CampaignDetails>
        </CampaignContainer>
        <Button $variant="arrow">상품구경하기</Button>
        <Line />
        <ContentTab
          tabs={singleTab}
          selectedTab={selectedTab}
          onTabSelect={handleTabSelect}
        />
        <Main>
          <div>
            {/* 이미지 공간 */}
            <ImagePlaceholder />
            {/* GuideCont를 조건부로 렌더링 */}
            {isGuideOpen && (
              <GuideCont>
                <p className="tit">캠페인 미션 프로세스</p>
                <ul className="proc-list">
                  <li className="proc-item">
                    <div></div>
                    <span>캠페인신청</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>상품구매</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>구매 영수증 인증</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>배송완료</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>미션완료</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>포인트지급요청</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>리뷰등록</span>
                  </li>
                  <li className="proc-item">
                    <div></div>
                    <span>리뷰검수</span>
                  </li>
                </ul>
              </GuideCont>
            )}
          </div>
          {!isGuideOpen && (
            <ButtonContainer>
              <Button $variant="outlined" onClick={toggleGuide}>
                이용가이드 상세보기
              </Button>
            </ButtonContainer>
          )}
        </Main>
        {/* 유의사항 섹션 */}
        <Details open>
          <Summary>
            <NoticeTitle>※ 유의사항 안내</NoticeTitle>
            <IconPlaceholder>
              <StyledIconNoticeArrow />
            </IconPlaceholder>
          </Summary>
          <NoticeBox>
            <li>
              캠페인 상세 페이지 내 URL을 통하여 구매한 건에 대해서만
              인정됩니다.
            </li>
            <li>
              기간 내 영수증 인증 &gt; 리뷰 등록 및 인증이 완료된 후 포인트가
              적립됩니다.
            </li>
            <li>
              영수증 인증 완료 후 7일 이내 남은 미션을 완료해주시기 바랍니다.
              (캠페인 미션 기간 준수)
            </li>
            <li>
              정당한 사유 없이 캠페인 미션 기간 내 리뷰를 등록하지 않거나, 부정
              행위가 적발 될 경우 미션 실패로 간주되며, 포인트는 지급되지
              않습니다.
            </li>
            <li>
              배송 관련 문의는 제품 상세 페이지 내 표시된 담당자 연락처로
              연락하여 조율하시기 바랍니다.
            </li>
            <li>
              배송 지연, 상품 파손 등과 같은 사유로 인하여 진행이 어려운 경우
              고객센터로 문의바랍니다.
            </li>
            <li>
              제공받은 제품 재판매 적발 시 회수는 물론, 법적 조치로 인한
              불이익을 받을 수 있습니다.
            </li>
            <li>작성된 콘텐츠는 최소 6개월 유지해주셔야 합니다.</li>
            <li>
              공정거래위원회 지침에 따른 대가성 문구를 포함해주시기 바랍니다.
            </li>
          </NoticeBox>
        </Details>
        <FooterButtons>
          {/* 찜하기 버튼 */}
          <LikeButton
            categoryId={campaignDetail.categoryId}
            campaignId={campaignDetail.campaignId}
          />
          {/* 캠페인 신청하기 버튼 */}
          <Button onClick={handleApply} $variant="red">
            캠페인 신청하기
          </Button>
        </FooterButtons>
      </DetailBody>
    </>
  )
}

export default CampaignDetailPage

// 스타일 컴포넌트 정의
const Line = styled.div`
  position: relative;
  margin-top: 1.6rem;
  height: 0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -1.5rem; /* 부모의 좌측 패딩 값 */
    width: calc(100% + 3rem); /* 좌우 패딩의 합 */
    height: 0.4rem;
    background-color: var(--n20-color);
  }
`

const DetailHeader = styled.div`
  position: relative;
  height: 420px;
`

const Background = styled.div<{
  $imageUrl: string
  $scale: number
  $opacity: number
}>`
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.$imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 420px;
  z-index: -10;
  transform: scale(${(props) => props.$scale});
  opacity: ${(props) => props.$opacity};
  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out;
`

const PopUp = styled.div.attrs<{ $offsetY: number }>(({ $offsetY }) => ({
  style: {
    transform: `translate(-50%, ${$offsetY}px)`,
  },
}))<{ $offsetY: number }>`
  width: calc(100% - 30px);
  position: absolute;
  left: 50%;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: start;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  padding: 0 2rem;
  color: var(--purple);
  font-size: var(--font-bodyL-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-bodyL-line-height);
  letter-spacing: var(--font-bodyL-letter-spacing);
  will-change: transform;
  transition: transform 0.2s ease-out;
  z-index: -1;
`

const DetailBody = styled.div`
  position: relative;
  top: -9.9rem;
  padding: 1.9rem 1.5rem 6.6rem;
  border-radius: 3rem 3rem 0 0;
  background: #fff;
`

const Dday = styled.span`
  border-radius: 30px;
  display: inline-block;
  padding: 0.3rem 0.8rem;
  font-size: var(--font-callout-small-size);
  font-weight: var(--font-callout-small-weight);
  line-height: var(--font-callout-small-line-height);
  letter-spacing: var(--font-callout-small-letter-spacing);
  background: var(--prim-L20);
  color: var(--revu-color);
`

const Title = styled.p`
  margin: 1.1rem 0;
  font-size: var(--font-h3-size);
  font-weight: var(--font-h3-weight);
  line-height: var(--font-h3-line-height);
  letter-spacing: var(--font-h3-letter-spacing);
`

const Divider = styled.hr`
  background: var(--n40-color);
  height: 1px;
  border: 0;
`

const CampaignContainer = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  height: 80px;
  margin: 30px 0 28px 5px;
  padding: 0 0 0 20px;
`

const CampaignDetails = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -1.2rem;
    transform: translateY(-50%);
    width: 1px;
    height: 90%;
    border-left: 0.2rem dashed var(--n40-color);
  }

  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    font-size: var(--font-bodyL-size);
    font-weight: var(--font-bodyL-weight);
    line-height: var(--font-bodyL-line-height);
    letter-spacing: var(--font-bodyL-letter-spacing);

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -1.35rem;
      transform: translateY(-50%);
      width: 0.5rem;
      height: 0.5rem;
      background: var(--n80-color);
      border-radius: 50%;
    }
    &:first-child {
      margin-top: 0;
      color: var(--primary-color);
      &::before {
        background: url(${IconStar}) no-repeat center / contain;
        width: 1.3rem;
        height: 1.6rem;
        left: -1.6rem;
      }
      span:first-child,
      span:last-child {
        color: inherit;
      }
    }
    &:not(:first-child) {
      span:first-child {
        color: var(--n300-color);
      }
      span:last-child {
        color: var(--n300-color);
      }
    }
    &:last-child {
      span:first-child,
      span:last-child {
        font-weight: var(--font-weight-bold);
      }
    }

    span {
      &:first-child {
        display: block;
        width: 100px;
        flex-shrink: 0;
      }
    }
  }
`

const DetailInfo = styled.span`
  color: #000;
`

const Main = styled.div`
  padding: 1.4rem 0;
`

const ImagePlaceholder = styled.div`
  height: 355px;
  background-color: #eee;
`

const GuideCont = styled.div`
  margin-top: 2.2rem;
  border-top: 0.1rem solid var(--n80-color);
  padding: 3rem 0 1.8rem;

  .tit {
    font-size: var(--font-title-size);
    font-weight: var(--font-title-weight);
    line-height: var(--font-title-line-height);
    letter-spacing: var(--font-title-letter-spacing);
  }

  .proc-list {
    margin-top: 1.3rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 1.6rem;
    row-gap: 1.8rem;
    align-items: center;
    justify-content: center;
  }

  .proc-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .proc-item > div {
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    background: #d9d9d9;
  }

  .proc-item > span {
    color: #000;
    display: block;
    margin-top: 0.5rem;
    font-size: var(--font-caption-small-size);
    font-weight: var(--font-caption-small-weight);
    line-height: var(--font-caption-small-line-height);
    letter-spacing: var(--font-caption-small-letter-spacing);
  }
`

const ButtonContainer = styled.div`
  padding-top: 5rem;
  margin-top: -3rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 32.19%);
`

const Details = styled.details`
  margin: 2rem 0;
  cursor: pointer;
`

const Summary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &::-webkit-details-marker {
    display: none;
  }
`

const NoticeTitle = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
`

const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  transition: transform 0.1s ease;
  transform: rotate(180deg);

  details[open] & {
    transform: rotate(0deg);
  }
`

const StyledIconNoticeArrow = styled(IconNoticeArrow)`
  width: 100%;
  height: 100%;
`

const NoticeBox = styled.ul`
  padding: 1.6rem 1.6rem 1.6rem 3.2rem;
  margin-top: 1.5rem;
  border-radius: 1rem;
  background: var(--whitewood);
  color: var(--gray-01);
  font-size: 1.4rem;
  line-height: 1.4;

  li {
    position: relative;
  }
  li:not(:last-child) {
    margin-bottom: 0.2rem;
  }
  li:before {
    content: "";
    display: block;
    position: absolute;
    top: 20%;
    right: 100%;
    transform: translateY(-50%);
    margin-right: 1rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: var(--gray-01);
  }
`

const FooterButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
  padding: 15px 20px;
`
