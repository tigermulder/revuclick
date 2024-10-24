import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getReviewItem, authReview } from "@/services/review"
import useScrollToTop from "@/hooks/useScrollToTop"
import ReuseHeader from "@/components/ReuseHeader"
import dummyImage from "assets/dummy-image.png"
import SampleReviewImage from "assets/pro-sample-review.png"
import { calculateRemainingTime } from "@/utils/util"
import { ReviewAuthResponse } from "@/types/api-types/review-type"
import { handleAuthError } from "@/types/component-types/my-campaigndetail-type"
import {
  HeaderStatusType,
  HEADER_TITLES,
} from "@/types/component-types/my-campaigndetail-type"
import StepOne from "./MyCampaignDetail/StepOne"
import StepTwo from "./MyCampaignDetail/StepTwo"

const MyCampaignDetailLayout = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { reviewId } = useParams<{ reviewId: string }>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentStep, setCurrentStep] = useState<number>(1)

  //** 스크롤 0부터시작 */
  useScrollToTop()

  // 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }
  // 영수증 OCR 핸들러
  const handleReceiptOCR = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file && reviewId) {
      setSelectedFile(file)
      const formData = new FormData()
      formData.append("reviewId", reviewId)
      formData.append("file", file)
      try {
        const response: ReviewAuthResponse = await authReview(formData)
        if (response.statusCode === 0) {
          console.log("인증 성공:", response)
        } else {
          // handleAuthError(response.statusCode)
        }
      } catch (error) {
        console.error("인증 실패:", error)
      }
    } else {
      // 파일 또는 reviewId가 없는 경우 처리
      console.warn("파일 또는 reviewId가 누락되었습니다.")
    }
  }

  // My리뷰내역Detail fetch
  const fetchCampaignListItem = async (reviewId: string) => {
    const reviewIdKey = {
      reviewId,
    }
    const response = await getReviewItem(reviewIdKey)
    return response
  }
  const { data } = useQuery({
    queryKey: ["reviewListItem", reviewId],
    queryFn: () => fetchCampaignListItem(reviewId as string),
    enabled: !!reviewId,
  })
  const {
    status,
    campaignThumb,
    campaignTitle,
    campaignUrl,
    reward,
    endAt,
    creatAt,
  } = {
    status: data?.review.status as HeaderStatusType,
    campaignThumb: data?.campaign.thumbnailUrl,
    campaignTitle: data?.campaign.title,
    campaignUrl: data?.campaign.purchaseUrl,
    reward: data?.campaign.reward,
    endAt: data?.campaign.endAt,
    creatAt: String(data?.campaign.createdAt),
  }
  // 남은 시간 계산
  const { remainingTime, isEnded } = calculateRemainingTime(endAt)
  const thumbnailUrl = campaignThumb || dummyImage
  // 새 창으로 이동하는 핸들러
  const handleNavigate = () => {
    const url = campaignUrl // 이동하려는 URL
    window.open(url, "_blank")
  }

  //** 상세 스텝 결정 */
  useEffect(() => {
    if (status === "join" || status === "purchase") {
      setCurrentStep(1)
    } else if (status === "confirm") {
      setCurrentStep(2)
    } else if (status === "upload") {
      setCurrentStep(3)
    }
  }, [status])
  // ReuseHeader 제목
  const headerTitle: string =
    (status && HEADER_TITLES[status]) || "마이캠페인상세"
  const renderStepContent = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            thumbnailUrl={thumbnailUrl}
            campaignTitle={campaignTitle}
            reward={reward}
            isEnded={isEnded}
            remainingTime={remainingTime}
            ReviewImage={SampleReviewImage}
            fileInput={fileInputRef}
            handleNavigate={handleNavigate}
            handleButton={handleButtonClick}
            ReceiptOCR={handleReceiptOCR}
          />
        )
      case 2:
        return (
          <StepTwo
            thumbnailUrl={thumbnailUrl}
            campaignTitle={campaignTitle}
            reward={reward}
            isEnded={isEnded}
            remainingTime={remainingTime}
            creatTime={creatAt}
          />
        )
      case 3:
        return (
          <div>
            <div></div>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <>
      <ReuseHeader title={headerTitle} />
      {/* 스텝마다 다른페이지 */}
      {renderStepContent()}
    </>
  )
}

export default MyCampaignDetailLayout
