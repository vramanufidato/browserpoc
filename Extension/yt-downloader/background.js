chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadVideo') {
    const videoUrl = request.url;
    
    fetch(`http://127.0.0.1:5000/download?url=${encodeURIComponent(videoUrl)}`)
      .then(response => response.json())
      .then(data => {
        console.log('Download initiated:', data);
        sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.error('Error initiating download:', error);
        sendResponse({ success: false, error: error.message });
      });
      
    return true; // Keep message channel open for async response
  }
});

// Also allow downloading by just clicking the extension icon in the toolbar
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    console.log("Toolbar icon clicked, starting download for:", tab.url);
    fetch(`http://127.0.0.1:5000/download?url=${encodeURIComponent(tab.url)}`)
      .then(response => response.json())
      .then(data => console.log('Download initiated via icon:', data))
      .catch(error => console.error('Error initiating download via icon:', error));
  } else {
    console.log("Not a YouTube video page.");
  }
});
