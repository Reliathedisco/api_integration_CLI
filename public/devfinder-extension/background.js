// Background service worker - handles keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-overlay') {
    // Get the active tab and send toggle message
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleOverlay' });
      }
    });
  }
});

// Listen for extension icon clicks (alternative to popup for quick toggle)
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' });
});

