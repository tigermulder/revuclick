import styled from "styled-components";

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
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
  $isError?: boolean;
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
      {suffix && (
        <SuffixContainer>
          <Suffix>{suffix}</Suffix>
        </SuffixContainer>
      )}
    </InputWrapper>
    {$isError && (
      <Description>
        {/* 필드 타입에 따라 다른 텍스트를 출력 */}
        { name === "email_id" ? (
        // 아이디 입력 필드인 경우
          <>아이디가 잘못되었습니다. 아이디를 정확히 입력해주세요.</>
        ) : (
          // 비밀번호 입력 필드인 경우
          <>비밀번호가 잘못되었습니다. 비밀번호를 정확히 입력해주세요.</>
        )}
      </Description>
    )}
  </TextFieldContainer>
);

export default TextField;

const TextFieldContainer = styled.div`
  margin-bottom: 0.8rem;
`;

const InputWrapper = styled.div<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ $isError }) => ($isError ? "red" : "#ddd")};
  border-radius: 5px;
  padding: 0.5rem;
  transition: border-color 0.3s ease;
`;

const StyledInput = styled.input`
  flex: 1;
  width: 70%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
`;

const SuffixContainer = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  display: inline-flex;
`;

const Suffix = styled.div`
  color: #415058;
  font-size: 1.4rem;
  font-weight: 500;
  word-wrap: break-word;
`;

const Description = styled.p`
  text-align: left;
  color: red;
  font-size: 12px;
  margin-top: 0.5rem;
`;
