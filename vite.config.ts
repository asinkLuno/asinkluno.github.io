import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages 项目站点要走子路径，用环境变量传入；用户站点（*.github.io）留空即可。
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
})
