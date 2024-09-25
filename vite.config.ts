import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    // Client port 설정
    port: 3000,
    proxy: {
      // Cors
      "/api": {
        target: "https://api.example.com", // 프록시할 대상의 서버
        changeOrigin: true, // 프록시 요청을 보낼 때 호스트 헤더를 대상 서버(target)의 도메인으로 변경합니다
        rewrite: (path) => path.replace(/^\/api/, ""), // 경로를 제거하고, 나머지 부분만 실제 API 서버에 전달할 수 있도록 요청 URL을 재작성
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType: any = assetInfo?.name?.split(".").at(1)
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
})
