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
        NODE_ENV: "production",
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
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
  ],
}
