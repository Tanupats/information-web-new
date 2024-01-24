// import { defineConfig } from 'vite'

// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   preview: {host: true , port:3002} 
// })

export default {
  base: './', // ให้ base เป็น './'
  build: {
    outDir: 'dist', // ระบุไดเรกทอรี output ของไฟล์สำหรับ static HTML
    assetsInlineLimit: 0, // ให้ทุก assets ถูก include ลงใน HTML
    rollupOptions: {
      output: {
        external: ['react', 'react-dom'],// ปิดการใช้งาน manualChunks
      },
    },
  },
};