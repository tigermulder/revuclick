import { useEffect, useState } from "react"
import { checkEmail, checkPassword } from "utils/util"
import { login } from "services/login"
import { useRouter } from "hooks/routing"
import styled from "styled-components"
import { useMutation } from "@tanstack/react-query"

const LoginPage = () => {
  const [emailId, setEmailId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)

  const { push } = useRouter()

  //** 이메일, 패스워드 다 입력 시 로그인 버튼 활성화 */
  useEffect(() => {
    if (checkEmail(emailId) && checkPassword(password)) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [emailId, password])

  //** React Query 로그인 처리 */
  const mutation = useMutation({
    mutationFn: login,
  })

  //** 로그인 버튼 클릭 시 처리 */
  const handleLogin = () => {
    const email = checkEmail(emailId)
    const validPassword = checkPassword(password)

    if (!email || !validPassword) {
      alert("이메일과 비밀번호를 확인해 주세요")
      return
    }

    const loginData = {
      email,
      password: validPassword,
    }

    //** React Query함수로 로그인 요청 */
    mutation.mutate(loginData, {
      onSuccess(data) {
        const token = data.token
        localStorage.setItem("authToken", token)
        alert("로그인이 완료되었습니다.")
        push("/main")
      },
      onError(error) {
        console.log("로그인실패", error)
        throw error
      },
    })
  }

  //** mutation 에러가 발생하면 이 상태를 ErrorBoundary로 전달 */
  if (mutation.isError) {
    throw mutation.error
  }

  return (
    <Container>
      <Row>
        <Column size={12}>
          <h6>로그인</h6>
        </Column>
      </Row>

      <Row>
        <Column size={6}>
          <Input
            type="text"
            name="email_id"
            placeholder="아이디 입력"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </Column>
        <Column size={6}>
          <Input type="text" name="email_domain" value="@naver.com" disabled />
        </Column>
      </Row>

      <Row>
        <Column size={12}>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Column>
      </Row>

      <Row>
        <Column size={12}>
          <Button onClick={isButtonEnabled ? handleLogin : undefined}>
            로그인
          </Button>
        </Column>
      </Row>
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Column = styled.div<{ size: number }>`
  flex: ${(props) => props.size};
`

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => !props.disabled && "#0056b3"};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`

const TextButton = styled.div`
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
