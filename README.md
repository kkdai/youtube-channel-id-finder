# YouTube Channel ID Finder

A sleek, modern web application that extracts the **Channel ID** from any YouTube video URL using the YouTube Data API v3.

<img width="823" height="780" alt="image" src="https://github.com/user-attachments/assets/32e65e39-3b53-4cf0-a25b-707621f11b0a" />


![Built with TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Deploy on Cloud Run](https://img.shields.io/badge/Cloud%20Run-4285F4?logo=googlecloud&logoColor=white)

## Features

- 🎯 **Instant Lookup** — Paste a YouTube video URL and get the channel ID in one click.
- 📋 **One-Click Copy** — Copy the channel ID to your clipboard instantly.
- 🔑 **Client-Side API Key** — Your YouTube API key is stored securely in `localStorage`. No backend needed.
- 🌙 **Premium Dark UI** — Glassmorphism design with smooth animations and ambient gradient effects.
- 🐳 **Cloud Run Ready** — Includes `Dockerfile`, `nginx.conf`, and `cloudbuild.yaml` for one-command deployment.

## Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [YouTube Data API v3](https://console.cloud.google.com/apis/library/youtube.googleapis.com) key

### Run Locally

```bash
git clone git@github.com:kkdai/youtube-channel-id-finder.git
cd youtube-channel-id-finder
npm install
npm run dev
```

Open `http://localhost:5173`, enter your API key in the **Settings** section, and start looking up channel IDs.

### Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Google Cloud Run

This project includes a ready-to-use Cloud Build pipeline.

### 1. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### 2. Trigger a Build

```bash
gcloud builds submit --config cloudbuild.yaml
```

This will:
1. Build a multi-stage Docker image (Node 20 → Nginx Alpine).
2. Push the image to Google Container Registry.
3. Deploy to Cloud Run in `asia-east1` with public access on port `8080`.

## Project Structure

```
.
├── index.html          # Main HTML entry
├── src/
│   ├── main.ts         # Application logic (URL parsing, API calls, DOM updates)
│   └── style.css       # Premium glassmorphism styling
├── Dockerfile          # Multi-stage build (node → nginx)
├── nginx.conf          # Nginx config for Cloud Run (port 8080)
├── cloudbuild.yaml     # Cloud Build pipeline
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## License

MIT
