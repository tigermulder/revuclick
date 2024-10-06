import React, { Component } from "react"
import { Props, State } from "types/type"

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // 에러 발생 시 호출되는 메서드
  static getDerivedStateFromError() {
    // 하위 자손 컴포넌트에서 오류발생시 render단계에서 호출
    return { hasError: true }
  }

  // 에러 발생 시 출력할 내용을 정의
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary에서 오류가 발생하였습니다.:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>문제가 발생했습니다.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
