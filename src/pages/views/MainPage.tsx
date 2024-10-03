import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { campaignListState, filteredCampaignList, campaignLikeState } from 'store/recoil';
import { getCampaignList } from 'services/campaign';
import { FilterBar } from 'components/FilterBar';
import styled from 'styled-components';

const MainPage = () => {
  const setCampaignList = useSetRecoilState(campaignListState);
  const filteredCampaigns = useRecoilValue(filteredCampaignList);
  const [likedCampaigns, setLikedCampaigns] = useRecoilState(campaignLikeState);
  const loadMoreRef = useRef(null);

  // Fetch campaign list
  const fetchCampaigns = async ({ pageParam = 1 }) => {
    const requestData = {
      pageSize: 6,
      pageIndex: pageParam,
    };
    const response = await getCampaignList(requestData);
    return response;
  };

  // useInfiniteQuery
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['campaigns'],
    queryFn: fetchCampaigns,
    getNextPageParam: (lastPage) => {
      if (lastPage.pageIndex < lastPage.totalPages) {
        return lastPage.pageIndex + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // 캠페인 데이터를 Recoil 상태로 업데이트
  useEffect(() => {
    if (data?.pages) {
      const allCampaigns = data.pages.flatMap((page) => page.list);
      setCampaignList(allCampaigns);
    }
  }, [data, setCampaignList]);

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상이 보이고 있고 다음 페이지가 있을 경우
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  // 찜(좋아요) 상태 변경 함수
  const toggleLike = (campaignId: number) => {
    setLikedCampaigns((prevLikes) => {
      if (prevLikes.includes(campaignId)) {
        // 이미 찜한 경우 제거
        return prevLikes.filter((id) => id !== campaignId);
      } else {
        // 찜하지 않은 경우 추가
        return [...prevLikes, campaignId];
      }
    });
  };


  useEffect(()=>{
    console.log(likedCampaigns)
  },[likedCampaigns])


  return (
    <>
      <FilterBar />
      <CampaignList>
        {filteredCampaigns?.map((campaign) => {
          // 남은 시간 계산
          const endTime = new Date(campaign.endAt).getTime();
          const now = Date.now();
          const diffInMs = endTime - now;
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

          let remainingTime;
          if (diffInDays > 1) {
            remainingTime = `D-${Math.ceil(diffInDays)}일`;
          } else if (diffInDays > 0) {
            const diffInHours = diffInMs / (1000 * 60 * 60);
            remainingTime = `T-${Math.ceil(diffInHours)}시간`;
          } else {
            remainingTime = '종료됨';
          }

          // 해당 캠페인이 찜되어 있는지 확인
          const isLiked = likedCampaigns.includes(campaign.campaignId);

          return (
            <CampaignCard key={campaign.campaignId}>
              <CampaignImage>
                <img
                  src={campaign.thumbnailUrl || 'default-image.jpg'}
                  alt={campaign.title}
                />
                <RemainingDays>{remainingTime}</RemainingDays>
                <LikeButton onClick={() => toggleLike(campaign.campaignId)}>
                  {isLiked ? '❤️' : '🤍'}
                </LikeButton>
              </CampaignImage>
              <Price>{campaign.price.toLocaleString()}P</Price>
              <Title>{campaign.title}</Title>
              <Participants>
                신청 | {campaign.joins}/{campaign.quota}명
              </Participants>
            </CampaignCard>
          );
        })}
      </CampaignList>
      {/* Infinite scroll */}
      <div ref={loadMoreRef}>
        {isFetchingNextPage ? <p>Loading more...</p> : null}
      </div>
    </>
  );
};

export default MainPage;

const CampaignList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const CampaignCard = styled.li`
  width: 48.5%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  padding: 10px;
`;

const CampaignImage = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

const RemainingDays = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: black;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const Title = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
`;

const Participants = styled.p`
  font-size: 12px;
  color: #888;
  margin: 10px 0;
`;
