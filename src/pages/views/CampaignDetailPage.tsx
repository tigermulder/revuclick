import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
import { getCampaignItem } from "services/campaign"
import { CampaignItemResponse } from "@/types/api-types/campaign-type"
import { formatDate } from "@/utils/util"
import IconNoticeArrow from "assets/ico-notice-arrow.svg?react"
import IconCampaignHeart from "assets/ico-campaign-detail-heart.svg?react"
import CampaignDetailBackButton from "@/components/CampaignDetailBackButton"
import CampaignDetailShareButton from "@/components/CampaignDetailShareButton"
import Button from "@/components/Button"
import LikeButton from "@/components/LikeButton"

// React Query 키
const CAMPAIGN_ITEM_QUERY_KEY = (campaignId: string | number) => [
  "campaign",
  campaignId,
]

export const CampaignDetailPage = () => {
  const { campaignId } = useParams()

  if (!campaignId) {
    return <div>유효하지 않은 캠페인 ID입니다.</div>
  }

  // React Query로 캠페인 상세 데이터 불러오기
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
        token: "",
      }),
    enabled: !!campaignId,
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

  return (
    <>
      <CampaignDetailBackButton />
      <CampaignDetailShareButton />
      <Background $imageUrl={campaignDetail.thumbnailUrl}>
        <PopUp>
          🎉 신청을 서두르세요! 신청인원 {campaignDetail.joins}/
          {campaignDetail.quota}
        </PopUp>
      </Background>

      <Content>
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
        <ButtonWrapper>{/* <Button>상품보러가기</Button> */}</ButtonWrapper>
      </Content>

      <Line />

      <ContentTab>
        <li className="selected">캠페인 정보</li>
      </ContentTab>

      <Main>
        <div>
          {/* 이미지 공간 */}
          <ImagePlaceholder />
        </div>
        <MainButtonWrap>
          {/* 이용가이드 상세보기 버튼 */}
          <Button $variant="outlined">이용가이드 상세보기</Button>
        </MainButtonWrap>
      </Main>

      <Notice>
        <NoticeTitle>※ 유의사항 안내</NoticeTitle>
        {/* 아이콘 공간 */}
        <IconPlaceholder>
          <IconNoticeArrow />
        </IconPlaceholder>
      </Notice>
      <NoticeContent>
        <NoticeBox>
          <li>
            배송 관련 문의는 제품 상세페이지 내 표시된 담당자 연락처로 연락하여
            조율하시기 바랍니다.
          </li>
          <li>
            배송 지연, 상품 파손 등과 같은 사유로 인하여 진행이 어려운 경우
            고객센터로 문의바랍니다.
          </li>
          <li>
            정당한 사유 없이 리뷰 작성 기간 내 리뷰를 작성하지 않거나, 부정
            행위가 적발될 경우 미션 실패로 간주되며, 포인트는 지급되지 않습니다.
          </li>
          <li>
            동일한 내용의 도배성 리뷰를 작성하거나 반복적으로 리뷰를 삭제 후
            재작성하는 등으로 리뷰의 본래 목적에 어긋나는 경우 부정행위로
            간주하며, 포인트는 지급되지 않습니다.
          </li>
        </NoticeBox>
      </NoticeContent>

      <FooterButtons>
        {/* 찜하기 버튼 */}
        <LikeButton
          categoryId={campaignDetail.categoryId}
          campaignId={campaignDetail.campaignId}
        />
        {/* 캠페인 신청하기 버튼 */}
        <Button $variant="red">캠페인 신청하기</Button>
      </FooterButtons>
    </>
  )
}

/** 스타일드 컴포넌트 정의 **/

const Background = styled.div<{ $imageUrl: string }>`
  position: relative;
  background-image: url(${(props) => props.$imageUrl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 379px;
`

const PopUp = styled.div`
  width: calc(100% - 30px);
  position: absolute;
  bottom: 107px;
  left: 50%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: start;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 20px;
  color: #570be5;
  font-size: var(--font-bodyL-size);
  font-weight: var(--font-bodyL-weight);
  line-height: var(--font-bodyL-line-height);
  letter-spacing: var(--font-bodyL-letter-spacing);
`

const Content = styled.div`
  padding: 1.9rem 1.5rem;
  position: relative;
  margin-top: -99px;
  border-radius: 3rem 3rem 0 0;
  background: #fff;
  z-index: 100;
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
  margin-top: 1.1rem;
  font-size: var(--font-h3-size);
  font-weight: var(--font-h3-weight);
  line-height: var(--font-h3-line-height);
  letter-spacing: var(--font-h3-letter-spacing);
`

const Divider = styled.hr`
  margin-top: 8px;
  background: var(--n40-color);
  height: 1px;
  border: 0;
`

const CampaignContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 300px;
  background-color: #fff;
  border-radius: 10px;
  height: 80px;
  margin: 14px auto;
`

const IconPlaceholder = styled.div`
  /* 아이콘 공간 */
  width: 24px;
  height: 24px;
`

const CampaignDetails = styled.ul`
  list-style: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 7px;

  li {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--n300-color);
    margin-bottom: 10px;

    span:nth-child(1) {
      display: block;
      width: 100px;
      flex-shrink: 0;
    }
  }
`

const DetailInfo = styled.span`
  color: #000;
  font-weight: bold;
`

const ButtonWrapper = styled.div`
  margin-top: 33px;
  padding: 0 33px;
`

const Line = styled.div`
  background-color: var(--n20-color);
  height: 6px;
  width: 100%;
`

const ContentTab = styled.ul`
  padding-left: 23px;
  margin-top: 12px;

  li {
    &.selected {
      /* 선택된 탭 스타일 */
    }
  }
`

const Main = styled.div`
  padding: 23px;
`

const ImagePlaceholder = styled.div`
  /* 이미지 공간 */
  height: 200px;
  background-color: #eee;
`

const MainButtonWrap = styled.div`
  padding-top: 51px;
  margin-top: -30px;
  z-index: 10;
  position: relative;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 32.19%);
`

const OutlinedButton = styled.button`
  /* outlined 버튼 스타일 */
`

const Notice = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 22px 16px 15px 16px;
`

const NoticeTitle = styled.p`
  font-weight: bold;
  font-size: 1.4rem;
`

const NoticeContent = styled.div`
  padding: 0 16px 100px 16px;
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

const CampaignHeart = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 3px;
  display: inline-flex;
`

const HeartText = styled.div`
  text-align: center;
  color: #e50b14;
  font-size: 7px;
  font-family: "SUIT", sans-serif;
  font-weight: 600;
  word-wrap: break-word;
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

const HeartButton = styled.button`
  background: url(./assets/img/ico--heart.png) no-repeat center / 100%;
  width: 30px;
  height: 40px;
`

const RedButton = styled.button`
  /* 버튼 스타일 */
  background-color: var(--revu-color);
  color: #fff;
  padding: 10px 20px;
  border-radius: 16px;
`
