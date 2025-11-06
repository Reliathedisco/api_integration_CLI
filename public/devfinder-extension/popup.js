// Popup script - handles the extension popup UI
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const status = document.getElementById('status');

  // Toggle the overlay when button is clicked
  toggleBtn.addEventListener('click', async function() {
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send message to content script to toggle overlay
      chrome.tabs.sendMessage(tab.id, { action: 'toggleOverlay' }, function(response) {
        if (chrome.runtime.lastError) {
          status.textContent = 'Error: ' + chrome.runtime.lastError.message;
          status.style.background = 'rgba(239, 68, 68, 0.2)';
        } else if (response && response.active) {
          status.textContent = '✓ Overlay Active';
          status.style.background = 'rgba(16, 185, 129, 0.2)';
          toggleBtn.textContent = 'Deactivate Overlay';
        } else {
          status.textContent = 'Overlay Inactive';
          status.style.background = 'rgba(255, 255, 255, 0.1)';
          toggleBtn.textContent = 'Activate Overlay';
        }
      });
    } catch (error) {
      status.textContent = 'Error: ' + error.message;
      status.style.background = 'rgba(239, 68, 68, 0.2)';
    }
  });

  // Check initial state
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getStatus' }, function(response) {
        if (chrome.runtime.lastError) {
          // Extension not yet loaded on this page
          status.textContent = 'Ready to activate';
        } else if (response && response.active) {
          status.textContent = '✓ Overlay Active';
          status.style.background = 'rgba(16, 185, 129, 0.2)';
          toggleBtn.textContent = 'Deactivate Overlay';
        }
      });
    }
  });
});

