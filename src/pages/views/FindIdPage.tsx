import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ReuseHeader from "@/components/ReuseHeader"
import TextField from "@/components/TextField"
import Button from "@/components/Button"
import useToast from "@/hooks/useToast"
import { checkName, validatePassword } from "@/utils/util"
import { RoutePath } from "@/types/route-path"
import { findId } from "@/services/join"
import styled from "styled-components"

const FindIdPage = () => {
  const [nickname, setName] = useState("")
  const [phone, setPhone] = useState("")
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)

  // 버튼 활성화 여부를 동적으로 설정
  useEffect(() => {
    setIsButtonEnabled(checkName(nickname) && validatePassword(phone))
  }, [nickname, phone])

  return (
    <Container>
      <ReuseHeader
        title="아이디 찾기"
        onBack={() => navigate(RoutePath.Login)}
      />
      <TitleContainer>
        <Title>
          가입할 때 사용한
          <br />
          계정 정보를 입력해주세요.
        </Title>
      </TitleContainer>

      <TextField
        type="text"
        name="name"
        placeholder="이름"
        value={nickname}
        onChange={(e) => setName(e.target.value)}
        $isError={nickname !== "" && !checkName(nickname)}
        errorMessage={
          nickname !== "" && !checkName(nickname)
            ? "올바른 형식의 이름을 입력하세요."
            : undefined
        }
      />
      <TextField
        type="text"
        name="phone"
        placeholder="휴대폰번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        $isError={phone !== "" && !validatePassword(phone)}
        errorMessage={
          phone !== "" && !validatePassword(phone)
            ? "‘-’ 없이 8자리 11자리 숫자로 입력해주세요."
            : undefined
        }
      />
      <Button type="button" disabled={!isButtonEnabled} $variant="red">
        아이디 찾기
      </Button>
    </Container>
  )
}

export default FindIdPage

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
