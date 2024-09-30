import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수를 로드
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    base: "./", // 기본 경로 설정
    plugins: [react(), tsconfigPaths(), svgr()], // Vite 플러그인
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true, // 서버의 Origin을 프록시 서버의 Origin으로 변경
          secure: false, // HTTPS를 사용할 때 인증서 검증을 무시 (개발 환경에서 유용)
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType: string = assetInfo?.name?.split(".").at(1) || "misc"
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img"
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
    },
  }
})
