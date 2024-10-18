import React, { Component, ReactNode } from "react"
import { ErrorBoundaryProps, ErrorBoundaryState } from "types/type"
import Button from "./Button"
import styled from "styled-components"
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  // 에러 발생 시 상태를 업데이트
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  // 에러 로깅 또는 추가 처리
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary에서 오류가 발생하였습니다:", error, errorInfo)
  }

  // 에러 메시지 렌더링
  renderErrorMessage(): ReactNode {
    if (this.state.error?.message.includes("Network Error")) {
      return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요."
    }
    if (this.state.error?.message.includes("404")) {
      return "요청한 페이지를 찾을 수 없습니다. 잘못된 URL입니다."
    }
    if (
      this.state.error?.message.includes("502") ||
      this.state.error?.message.includes("500")
    ) {
      return (
        <>
          Internet Server Error.
          <br />
          서비스 이용에 불편을 드려 죄송합니다.
          <br />
          시스템에러가 발생하였습니다.
        </>
      )
    }
    return "페이지를 로드하는 중 문제가 발생했습니다. 다시 시도해 주세요."
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>문제가 발생했습니다.</ErrorTitle>
          <ErrorMessage>{this.renderErrorMessage()}</ErrorMessage>
          <Button onClick={() => window.location.reload()} $variant="red">
            다시 시도하기
          </Button>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 0 1.5rem;
  text-align: center;
`

const ErrorTitle = styled.h1`
  font-size: 2.4rem;
  color: var(--revu-color);
  margin-bottom: 1rem;
`

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  color: var(--n500-color);
  margin-bottom: 2rem;
  line-height: 2rem;
`
