import { useEffect } from "react"
import { getCampaignList } from "services/campaign"
import { CampaignListRequest } from "types/api-types/campaign-type"

const MainPage = () => {
  const handleCampignList = async () => {
    try {
      const requestData: CampaignListRequest = {
        // 요청 데이터에 필요한 값을 여기에 넣어주세요 (예: page, limit 등)

        pageSize: 20,
        pageIndex: 1,
      }

      // API 호출
      const response = await getCampaignList(requestData)
      
      // 응답 확인
      console.log("캠페인 리스트 응답:", response)
    } catch (error) {
      console.error("캠페인 리스트 가져오기 실패:", error)
    }
  }

  // 컴포넌트가 마운트될 때 캠페인 리스트 가져오기 실행
  useEffect(() => {
    handleCampignList()
  }, [])

  return (
    <div>
      <p>메인페이지입니다</p>
    </div>
  )
}

export default MainPage
