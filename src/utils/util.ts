export const categories = [
  { id: 1, name: "전체" }, // '전체'는 특별하게 처리
  { id: 2, name: "패션" },
  { id: 3, name: "뷰티" },
  { id: 4, name: "가구" },
  { id: 5, name: "출산/육아" },
  { id: 6, name: "식품" },
  { id: 7, name: "생활용품" },
  { id: 8, name: "반려동물" },
  { id: 9, name: "디지털" },
  { id: 10, name: "스포츠" },
  { id: 11, name: "여행" },
  { id: 12, name: "문화" },
  { id: 13, name: "기타" },
]

//** 이메일 유효성 검사 함수 */
export const checkEmail = (emailId: string): string | false => {
  const email = `${emailId}@naver.com`
  const regex = /^[a-zA-Z0-9._%+-]+@naver\.com$/
  if (regex.test(email)) {
    return email
  }
  return false
}

//** 비밀번호 유효성 검사 함수 */
export const checkPassword = (password: string): string | false => {
  const regex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,16}$/
  if (regex.test(password)) {
    return password
  }
  return false
}
