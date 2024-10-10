const dotenv = require("dotenv")

// 운영환경일때 .env.production 파일로드
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" })
} else {
  // 개발 환경일때 .env.development 파일로드
  dotenv.config({ path: "./.env.development" })
}

module.exports = {
  apps: [
    {
      name: "live-revu-front",
      script: "npx",
      args: "serve -s dist -l 5000",
      instances: 1,
      exec_mode: "fork",
      merge_logs: true,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: process.env.VITE_SERVER_URL,
        PORT: 5000,
      },
    },
    {
      name: "dev-revu-front",
      script: "npx",
      args: "serve -s dist -l 5000",
      instances: 1,
      exec_mode: "fork",
      merge_logs: true,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: process.env.VITE_SERVER_URL,
        PORT: 5000,
      },
    },
  ],
}
