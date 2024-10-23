import { useEffect } from 'react';

/**
 * 컴포넌트가 마운트될 때 창을 최상단으로 스크롤하는 커스텀 훅
 */
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  }, []);
};

export default useScrollToTop;
