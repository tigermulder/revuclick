import { ModalProps } from "@/types/component-types/modal-type"
import styled from "styled-components"
import Button from "@/components/Button" // 재사용할 수 있는 Button 컴포넌트
import { useEffect } from "react"

// 모달 컴포넌트
const Modal = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  content,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열리면 body 스크롤을 막음
      document.body.style.overflow = "hidden"
    } else {
      // 모달이 닫히면 body 스크롤을 다시 활성화
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Overlay>
      <ModalContainer>
        <TextContainer>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{content}</ModalBody>
        </TextContainer>

        {/* 액션 버튼들 */}
        <ModalFooter>
          <Button onClick={onCancel} $variant="grey">
            {cancelText || "취소"}
          </Button>
          <Button onClick={onConfirm} $variant="red">
            {confirmText || "확인"}
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  )
}

export default Modal

// 스타일 컴포넌트 정의
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 1.2rem;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const TextContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`

const ModalHeader = styled.h2`
  align-self: stretch;
  color: var(--n600-color);
  font-size: var(--font-h3-size);
  letter-spacing: var(--font-h3-letter-spacing);
  line-height: 2.5rem;
  font-weight: var(--font-weight-bold);
`

const ModalBody = styled.div`
  margin-bottom: 2rem;
  font-size: var(--font-bodyL-size);
  font-weight: var(--font-bodyL-weight);
  line-height: var(--font-bodyL-line-height);
  letter-spacing: var(--font-bodyL-letter-spacing);
  color: var(--n400-color);

  em,
  span {
    font-weight: var(--font-weight-bold);
  }
  ol {
    padding-left: 1.6rem;
    list-style: decimal;
    li:not(:last-child) {
      margin-bottom: 0.2rem;
    }
    span {
      color: var(--revu-color);
    }
  }
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
