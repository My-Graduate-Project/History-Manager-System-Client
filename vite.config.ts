import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 开发环境
  if (command === "serve") {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            // 支持内联 JavaScript
            javascriptEnabled: true,
          }
        },
        modules: {
          // 样式小驼峰转化, 
          //css: goods-list => tsx: goodsList
          localsConvention: 'camelCase'
        }
      },
      // server 服务器配置
      server: {
        // proxy
        host: "localhost",
        port: 3000,
        cors: true,
        proxy: {
          '/api': {
            target: "http://localhost:8080",
            changeOrigin: true, // 允许跨域
            rewrite: path => path.replace(/^\/api/, ''),
            ws: false,
          }
        }
      }
    }
  }
  else {
    // 生产环境
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        }
      },
      css: {
        preprocessorOptions: {
          scss: {
            // 支持内联 JavaScript
            javascriptEnabled: true,
          }
        },
        modules: {
          // 样式小驼峰转化, 
          //css: goods-list => tsx: goodsList
          localsConvention: 'camelCase'
        }
      },
      // server 服务器配置
      server: {
        // proxy
        open: true,
        proxy: {
          '/api': {
            target: "",
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            ws: false,
          }
        }
      }
    }
  }
})
