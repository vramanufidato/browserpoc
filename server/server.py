import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS just in case, though the extension background script might not strictly need it
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "running", "message": "YouTube Downloader Companion Server is active!"})

@app.route('/download', methods=['GET'])
def download():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "Missing url parameter"}), 400

    # Get user's Downloads folder
    if os.name == 'nt':
        # Windows
        import winreg
        sub_key = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders'
        downloads_guid = '{374DE290-123F-4565-9164-39C4925E467B}'
        try:
            with winreg.OpenKey(winreg.HKEY_CURRENT_USER, sub_key) as key:
                downloads_dir = winreg.QueryValueEx(key, downloads_guid)[0]
        except:
            downloads_dir = os.path.join(os.path.expanduser('~'), 'Downloads')
    else:
        # macOS / Linux
        downloads_dir = os.path.join(os.path.expanduser('~'), 'Downloads')
        
    output_template = os.path.join(downloads_dir, '%(title)s.%(ext)s')
    
    try:
        # Launch yt-dlp via python module in a non-blocking way
        subprocess.Popen(['python', '-m', 'yt_dlp', '-o', output_template, url])
        return jsonify({"message": "Download initiated successfully", "url": url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting local download server on port 5000...")
    app.run(host='127.0.0.1', port=5000)
