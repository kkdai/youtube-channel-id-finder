# YouTube Channel ID Finder

一個簡潔且具質感的網頁應用，透過 YouTube Data API v3，從任何 YouTube 影片網址中擷取 **Channel ID**。

<img width="823" height="780" alt="image" src="https://github.com/user-attachments/assets/2b828e96-8418-4793-8d92-d429c7ed5b3e" />


![Built with TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Deploy on Cloud Run](https://img.shields.io/badge/Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)

## 功能特色

- 🎯 **即時查詢** — 貼上 YouTube 影片網址，一鍵取得 Channel ID。
- 📋 **一鍵複製** — 快速將 Channel ID 複製到剪貼簿。
- 🔑 **前端 API Key 管理** — API Key 安全儲存在瀏覽器的 `localStorage`，無需後端伺服器。
- 🌙 **高質感暗色介面** — Glassmorphism 設計風格搭配流暢動畫與環境漸層光效。
- 🐳 **Cloud Run 就緒** — 內含 `Dockerfile`、`nginx.conf` 與 `cloudbuild.yaml`，可一鍵部署。

## 支援的網址格式

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## 快速開始

### 前置條件

- [Node.js](https://nodejs.org/) 18+
- 一組 [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) 金鑰

### 本地開發

```bash
git clone git@github.com:kkdai/youtube-channel-id-finder.git
cd youtube-channel-id-finder
npm install
npm run dev
```

打開 `http://localhost:5173`，在頁面下方的 **Settings** 區塊輸入你的 API Key，即可開始查詢。

### 建置正式版本

```bash
npm run build
npm run preview
```

## 部署到 Google Cloud Run

本專案已內建完整的 Cloud Build 部署流程。

### 1. 啟用所需 API

```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### 2. 觸發建置與部署

```bash
gcloud builds submit --config cloudbuild.yaml
```

此指令會自動：
1. 執行多階段 Docker 建置（Node 20 → Nginx Alpine）。
2. 將映像檔推送至 Google Container Registry。
3. 部署至 Cloud Run（`asia-east1` 區域），開放公開存取，監聽 port `8080`。

## 專案結構

```
.
├── index.html          # 主要 HTML 入口
├── src/
│   ├── main.ts         # 應用程式邏輯（URL 解析、API 呼叫、DOM 更新）
│   └── style.css       # Glassmorphism 高質感樣式
├── Dockerfile          # 多階段建置（node → nginx）
├── nginx.conf          # Nginx 設定（Cloud Run port 8080）
├── cloudbuild.yaml     # Cloud Build 部署流程
├── vite.config.ts      # Vite 設定
├── tsconfig.json       # TypeScript 設定
└── package.json
```

## 授權

MIT
