import react from "eslint-plugin-react" // React 관련 ESLint 플러그인
import tsPlugin from "@typescript-eslint/eslint-plugin" // TypeScript 관련 ESLint 플러그인
import tsParser from "@typescript-eslint/parser" // TypeScript 코드 파싱을 위한 파서
import prettier from "eslint-plugin-prettier" // Prettier 관련 ESLint 플러그인

export default {
  // 특정 파일 패턴에 대해 다른 설정을 적용할 수 있는 'overrides' 옵션을 사용합니다.
  overrides: [
    {
      // src 폴더 내의 ts, tsx, js, jsx 확장자를 가진 파일을 대상으로 ESLint를 적용
      files: ["src/**/*.{ts,tsx,js,jsx}"],

      // 특정 파일을 ESLint 검사에서 제외 (Vite 설정 파일 및 테스트 파일 제외)
      excludedFiles: ["vite.config.ts", "**/*.test.{ts,tsx,js,jsx}"],

      // ESLint가 코드를 파싱할 때 사용할 언어 옵션 설정
      languageOptions: {
        parser: tsParser, // TypeScript 코드를 파싱하기 위해 @typescript-eslint/parser 사용
        ecmaVersion: 2020, // ECMAScript 최신 문법을 사용 가능하도록 ECMAScript 2020 설정
        sourceType: "module", // 모듈 시스템 사용(import/export 지원)
      },

      // ESLint에서 사용할 플러그인 목록 설정
      plugins: {
        react, // React 관련 규칙을 적용하는 eslint-plugin-react 플러그인 활성화
        "@typescript-eslint": tsPlugin, // TypeScript 관련 규칙을 적용하는 플러그인 활성화
        prettier, // Prettier 관련 규칙을 ESLint로 처리하는 플러그인 활성화
      },

      // ESLint 규칙 설정
      rules: {
        // Prettier와 ESLint를 함께 사용하여 코드 스타일을 관리
        "prettier/prettier": [
          "warn", // Prettier 관련 경고를 ESLint 경고로 표시
          {
            // Prettier의 세부 규칙 설정
            arrowParens: "always", // 화살표 함수의 인자가 하나일 때도 괄호를 사용
            semi: false, // 세미콜론을 추가하지 않음
            trailingComma: "none", // 마지막 요소 뒤에 쉼표를 추가하지 않음
            tabWidth: 2, // 들여쓰기 크기를 2칸으로 설정
            endOfLine: "auto", // 운영체제에 맞게 줄바꿈 처리 자동 결정
            useTabs: false, // 탭 대신 스페이스 사용
            singleQuote: false, // 큰 따옴표 사용
            printWidth: 100, // 코드가 80자를 넘으면 줄바꿈 적용
            jsxSingleQuote: false, // JSX 속성에서 큰 따옴표 사용
            bracketSameLine: false, // JSX 닫는 괄호를 다음 줄로 내림
          },
        ],
        // React 17 이상에서는 JSX 파일에서 React를 import할 필요가 없으므로 이 규칙을 비활성화
        "react/react-in-jsx-scope": "off",

        // 사용하지 않는 변수를 경고, 함수 인자가 '_'로 시작하면 경고하지 않음
        "@typescript-eslint/no-unused-vars": [
          "warn", // 사용되지 않는 변수에 대해 경고 표시
          { argsIgnorePattern: "^_" }, // '_'로 시작하는 함수 인자는 검사하지 않음
        ],
      },

      // React 버전을 자동으로 감지하여 적용
      settings: {
        react: {
          version: "detect", // 설치된 React 버전을 자동으로 감지
        },
      },
    },
  ],
}
