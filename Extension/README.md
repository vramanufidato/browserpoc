# YouTube Downloader Extension POC

This is a proof-of-concept YouTube downloader that uses a Chrome extension (frontend) communicating with a local Python server (backend) to download videos via `yt-dlp`.

## Architecture
- **Chrome Extension (`yt-downloader/`)**: Injects a "Download" button directly into the YouTube action bar. When clicked, it sends the current video URL to the local Python server.
- **Python Companion Server (`server/`)**: A Flask application listening on port `5000`. When it receives a request, it runs `yt-dlp` in the background to download the video straight to your standard Windows `Downloads` folder.

## Setup Instructions

### 1. Start the Local Python Server
The extension requires the background server to be running in order to process the downloads.

1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python server.py
   ```
   *Note: Keep this terminal window open while you use the extension.*

### 2. Install the Chrome Extension
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Turn on **Developer mode** using the toggle switch in the top right corner.
3. Click the **Load unpacked** button in the top left.
4. Select the `yt-downloader` directory located in this repository.

### 3. Usage
1. Make sure your Python server is running.
2. Go to any YouTube video (e.g., `https://www.youtube.com/watch?v=...`).
3. You should see a red **Download** button appear next to the Share/Save actions below the video player.
4. Click **Download**. The button will turn green indicating the download has started.
5. Check your computer's `Downloads` folder to find your downloaded video!
