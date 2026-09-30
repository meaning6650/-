import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 배포 경로: '/<저장소이름>/'. 저장소 이름 변경 시 VITE_BASE 로 지정
export default defineConfig({
  base: process.env.VITE_BASE ?? '/-/',
  plugins: [react()],
});
