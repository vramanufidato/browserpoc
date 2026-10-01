function injectDownloadButton() {
  if (document.getElementById('yt-downloader-btn')) return;

  const actionContainer = document.querySelector('#top-level-buttons-computed') || 
                          document.querySelector('ytd-menu-renderer #top-level-buttons') ||
                          document.querySelector('#actions-inner');

  if (!actionContainer) return;

  const downloadBtn = document.createElement('button');
  downloadBtn.id = 'yt-downloader-btn';
  downloadBtn.innerText = 'Download';
  downloadBtn.style.backgroundColor = '#cc0000';
  downloadBtn.style.color = 'white';
  downloadBtn.style.border = 'none';
  downloadBtn.style.borderRadius = '18px';
  downloadBtn.style.padding = '0 16px';
  downloadBtn.style.height = '36px';
  downloadBtn.style.fontSize = '14px';
  downloadBtn.style.fontWeight = '500';
  downloadBtn.style.cursor = 'pointer';
  downloadBtn.style.marginLeft = '8px';
  downloadBtn.style.marginRight = '8px';
  downloadBtn.style.fontFamily = 'Roboto, Arial, sans-serif';
  downloadBtn.style.alignSelf = 'center';

  downloadBtn.addEventListener('click', () => {
    const videoUrl = window.location.href;
    downloadBtn.innerText = 'Downloading...';
    downloadBtn.style.backgroundColor = '#666';
    
    chrome.runtime.sendMessage({ action: 'downloadVideo', url: videoUrl }, response => {
      if (chrome.runtime.lastError || !response || !response.success) {
        alert('Failed to connect to local server. Make sure Python server is running on port 5000.');
        downloadBtn.innerText = 'Download Failed';
        downloadBtn.style.backgroundColor = '#cc0000';
      } else {
        downloadBtn.innerText = 'Download Started';
        downloadBtn.style.backgroundColor = 'green';
      }
      
      setTimeout(() => {
        downloadBtn.innerText = 'Download';
        downloadBtn.style.backgroundColor = '#cc0000';
      }, 3000);
    });
  });

  actionContainer.appendChild(downloadBtn);
}

const observer = new MutationObserver((mutations) => {
  if (window.location.pathname === '/watch') {
    if (!document.getElementById('yt-downloader-btn')) {
        injectDownloadButton();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

if (window.location.pathname === '/watch') {
  setTimeout(injectDownloadButton, 2000);
}
