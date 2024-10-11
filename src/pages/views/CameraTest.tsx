import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const CameraTest = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // 앨범에서 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl) // 선택한 이미지를 상태에 저장
    }
  }

  return (
    <CameraContainer>
      <h2>앨범 테스트</h2>

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
  )
}

export default CameraTest

// Styled Components
const CameraContainer = styled.div`
  padding: 20px;
  text-align: center;
`

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
`

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
`
