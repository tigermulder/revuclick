import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수를 로드
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    base: "/", // 기본 경로 설정
    plugins: [react(), tsconfigPaths(), svgr()], // Vite 플러그인
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 'src' 폴더를 '@'로 매핑
        pages: path.resolve(__dirname, "./src/pages"), // 'pages' 폴더에 별칭 매핑
        components: path.resolve(__dirname, "./src/components"), // 'components' 매핑
        assets: path.resolve(__dirname, "./src/assets"), // 'assets' 매핑
        store: path.resolve(__dirname, "./src/store"), // store 경로 별칭
        utils: path.resolve(__dirname, "./src/utils"), // utils 경로 별칭
        types: path.resolve(__dirname, "./src/types"), // types 경로 별칭
        services: path.resolve(__dirname, "./src/services"), // services 경로 별칭
        hooks: path.resolve(__dirname, "./src/hooks"), // hooks 경로 별칭
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true, // 서버의 Origin을 프록시 서버의 Origin으로 변경
          secure: false, // HTTPS를 사용할 때 인증서 검증을 무시 (개발 환경)
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true, // 빌드 시 dist 폴더를 비움
      sourcemap: false,
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
      assetsInlineLimit: 4096, // 기본값(4KB)
    },
  }
})
