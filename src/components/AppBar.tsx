import styled from "styled-components"
import { Link } from "react-router-dom"
import { useUserStatus } from "hooks/useUserStatus"
import RevuClickLogo from "assets/revu_logo.svg?react"
import IcoSearch from "assets/ico-search.svg?react"
import IcoAppBarHeart from "assets/ico-appbar-heart.svg?react"

const AppBar = () => {
  const { isLoggedIn } = useUserStatus()

  return (
    <Header className="app-bar">
      {/* 로고 */}
      <Logo>
        <Link to="/main">
          <RevuClickLogo aria-label="RevuClick Logo" />
        </Link>
      </Logo>

      {/* 검색 바 */}
      <SearchForm $isLoggedIn={isLoggedIn}>
        <SearchInputWrapper>
          <SearchInput type="text" />
          <SearchIcon className="ico-search">
            <IcoSearch aria-label="Search Bar" />
          </SearchIcon>
        </SearchInputWrapper>
      </SearchForm>

      {/* 로그인 여부에 따른 찜하기 아이콘 또는 회원가입 링크 */}
      {isLoggedIn ? (
        <HeartIcon aria-label="캠페인 찜 장바구니">
          <IcoAppBarHeart />
        </HeartIcon>
      ) : (
        <SignUpLink>
          <Link to="/login">로그인</Link>
        </SignUpLink>
      )}
    </Header>
  )
}

export default AppBar

// 스타일 정의

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 6rem;
  padding: 1.2rem 1.6rem;
  background: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08); /* 그림자 적용 */
`

const Logo = styled.div`
  min-width: 100px;
  width: 10rem;
  color: var(--revu-color);

  a {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
  }
`

const SearchForm = styled.form<{ $isLoggedIn: boolean }>`
  flex-basis: 50%;
  height: 100%;
  margin-left: ${({ $isLoggedIn }) =>
    $isLoggedIn ? "2.6rem" : "2rem"}; /* 조건에 따라 margin-left 조정 */
  overflow: hidden;
`

const SearchInputWrapper = styled.div`
  position: relative;
  height: 100%;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 1.8rem;
  background: var(--n20-color);
  border-radius: 2.1rem;
  transition: 0.1s;
  border: 0.1rem solid var(--n20-color);

  &:focus {
    outline: none;
    border: 0.1rem solid var(--n600-color);

    ~ .ico-search {
      color: #29363d; /* 포커스 시 아이콘 색상 변경 */
    }
  }
`

// 검색 아이콘 스타일링
const SearchIcon = styled.div`
  position: absolute;
  width: 2.1rem;
  top: 50%;
  right: 1.1rem;
  transform: translateY(-50%);
  color: var(--n200-color); /* 기본 색상 */
  transition: color 0.1s ease;

  svg {
    width: 100%;
    height: auto;
  }
`

// 찜하기 아이콘 스타일링
const HeartIcon = styled.div`
  width: 2.2rem;
  margin-left: 1.6rem;
  color: #d8ddde;

  svg {
    fill: currentColor; /* SVG의 색상은 부모의 color 속성을 따름 */
    width: 100%;
    height: auto;
  }
`

const SignUpLink = styled.div`
  margin-left: 1.6rem;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
  font-weight: var(--font-weight-medium);
  color: var(--silver);
  flex-shrink: 0;
  border-bottom: 1px solid var(--silver);

  a {
    text-decoration: none;
    color: inherit;
  }
`
