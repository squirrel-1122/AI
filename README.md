# 🐾 寵物緊急協助 AI

一個使用 Google Gemini AI 的寵物緊急協助平台,提供 24 小時智能診斷、專業建議和獸醫院定位服務。

## ✨ 功能特色

- 🤖 **AI 智能診斷** - 使用 Gemini AI 分析寵物症狀
- 📍 **GPS 定位** - 自動獲取位置並推薦最近的獸醫院
- 🏥 **獸醫院地圖** - 一鍵導航到最近的動物醫院
- ⚡ **24/7 服務** - 全天候提供緊急協助
- 📱 **響應式設計** - 完美支援手機、平板和桌面裝置
- 🎨 **現代化 UI** - 使用 Framer Motion 打造流暢動畫

## 🛠️ 技術棧

### 前端
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- React Hot Toast
- Lucide React Icons

### 後端
- Vercel Serverless Functions
- Google Gemini AI API
- Node.js

## 📦 安裝與設定

### 1. 克隆專案

```bash
git clone <your-repo-url>
cd pet-emergency-ai
```

### 2. 安裝依賴

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 3. 設定環境變數

在 Vercel Dashboard 中設定環境變數:

- `GEMINI_API_KEY` - 您的 Gemini API 金鑰

#### 如何取得 Gemini API Key:
1. 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登入 Google 帳號
3. 點擊 "Create API Key"
4. 複製 API Key

### 4. 本地開發

```bash
# 啟動開發伺服器
npm run dev

# 在另一個終端啟動 Vercel 開發伺服器 (包含 API)
npx vercel dev
```

訪問 `http://localhost:5173`

### 5. 構建專案

```bash
npm run build
```

## 🚀 部署到 Vercel

### 方法 1: GitHub 整合 (推薦)

1. 將代碼推送到 GitHub
2. 前往 [Vercel Dashboard](https://vercel.com)
3. 點擊 "Import Project"
4. 選擇您的 GitHub 倉庫
5. 設定環境變數 `GEMINI_API_KEY`
6. 點擊 "Deploy"

### 方法 2: Vercel CLI

```bash
# 登入 Vercel
npx vercel login

# 部署
npx vercel --prod
```

## 📁 專案結構

```
pet-emergency-ai/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Emergency.tsx      # 整合 AI API
│   │   ├── SymptomChecker.tsx
│   │   ├── VetLocator.tsx
│   │   └── About.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── api/
│   └── get-help.js            # Serverless API
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 主要頁面

### 1. 首頁 (/)
- 展示平台特色
- 快速入口連結
- 統計數據展示

### 2. 緊急協助 (/emergency)
- AI 症狀分析
- GPS 定位
- 即時建議
- 獸醫院導航

### 3. 症狀檢查器 (/symptom-checker)
- 多症狀選擇
- 風險評估
- 專業建議

### 4. 獸醫院定位 (/vet-locator)
- 地圖搜尋
- 獸醫院資訊
- 一鍵撥號
- 導航功能

### 5. 關於我們 (/about)
- 平台介紹
- 團隊資訊
- 使命願景

## 🔧 API 端點

### POST /api/get-help

請求緊急協助建議

**Request Body:**
```json
{
  "question": "我的狗狗被車撞到,腿在流血",
  "lat": 25.033,
  "lng": 121.565
}
```

**Response:**
```json
{
  "advice": "1. 立即用乾淨的布按壓止血\n2. 避免寵物舔舐傷口\n3. 保持寵物安靜...",
  "mapUrl": "https://www.google.com/maps/search/動物醫院/@25.033,121.565,15z"
}
```

## 🎨 自定義樣式

專案使用 Tailwind CSS,可在以下文件中自定義:
- `tailwind.config.js` - Tailwind 配置
- `src/index.css` - 全局樣式

## 📱 瀏覽器支援

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## ⚠️ 重要提醒

此平台提供的建議僅供參考,不能替代專業獸醫診斷。如遇緊急情況,請立即聯繫當地獸醫院或撥打緊急熱線。

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issues 和 Pull Requests!

## 📞 聯絡方式

- 緊急熱線: 0800-PET-HELP
- Email: help@petai.com
- 網站: https://your-domain.vercel.app

---

Made with ❤️ for all pet lovers