import styled from "styled-components"
import { Link } from "react-router-dom"

const AppBar = () => {
  return (
    <Header>
      {/* 로고 */}
      <Logo>
        <Link to="/main">RevuClick</Link>
      </Logo>

      {/* 검색 바 */}
      <SearchBar>
        <input type="text" placeholder="검색어를 입력하세요" />
      </SearchBar>

      {/* 로그인, 회원가입 링크 */}
      <SignUpLink>
        <Link to="/login">로그인</Link>
      </SignUpLink>
    </Header>
  )
}

export default AppBar

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  z-index: 1000;
`

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;

  a {
    text-decoration: none;
    color: inherit;
  }
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30px;
  padding: 5px 15px;
  width: 50%;

  input {
    border: none;
    background: none;
    outline: none;
    flex: 1;
    font-size: 16px;
  }
`

const SignUpLink = styled.div`
  font-size: 16px;
  color: gray;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: var(--font-weight-light);

    &:hover {
      color: black;
    }
  }
`
