import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { campaignListState, campaignLikeState } from '@/store/mainpage-recoil';

const CampaignCart = () => {
  const [likedCampaigns, setLikedCampaigns] = useRecoilState(campaignLikeState);
  const campaignIds = Object.keys(likedCampaigns);

  // 찜 해제 핸들러
  const handleUnlike = (id: any) => {
    const updatedLikes = { ...likedCampaigns };
    delete updatedLikes[id];
    setLikedCampaigns(updatedLikes);
  };

  return (
    <Container>
      {/* 공통 헤더 */}
      <Header>
        <HeaderLink href="#">
          <img src="/assets/img/ico_back.svg" alt="뒤로가기" />
        </HeaderLink>
        <HeaderTitle>찜한 목록</HeaderTitle>
      </Header>
      {/* /// 공통 헤더 /// */}

      {/* 필터 래퍼 */}
      <FilterWrap>
        <FilterButton>
          <span>신청자 많은순</span>
        </FilterButton>
        <FilterList>
          <FilterItem className="is-pressed">
            <button>신청자 많은순</button>
          </FilterItem>
          <FilterItem className="is-active">
            <button>캠페인 관련 문의</button>
          </FilterItem>
          <FilterItem className="is-selected">
            <button>회원 정보 수정 문의</button>
          </FilterItem>
          <FilterItem>
            <button>회원 탈퇴 문의</button>
          </FilterItem>
          <FilterItem>
            <button>기타 문의</button>
          </FilterItem>
        </FilterList>
      </FilterWrap>
      {/* /// 필터 래퍼 /// */}

      {/* 캠페인 리스트 */}
      <CampaignList>
        {campaignIds.length > 0 ? (
          campaignIds.map((id) => {
            const campaign = campaignsData[id];
            if (!campaign) return null; // 캠페인 데이터가 없는 경우 건너뜀

            return (
              <CampaignItem
                key={campaign.id}
                className={campaign.active ? 'active' : 'ended'}
              >
                <CampaignThumb>
                  <CampaignImage src={campaign.imageUrl} alt={campaign.title} />
                  <ThumbText>
                    <span>{campaign.daysLeft}</span>일
                  </ThumbText>
                </CampaignThumb>
                <CampaignInfo>
                  <CampaignPoints>{campaign.points}P</CampaignPoints>
                  <CampaignTitle>{campaign.title}</CampaignTitle>
                  <CampaignDescription>
                    <span>신청 | </span>
                    <span>{campaign.currentCount} </span>/
                    <span> {campaign.totalCount}</span>명
                  </CampaignDescription>
                </CampaignInfo>
                <FavoriteIcon onClick={() => handleUnlike(campaign.id)} />
              </CampaignItem>
            );
          })
        ) : (
          <NoCampaigns>찜한 캠페인이 없습니다.</NoCampaigns>
        )}
      </CampaignList>
      {/* /// 캠페인 리스트 /// */}
    </Container>
  );
};

export default CampaignCart;

/* styled-components */

const Container = styled.div`
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  background: var(--white, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeaderLink = styled.a`
  position: absolute;
  width: 1.9rem;
  left: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const HeaderTitle = styled.h1`
  font-size: var(--font-h3-size, 1.5rem);
  font-weight: var(--font-h3-weight, bold);
  line-height: var(--font-h3-line-height, 1.2);
  letter-spacing: var(--font-h3-letter-spacing, 0.05em);
`;

const FilterWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #f5f6f8;
  padding: 9px;
`;

const FilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;

  &:focus {
    outline: none;
  }
`;

const FilterList = styled.ul`
  list-style: none;
  display: flex;
  margin-left: 10px;
`;

const FilterItem = styled.li`
  margin-left: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  &.is-pressed button {
    font-weight: bold;
  }

  &.is-active button {
    font-weight: bold;
  }

  &.is-selected button {
    font-weight: bold;
  }
`;

const CampaignList = styled.ul`
  padding-bottom: 8rem;
  list-style: none;
  padding: 0 1rem;
`;

const CampaignItem = styled.li`
  display: flex;
  margin: 14px auto;
  background-color: #fff;
  border-radius: 10px;
  height: 80px;
  position: relative;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &.active {
    /* 활성화된 캠페인 스타일 */
  }

  &.ended {
    /* 종료된 캠페인 스타일 */
    opacity: 0.6;
  }
`;

const CampaignThumb = styled.div`
  position: relative;
  width: 80px;
  flex-shrink: 0;
`;

const CampaignImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ThumbText = styled.span`
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.3rem 0.8rem;
  border-radius: 30px;
  font-size: var(--font-callout-small-size, 0.8rem);
  font-weight: var(--font-callout-small-weight, bold);
  color: var(--revu-color, #570BE5);
`;

const CampaignInfo = styled.div`
  padding: 0 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CampaignPoints = styled.p`
  font-size: 1.4rem;
  color: var(--primary-color, #570BE5);
  margin: 0;
`;

const CampaignTitle = styled.span`
  display: block;
  font-size: var(--font-h3-size, 1.2rem);
  font-weight: var(--font-h3-weight, bold);
  margin-top: 0.5rem;
  color: #333;
  line-height: 1.2;
`;

const CampaignDescription = styled.div`
  font-size: 1.2rem;
  color: #7c8b96;
  margin-top: 0.5rem;
`;

const FavoriteIcon = styled.span`
  background: url('/assets/img/ico--heart-filled.png') no-repeat center / contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: auto 1rem;

  &:hover {
    background: url('/assets/img/ico--heart-outline.png') no-repeat center / contain;
  }
`;

const NoCampaigns = styled.li`
  text-align: center;
  padding: 20px;
  color: #7c8b96;
  font-size: 1.4rem;
`;
