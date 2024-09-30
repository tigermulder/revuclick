//** 이메일 유효성 검사 함수 */
export const checkEmail = (emailId: string): string | false => {
  return emailId.length > 0 ? `${emailId}@naver.com` : false
}

//** 비밀번호 유효성 검사 함수 */
export const checkPassword = (password: string): string | false => {
  const regex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,16}$/
  return regex.test(password) ? password : false
}
