import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CameraTest = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 카메라 접근 로직
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('카메라 접근 실패: ', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // 앨범에서 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // 선택한 이미지를 상태에 저장
    }
  };

  return (
    <CameraContainer>
      <h2>카메라 및 앨범 테스트</h2>

      {/* 카메라 테스트 비디오 */}
      <VideoContainer>
        <video ref={videoRef} autoPlay playsInline />
      </VideoContainer>

      {/* 앨범에서 이미지 선택 */}
      <FileInputContainer>
        <label htmlFor="fileInput">앨범에서 이미지 선택:</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
        />
      </FileInputContainer>

      {/* 선택한 이미지 미리보기 */}
      {selectedImage && (
        <ImagePreview>
          <h3>선택한 이미지 미리보기</h3>
          <img src={selectedImage} alt="Selected" />
        </ImagePreview>
      )}
    </CameraContainer>
  );
};

export default CameraTest;

// Styled Components
const CameraContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const VideoContainer = styled.div`
  margin: 20px 0;
  video {
    width: 100%;
    max-width: 400px;
    border: 2px solid #ddd;
    border-radius: 8px;
  }
`;

const FileInputContainer = styled.div`
  margin: 20px 0;
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
  input {
    padding: 8px;
  }
`;

const ImagePreview = styled.div`
  margin-top: 20px;
  h3 {
    margin-bottom: 10px;
  }
  img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    border: 2px solid #ddd;
  }
`;
