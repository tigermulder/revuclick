import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useAuth } from "@/contexts/AuthContext"
import { getCampaignItem } from "services/campaign"
import { CampaignItemResponse } from "@/types/api-types/campaign-type"
import { formatDate } from "@/utils/util"
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

// React Query 키
const CAMPAIGN_ITEM_QUERY_KEY = (campaignId: string | number) => [
  "campaign",
  campaignId,
]

const CampaignDetailPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedTab, setSelectedTab] = useState("info") // 기본선택
  const [isGuideOpen, setIsGuideOpen] = useState(false) // 가이드 표시 여부 상태 추가
  const { campaignId } = useParams()
  const { isLoggedIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  // 토글 핸들러
  const toggleNotice = () => {
    setIsOpen(!isOpen)
  }

  // 가이드 토글 핸들러
  const toggleGuide = () => {
    setIsGuideOpen((prev) => !prev)
  }

  // 탭이 하나만 들어가는 경우
  const singleTab = [{ label: "캠페인 정보", value: "info" }]
  const handleTabSelect = (tabValue: string) => {
    setSelectedTab(tabValue)
  }

  // 패럴랙스 효과를 위한 상태
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () => {
    setOffsetY(window.pageYOffset)
  }

  useEffect(() => {
    const handleScrollThrottled = () => {
      requestAnimationFrame(handleScroll)
    }
    window.addEventListener("scroll", handleScrollThrottled)
    return () => window.removeEventListener("scroll", handleScrollThrottled)
  }, [])

  if (!campaignId) {
    return <div>유효하지 않은 캠페인 ID입니다.</div>
  }

  // React Query로 캠페인 상세 데이터 불러오기
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
    staleTime: 10 * 60 * 1000, // 10분 동안 데이터가 신선함
    gcTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    refetchOnWindowFocus: false, // 창에 포커스를 맞출 때 재패칭하지 않음
    placeholderData: keepPreviousData, // 이전 데이터를 유지
  })

  // 로딩 중일 때
  if (isLoading) {
    return <div>로딩 중입니다...</div>
  }

  // 에러 발생 시
  if (isError) {
    return <div>{error?.message || "캠페인 정보를 불러오지 못했습니다."}</div>
  }

  // 캠페인 데이터가 없는 경우
  if (!campaignData) {
    return <div>캠페인 정보를 불러올 수 없습니다.</div>
  }

  const campaignDetail = campaignData.campaign

  // 적립률 계산
  const discountRate = (
    (campaignDetail.reward / campaignDetail.price) *
    100
  ).toFixed(0)

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
      navigate(RoutePath.Login, { replace: true }) // replace 옵션 추가
    } else {
      // 로그인된 상태에서 캠페인 신청 로직 수행
      navigate(`/campaign/${campaignId}/apply`)
    }
  }

  return (
    <>
      <CampaignDetailBackButton />
      <CampaignDetailShareButton />
      <ShareModal /> {/* 공유 모달 추가 */}
      <DetailHeader>
        <Background $imageUrl={campaignDetail.thumbnailUrl}>
          <PopUp $offsetY={offsetY}>
            🎉 신청을 서두르세요! 신청인원 {campaignDetail.joins}/
            {campaignDetail.quota}
          </PopUp>
        </Background>
      </DetailHeader>
      <DetailBody>
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
                {campaignDetail.price.toLocaleString()}원({discountRate}%)
              </DetailInfo>
            </li>
            <li>
              <span>적립포인트</span>
              <DetailInfo>{campaignDetail.reward.toLocaleString()}P</DetailInfo>
            </li>
          </CampaignDetails>
        </CampaignContainer>
        <Button $variant="outlined">상품구경하기</Button>
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
          {/* 이용가이드 상세보기 버튼 */}
          <ButtonContainer $isGuideOpen={isGuideOpen}>
            <Button $variant="outlined" onClick={toggleGuide}>
              {isGuideOpen ? "이용가이드 닫기" : "이용가이드 상세보기"}
            </Button>
          </ButtonContainer>
        </Main>
        <Notice onClick={toggleNotice}>
          <NoticeTitle>※ 유의사항 안내</NoticeTitle>
          <IconPlaceholder>
            <IconNoticeArrow
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </IconPlaceholder>
        </Notice>
        {isOpen && (
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
              영수증 인증 완료 후 7일 이내 남은 미션을 완료해주시기
              바랍니다.(캠페인 미션 기간 준수)
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
        )}
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

const Line = styled.div`
  background-color: var(--n20-color);
  height: 4px;
  width: 100%;
  margin-top: 1.6rem;
`

const DetailHeader = styled.div`
  position: relative;
  height: 420px;
`

const Background = styled.div<{ $imageUrl: string }>`
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
`

const PopUp = styled.div.attrs<{ $offsetY: number }>(({ $offsetY }) => ({
  style: {
    transform: `translate(-50%, ${$offsetY * 0.5}px)`,
  },
}))<{ $offsetY: number }>`
  width: calc(100% - 30px);
  position: absolute;
  bottom: 107px;
  left: 50%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: start;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 0 20px;
  color: #570be5;
  font-size: var(--font-bodyL-size);
  font-weight: var(--font-bodyL-weight);
  line-height: var(--font-bodyL-line-height);
  letter-spacing: var(--font-bodyL-letter-spacing);
  will-change: transform;
  transition: transform 0.1s ease-out;
`

const DetailBody = styled.div`
  position: relative;
  top: -96px;
  padding: 1.9rem 1.5rem 9.6rem;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -17px;
    transform: translateY(-50%);
    height: 90%;
    width: 1px;
    margin-top: 5px;
    border-left: 0.2rem dashed var(--n40-color);
  }
  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    font-size: var(--font-bodyL-size);
    font-weight: var(--font-bodyL-weight);
    line-height: var(--font-bodyL-line-height);
    letter-spacing: var(--font-bodyL-letter-spacing);
    margin-top: 0.4rem;
    span {
      color: var(--n300-color);
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -19px;
      transform: translateY(-50%);
      width: 5px;
      height: 5px;
      background: var(--n80-color);
      border-radius: 50%;
    }
    &:nth-child(1)::before {
      background: url(${IconStar}) no-repeat center / 100%;
      width: 13px;
      height: 16px;
    }
    &:nth-child(1) {
      color: var(--primary-color);
      margin-top: 0;
    }
    span:nth-child(1) {
      display: block;
      width: 100px;
      flex-shrink: 0;
    }
    &:last-child span:nth-child(1),
    &:last-child span:nth-child(2) {
      font-weight: var(--font-weight-bold);
    }
  }
`

const DetailInfo = styled.span`
  color: #000;
`

const Main = styled.div`
  padding-top: 23px;
`

const ImagePlaceholder = styled.div`
  height: 200px;
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

const ButtonContainer = styled.div<{ $isGuideOpen: boolean }>`
  padding-top: 5rem;
  position: relative;
  top: -30px;
  z-index: 10;
  background: ${(props) =>
    !props.$isGuideOpen
      ? "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 32.19%)"
      : "none"};
`

const Notice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 0 15px 0;
  cursor: pointer;
`

const NoticeTitle = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
`

const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  transition: transform 0.1s ease;
`

const NoticeBox = styled.ul`
  padding: 16px 32px;
  background: #f5f6f8;
  color: #415058;
  font-size: 1.4rem;
  line-height: 1.4;
  list-style-type: disc;
  li {
    margin-bottom: 10px;
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
