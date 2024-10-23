import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ReuseHeader from "@/components/ReuseHeader"
import TextField from "@/components/TextField"
import Button from "@/components/Button"
import useToast from "@/hooks/useToast"
import { RoutePath } from "@/types/route-path"
import { findId } from "@/services/join"
import styled from "styled-components"

const FindPasswordPage = () => {
  const [emailId, setEmailId] = useState("")
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)

  return (
    <Container>
      <ReuseHeader
        title="비밀번호 재설정"
        onBack={() => navigate(RoutePath.Login)}
      />
      <TitleContainer>
        <Title>
          가입 시 입력한
          <br />
          네이버 ID를 입력해 주시면
          <br />
          비밀번호 재설정 안내 메일을 보내드립니다.
        </Title>
      </TitleContainer>

      <TextField
        type="text"
        name="email_id"
        placeholder="네이버ID"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        suffix="@naver.com"
      />
      <Button type="button" disabled={!isButtonEnabled} $variant="red">
        아이디 찾기
      </Button>
    </Container>
  )
}

export default FindPasswordPage

const Container = styled.div`
  padding: 4.4rem 0;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  padding: 2.8rem 0 4.2rem;
`

const Title = styled.h4`
  color: var(--primary-color);
  font-size: var(--font-h3-size);
  font-weight: var(--font-weight-bold);
  line-height: 2.5rem;
`
