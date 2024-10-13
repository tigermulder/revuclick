import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isShareModalOpenState } from "@/store/modal-recoil";
import useToast from "@/hooks/useToast";
import styled, { keyframes } from "styled-components";

declare global {
  interface Window {
    Kakao: any;
  }
}

const ShareModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isShareModalOpenState);
  const { addToast } = useToast();

  // Kakao SDK 초기화 (카카오 공유를 위해)
  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init("YOUR_KAKAO_API_KEY"); // 여기에 본인의 카카오 API 키를 입력하세요.
  //   }
  // }, []);

  // 모달 닫기 핸들러
  const handleClose = () => setIsModalOpen(false);

  // 링크 복사 핸들러
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      addToast("링크가 복사되었습니다.", "info", 1000, "link");
    } catch (error) {
      console.error("링크 복사 실패:", error);
      addToast("링크 복사 실패.", "warning", 1000, "link");
    }
  };

  // 카카오톡 공유 핸들러
  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: document.title,
          description: "캠페인을 확인해보세요!",
          imageUrl: window.location.origin + "/thumbnail.png", // 썸네일 이미지 URL
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유를 사용할 수 없습니다.");
    }
  };

  return (
    <>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClose}>×</CloseButton>
            <Title>공유하기</Title>
            <IconsWrapper>
              <IconItem onClick={handleCopyLink}>
                <Placeholder /> {/* 이미지 대신 공간을 확보 */}
                <IconText>링크 복사</IconText>
              </IconItem>
              <IconItem onClick={handleKakaoShare}>
                <Placeholder />
                <IconText>카카오톡</IconText>
              </IconItem>
              <IconItem>
                <Placeholder />
                <IconText>더보기</IconText>
              </IconItem>
            </IconsWrapper>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default ShareModal;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 100%;
  max-width: 400px;
  border-radius: 16px 16px 0 0;
  animation: ${slideUp} 0.15s ease-out;
  padding: 20px 15px 30px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 60px;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Placeholder = styled.div`
  width: 48px;
  height: 48px;
  background-color: #e0e0e0; /* 회색 배경으로 공간 표시 */
  border-radius: 50%; /* 동그랗게 만들기 */
`;

const IconText = styled.p`
  font-size: 1.2rem;
  color: #333;
`;