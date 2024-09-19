import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist'], // dist 폴더 무시
    files: ['**/*.{ts,tsx}'], // TS와 TSX 파일에 적용
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 최신 버전 설정
      globals: globals.browser, // 브라우저 전역 객체 설정
      parser: '@typescript-eslint/parser', // TypeScript 파서 설정
      sourceType: 'module', // ES 모듈 사용
    },
    plugins: {
      'react-hooks': reactHooks, // React Hooks 플러그인
      'react-refresh': reactRefresh, // React Refresh 플러그인
      '@typescript-eslint': typescriptEslint, // TypeScript ESLint 플러그인
      prettier, // Prettier 플러그인
    },
    extends: [
      'eslint:recommended', // ESLint 기본 추천 규칙
      'plugin:react-hooks/recommended', // React Hooks 추천 규칙
      'plugin:@typescript-eslint/recommended', // TypeScript 추천 규칙
      "plugin:prettier/recommended",
      'prettier', // Prettier와 충돌하는 규칙 비활성화
    ],
    rules: {
      // React Hooks 관련 규칙
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // 주석 빈칸 정의
      "lines-around-comment": [
        "error",
        {
          "beforeLineComment": true,
          "beforeBlockComment": true,
          "allowBlockStart": true,
          "allowClassStart": true,
          "allowObjectStart": true,
          "allowArrayStart": true
        }
      ],
      // import 구문 뒤에 1줄의 빈 줄을 추가
      "import/newline-after-import": [
        "error",
        {
          "count": 1
        }
      ],
      // return문 앞에 빈 줄 추가
      "newline-before-return": "error",
      // React Refresh 관련 규칙
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 연속된빈줄을 최대 1줄로 제한
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1, maxBOF: 0 }],
      // Prettier 규칙을 ESLint에서 오류로 표시
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier, // Prettier 설정과 충돌하는 규칙 비활성화
];
