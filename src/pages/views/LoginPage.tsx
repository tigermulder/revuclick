// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react"
import { checkEmail, checkPassword } from "utils/util"
import { login } from "services/login"
import { Link, useNavigate } from "react-router-dom"
import { RoutePath } from "@/types/route-path"
import { useMutation } from "@tanstack/react-query"
import { useSetRecoilState } from "recoil"
import { toastListState } from "@/store/toast-recoil"
import RevuClickLogo from "assets/revu_icon.svg?react"
import RevuClickText from "assets/revu_logo.svg?react"
import styled from "styled-components"

// TextField Component
const TextField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  suffix,
  $isError,
}: {
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  suffix?: string
  $isError?: boolean
}) => (
  <TextFieldContainer>
    <InputWrapper $isError={$isError}>
      <StyledInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {suffix && <Suffix>{suffix}</Suffix>}
    </InputWrapper>
    {$isError && (
      <Description>
        아이디 또는 비밀번호가 잘못되었습니다. 아이디와 비밀번호를 정확히
        입력해주세요
      </Description>
    )}
  </TextFieldContainer>
)

// Button Component
const Button = ({
  children,
  disabled,
  $variant, // 'red' or 'outlined'
  type = "button", // default to "button" to prevent unintended form submission
}: {
  children: React.ReactNode
  disabled?: boolean
  $variant: "red" | "outlined"
  type?: "button" | "submit" | "reset"
}) => (
  <StyledButton disabled={disabled} $variant={$variant} type={type}>
    {children}
  </StyledButton>
)

// LoginPage Component
const LoginPage = () => {
  const navigate = useNavigate() // React Router's navigation hook
  const [emailId, setEmailId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [loginMessage, setLoginMessage] = useState<string>("")

  const setToasts = useSetRecoilState(toastListState) // Recoil 상태 업데이트 함수

  // 토스트 메시지를 추가하는 함수
  const addToast = (
    message: string,
    type: "info" | "warning" | "check" | "uncheck",
    duration = 3000
  ) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now().toString(), message, type, duration },
    ])
  }

  // Enable login button when both email and password are valid
  useEffect(() => {
    const emailValidationResult = checkEmail(emailId)
    const passwordValidationResult = checkPassword(password)
    const isEmailValid = emailValidationResult !== false
    const isPasswordValid = passwordValidationResult !== false
    setIsButtonEnabled(isEmailValid && isPasswordValid)
    setEmailError(emailId !== "" && !isEmailValid)
    setPasswordError(password !== "" && !isPasswordValid)
  }, [emailId, password])

  // React Query mutation for login
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const token = data.token
      if (token) {
        localStorage.setItem("authToken", token)
        addToast("로그인이 완료되었습니다.", "check") // 성공 시 토스트 메시지
        navigate(RoutePath.Home) // Navigate to Home using useNavigate
      } else {
        console.error("Token not found in response:", data)
        addToast("로그인에 실패했습니다. 다시 시도해주세요.", "warning")
      }
    },
    onError: (error: any) => {
      console.error("로그인 실패:", error)
      if (error?.response?.data?.statusCode === -1) {
        switch (error.response.data.errorCode) {
          case 1:
          case 2:
            addToast("아이디 또는 비밀번호가 잘못되었습니다.", "warning")
            break
          case 3:
          case 4:
            addToast("인증 정보가 올바르지 않습니다.", "warning")
            break
          case 5:
            addToast("탈퇴한 회원입니다.", "warning")
            break
          default:
            addToast("오류가 발생했습니다.", "warning")
        }
      } else {
        addToast("오류가 발생했습니다.", "warning")
      }
    },
  })

  // Handle form submission
  const handleLogin = () => {
    const email = checkEmail(emailId)
    const validPassword = checkPassword(password)
    console.log("Email:", email, "Password:", validPassword)
    if (!email || !validPassword) {
      alert("이메일과 비밀번호를 확인해 주세요")
      return
    }
    const loginData = {
      email,
      password: validPassword,
    }
    console.log("Attempting to login with:", loginData)
    mutation.mutate(loginData)
  }

  // Throw error to ErrorBoundary if mutation fails
  if (mutation.isError) {
    console.error("Throwing mutation error to ErrorBoundary:", mutation.error)
    throw mutation.error
  }

  return (
    <Container>
      <Title>
        <LogoImage>
          <RevuClickLogo aria-label="RevuClick Logo" />
        </LogoImage>
        <LogoText>
          <RevuClickText aria-label="RevuClick Text" />
        </LogoText>
        <MainText>
          리뷰로
          <br />
          <span>
            결제 금액을
            <br />
            돌려 받는
            <br />
          </span>
          특별한 혜택!
        </MainText>
      </Title>
      <FormWrap>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <TextField
            type="text"
            name="email_id"
            placeholder="네이버ID"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            suffix="@naver.com"
            $isError={emailError}
          />
          <TextField
            type="password"
            name="password"
            placeholder="영문 대/소문자, 숫자, 특수문자 조합하여 8~16자"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            $isError={passwordError}
          />
          {loginMessage && <LoginMessage>{loginMessage}</LoginMessage>}
          <Button
            type="submit" // Changed to "submit" to trigger form's onSubmit
            disabled={!isButtonEnabled}
            $variant="red"
          >
            로그인
          </Button>
          <LinkContainer>
            <StyledLink to={RoutePath.FindId}>아이디 찾기</StyledLink>
            <Divider />
            <StyledLink to={RoutePath.FindPassword}>비밀번호 찾기</StyledLink>
          </LinkContainer>
          <Button
            type="button" // Ensures this button doesn't submit the form
            $variant="outlined"
          >
            회원가입
          </Button>
        </Form>
      </FormWrap>
    </Container>
  )
}

export default LoginPage

// Styled Components
const Container = styled.div`
  padding: 6.8rem 1.6rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LogoImage = styled.div`
  width: 3.5rem;
`

const LogoText = styled.div`
  width: 8.4rem;
  margin-top: 0.9rem;
`

const MainText = styled.h2`
  margin-top: 3.2rem;
  font-size: var(--font-h1-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--font-h1-line-height);
  letter-spacing: var(--font-h1-letter-spacing);
  span {
    font-weight: var(--font-weight-extrabold);
  }
`

const FormWrap = styled.div`
  margin-top: 6rem;
  width: 100%;
  max-width: 400px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const TextFieldContainer = styled.div`
  margin-bottom: 0.8rem;
`

const InputWrapper = styled.div<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ $isError }) => ($isError ? "red" : "#ddd")};
  border-radius: 5px;
  padding: 0.5rem;
  transition: border-color 0.3s ease;
`

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none; /* Remove default border since InputWrapper handles it */
  border-radius: 5px;
  font-size: 14px;
  outline: none; /* Remove outline on focus if desired */
`

const Suffix = styled.span`
  margin-left: 0.5rem;
  color: #555;
`

const Description = styled.p`
  text-align: left;
  color: red;
  font-size: 12px;
  margin-top: 0.5rem;
`

const LoginMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 1rem 0;
`

const StyledButton = styled.button<{ $variant: "red" | "outlined" }>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) =>
    props.$variant === "red"
      ? props.disabled
        ? "#ccc"
        : "#ff0000"
      : "transparent"};
  color: ${(props) =>
    props.$variant === "red" ? "white" : "var(--primary-color)"};
  border: ${(props) =>
    props.$variant === "outlined" ? "1px solid var(--n80-color)" : "none"};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-bottom: ${(props) => (props.$variant === "red" ? "1.2rem" : "6rem")};

  /* Optional: Add hover effects */
  &:hover {
    background-color: ${(props) =>
      !props.disabled && props.$variant === "red" ? "#cc0000" : ""};
    border-color: ${(props) =>
      !props.disabled && props.$variant === "outlined" ? "#0056b3" : ""};
  }
`

const LinkContainer = styled.div`
  margin: 2rem 0 4.7rem 0;
  font-size: 1.2rem;
  font-weight: var(--font-weight-medium);
  color: var(--n300-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`

const StyledLink = styled(Link)`
  cursor: pointer;
  color: var(--n300-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Divider = styled.span`
  width: 1px;
  height: 1rem;
  background: var(--n300-color);
`
