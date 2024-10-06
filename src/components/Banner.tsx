// ** Single배너 */
export const SingleBanner = () => {
  return <div>SingleBanner입니다.</div>
}
// ** Multi배너 */
export const MultiBanner = () => {
  return <div>MultiBanner입니다.</div>
}

import { useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

// 배너 색상 리스트 (예시로 5개의 배너)
const banners = ["#D32F2F", "#F48FB1", "#C2185B", "#E57373", "#FFCDD2"];

// Styled Components 정의
const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  overflow: hidden;
  margin: 16px 0;
  border-radius: 20px;
`;

interface BannerContainerProps {
  $currentIndex: number;
}

const BannerContainer = styled.div<BannerContainerProps>`
  display: flex;
  height: 100%;
  transition: transform 0.3s ease;
  transform: translateX(-${({ $currentIndex }) => $currentIndex * 100}%);
`;

interface BannerItemProps {
  color: string;
}

const BannerItem = styled.div<BannerItemProps>`
  min-width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 20px;
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
`;

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipedLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handleSwipedRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    touchEventOptions: { passive: false },
    trackMouse: true,
  });

  return (
    <BannerWrapper {...handlers}>
      <BannerContainer $currentIndex={currentIndex}>
        {banners.map((color, index) => (
          <BannerItem key={index} color={color} />
        ))}
      </BannerContainer>
      <Indicator>{`${currentIndex + 1} / ${banners.length}`}</Indicator>
    </BannerWrapper>
  );
};

export default BannerSlider;