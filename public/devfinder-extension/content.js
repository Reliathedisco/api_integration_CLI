// Content script - injected into web pages to detect and highlight elements
(function() {
  'use strict';

  // State management
  let overlayActive = false;
  let detectedElements = [];
  let highlightedElements = new Map(); // Store element -> highlight mapping
  let currentFilter = '';
  let backdropOpacity = 0.05; // Very subtle by default

  // Element type definitions with detection patterns and colors
  const ELEMENT_TYPES = {
    API_ENDPOINT: {
      name: 'API Endpoint',
      color: '#3b82f6', // Blue
      patterns: [
        /\/api\//i,
        /\/v\d+\//,
        /\/graphql/i,
        /\/rest\//i,
        /\.json$/i,
        /\/endpoints?\//i
      ],
      attributes: ['href', 'src', 'data-url', 'data-endpoint', 'action']
    },
    WEBHOOK: {
      name: 'Webhook',
      color: '#10b981', // Green
      patterns: [
        /\/webhook/i,
        /\/hooks?\//i,
        /\/callback/i,
        /\/notify/i
      ],
      attributes: ['href', 'src', 'data-url', 'data-webhook']
    },
    ID_KEY: {
      name: 'ID/Key',
      color: '#8b5cf6', // Purple
      patterns: [
        /[_-]?key[_-]?/i,
        /^sk_/,
        /^pk_/,
        /^id[_-]/i,
        /[_-]id$/i,
        /_token$/i,
        /client[_-]?id/i,
        /app[_-]?id/i,
        /api[_-]?key/i
      ],
      attributes: ['data-id', 'data-key', 'id', 'data-client-id', 'data-app-id', 'data-api-key']
    },
    TOKEN: {
      name: 'Token',
      color: '#f59e0b', // Orange
      patterns: [
        /bearer\s+/i,
        /^token[_-]/i,
        /auth[_-]?token/i,
        /access[_-]?token/i,
        /refresh[_-]?token/i,
        /jwt/i
      ],
      attributes: ['data-token', 'data-auth', 'data-bearer']
    },
    FORM_INPUT: {
      name: 'Form Input',
      color: '#eab308', // Yellow
      patterns: [],
      selector: 'input[type="text"], input[type="password"], input[type="email"], input[name*="key"], input[name*="token"], input[name*="id"]'
    }
  };

  /**
   * Detect elements on the page based on patterns and types
   */
  function detectElements() {
    detectedElements = [];
    const allElements = document.querySelectorAll('*');

    allElements.forEach(element => {
      // Skip our own overlay elements
      if (element.closest('#devfinder-overlay')) return;

      // Check for API endpoints, webhooks, IDs, tokens
      for (const [typeKey, typeConfig] of Object.entries(ELEMENT_TYPES)) {
        if (typeKey === 'FORM_INPUT') continue; // Handle separately

        // Check attributes
        if (typeConfig.attributes) {
          for (const attr of typeConfig.attributes) {
            const value = element.getAttribute(attr);
            if (value && typeConfig.patterns.some(pattern => pattern.test(value))) {
              addDetectedElement(element, typeKey, value, attr);
              break;
            }
          }
        }

        // Check text content for patterns
        const textContent = element.textContent?.trim() || '';
        if (textContent && textContent.length < 200) { // Avoid large text blocks
          if (typeConfig.patterns.some(pattern => pattern.test(textContent))) {
            addDetectedElement(element, typeKey, textContent, 'text');
          }
        }
      }
    });

    // Handle form inputs separately
    const formInputs = document.querySelectorAll(ELEMENT_TYPES.FORM_INPUT.selector);
    formInputs.forEach(input => {
      if (!input.closest('#devfinder-overlay')) {
        const value = input.value || input.placeholder || input.name;
        addDetectedElement(input, 'FORM_INPUT', value, 'input');
      }
    });

    console.log(`DevFinder: Detected ${detectedElements.length} elements`);
    return detectedElements;
  }

  /**
   * Add a detected element to the list (avoid duplicates)
   */
  function addDetectedElement(element, type, value, source) {
    // Check if this exact element is already detected
    const existing = detectedElements.find(item => item.element === element && item.type === type);
    if (!existing) {
      detectedElements.push({
        element,
        type,
        value: value.substring(0, 200), // Limit value length
        source,
        color: ELEMENT_TYPES[type].color,
        name: ELEMENT_TYPES[type].name
      });
    }
  }

  /**
   * Create the main overlay UI
   */
  function createOverlay() {
    // Remove existing overlay if present
    removeOverlay();

    const overlay = document.createElement('div');
    overlay.id = 'devfinder-overlay';
    overlay.innerHTML = `
      <div class="devfinder-backdrop" title="Click to adjust background dimming"></div>
      <div class="devfinder-controls">
        <div class="devfinder-header">
          <div class="devfinder-logo">
            <span class="devfinder-icon">🔍</span>
            <span class="devfinder-title">DevFinder</span>
          </div>
          <button class="devfinder-close" id="devfinder-close">✕</button>
        </div>
        
        <div class="devfinder-search">
          <input 
            type="text" 
            id="devfinder-search-input" 
            placeholder="Filter elements (e.g., 'api', 'webhook', 'key')..."
          />
        </div>

        <div class="devfinder-stats" id="devfinder-stats">
          <div class="stat-item">
            <span class="stat-color" style="background: ${ELEMENT_TYPES.API_ENDPOINT.color}"></span>
            <span class="stat-label">APIs: <strong id="count-api">0</strong></span>
          </div>
          <div class="stat-item">
            <span class="stat-color" style="background: ${ELEMENT_TYPES.WEBHOOK.color}"></span>
            <span class="stat-label">Webhooks: <strong id="count-webhook">0</strong></span>
          </div>
          <div class="stat-item">
            <span class="stat-color" style="background: ${ELEMENT_TYPES.ID_KEY.color}"></span>
            <span class="stat-label">IDs/Keys: <strong id="count-id">0</strong></span>
          </div>
          <div class="stat-item">
            <span class="stat-color" style="background: ${ELEMENT_TYPES.TOKEN.color}"></span>
            <span class="stat-label">Tokens: <strong id="count-token">0</strong></span>
          </div>
          <div class="stat-item">
            <span class="stat-color" style="background: ${ELEMENT_TYPES.FORM_INPUT.color}"></span>
            <span class="stat-label">Inputs: <strong id="count-input">0</strong></span>
          </div>
        </div>

        <div class="devfinder-hint">
          Click highlighted elements to copy • Hover for details • Click background to adjust dimming • Press ESC to close
        </div>
      </div>

      <div class="devfinder-tooltip" id="devfinder-tooltip"></div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    document.getElementById('devfinder-close').addEventListener('click', deactivateOverlay);
    document.getElementById('devfinder-search-input').addEventListener('input', handleSearch);
    
    // Backdrop click to toggle opacity
    const backdrop = overlay.querySelector('.devfinder-backdrop');
    backdrop.addEventListener('click', toggleBackdropOpacity);
    
    // ESC key to close
    document.addEventListener('keydown', handleEscapeKey);
  }

  /**
   * Toggle backdrop opacity through different levels
   */
  function toggleBackdropOpacity() {
    const backdrop = document.querySelector('.devfinder-backdrop');
    if (!backdrop) return;
    
    // Cycle through: none (0) → subtle (0.05) → medium (0.15) → dark (0.4) → back to none
    if (backdropOpacity === 0) {
      backdropOpacity = 0.05;
    } else if (backdropOpacity === 0.05) {
      backdropOpacity = 0.15;
    } else if (backdropOpacity === 0.15) {
      backdropOpacity = 0.4;
    } else {
      backdropOpacity = 0;
    }
    
    backdrop.style.background = `rgba(0, 0, 0, ${backdropOpacity})`;
    
    // Show brief notification
    const levels = { 0: 'Off', 0.05: 'Subtle', 0.15: 'Medium', 0.4: 'Dark' };
    showNotification(`Background: ${levels[backdropOpacity]}`, backdrop);
  }

  /**
   * Handle search/filter input
   */
  function handleSearch(e) {
    currentFilter = e.target.value.toLowerCase();
    updateHighlights();
  }

  /**
   * Handle ESC key to close overlay
   */
  function handleEscapeKey(e) {
    if (e.key === 'Escape' && overlayActive) {
      deactivateOverlay();
    }
  }

  /**
   * Highlight all detected elements
   */
  function highlightElements() {
    clearHighlights();

    detectedElements.forEach(item => {
      // Apply filter if active
      if (currentFilter && !item.value.toLowerCase().includes(currentFilter) && !item.name.toLowerCase().includes(currentFilter)) {
        return;
      }

      const highlight = createHighlight(item);
      document.body.appendChild(highlight);
      highlightedElements.set(item.element, highlight);

      // Position the highlight
      updateHighlightPosition(item.element, highlight);
    });

    updateStats();
  }

  /**
   * Create a highlight overlay for an element
   */
  function createHighlight(item) {
    const highlight = document.createElement('div');
    highlight.className = 'devfinder-highlight';
    highlight.style.borderColor = item.color;
    highlight.style.boxShadow = `0 0 0 2px ${item.color}, 0 0 10px ${item.color}40`;

    // Add click handler to copy value
    highlight.addEventListener('click', (e) => {
      e.stopPropagation();
      copyToClipboard(item.value, highlight);
    });

    // Add hover handlers for tooltip
    highlight.addEventListener('mouseenter', (e) => {
      showTooltip(item, e);
    });

    highlight.addEventListener('mouseleave', hideTooltip);

    return highlight;
  }

  /**
   * Update highlight position to match element
   */
  function updateHighlightPosition(element, highlight) {
    const rect = element.getBoundingClientRect();
    highlight.style.top = (rect.top + window.scrollY) + 'px';
    highlight.style.left = (rect.left + window.scrollX) + 'px';
    highlight.style.width = rect.width + 'px';
    highlight.style.height = rect.height + 'px';
  }

  /**
   * Show tooltip on hover
   */
  function showTooltip(item, event) {
    const tooltip = document.getElementById('devfinder-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = `
      <div class="tooltip-header" style="border-left: 3px solid ${item.color}">
        <strong>${item.name}</strong>
      </div>
      <div class="tooltip-content">
        <div class="tooltip-value">${escapeHtml(item.value)}</div>
        <div class="tooltip-hint">Click to copy</div>
      </div>
    `;

    tooltip.style.display = 'block';
    
    // Position tooltip near cursor
    const x = event.clientX + 15;
    const y = event.clientY + 15;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }

  /**
   * Hide tooltip
   */
  function hideTooltip() {
    const tooltip = document.getElementById('devfinder-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  /**
   * Show a notification message
   */
  function showNotification(message, targetElement) {
    const notification = document.createElement('div');
    notification.className = 'devfinder-notification';
    notification.textContent = message;
    
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      notification.style.left = (rect.left + rect.width / 2) + 'px';
      notification.style.top = (rect.top + rect.height / 2) + 'px';
    } else {
      // Center of screen
      notification.style.left = '50%';
      notification.style.top = '50%';
    }
    
    document.body.appendChild(notification);

    // Animate and remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);

    setTimeout(() => {
      notification.remove();
    }, 1500);
  }

  /**
   * Copy value to clipboard and show notification
   */
  function copyToClipboard(text, highlight) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('✓ Copied!', highlight);
    }).catch(err => {
      console.error('Failed to copy:', err);
      showNotification('❌ Copy failed', highlight);
    });
  }

  /**
   * Update statistics counters
   */
  function updateStats() {
    const counts = {
      API_ENDPOINT: 0,
      WEBHOOK: 0,
      ID_KEY: 0,
      TOKEN: 0,
      FORM_INPUT: 0
    };

    detectedElements.forEach(item => {
      if (!currentFilter || item.value.toLowerCase().includes(currentFilter) || item.name.toLowerCase().includes(currentFilter)) {
        counts[item.type]++;
      }
    });

    const countElements = {
      'count-api': counts.API_ENDPOINT,
      'count-webhook': counts.WEBHOOK,
      'count-id': counts.ID_KEY,
      'count-token': counts.TOKEN,
      'count-input': counts.FORM_INPUT
    };

    for (const [id, count] of Object.entries(countElements)) {
      const elem = document.getElementById(id);
      if (elem) elem.textContent = count;
    }
  }

  /**
   * Clear all highlights
   */
  function clearHighlights() {
    highlightedElements.forEach(highlight => highlight.remove());
    highlightedElements.clear();
  }

  /**
   * Update highlights (e.g., after filtering or scroll)
   */
  function updateHighlights() {
    clearHighlights();
    highlightElements();
  }

  /**
   * Remove overlay from page
   */
  function removeOverlay() {
    const overlay = document.getElementById('devfinder-overlay');
    if (overlay) {
      overlay.remove();
    }
    clearHighlights();
    document.removeEventListener('keydown', handleEscapeKey);
  }

  /**
   * Activate the overlay
   */
  function activateOverlay() {
    if (overlayActive) return;

    overlayActive = true;
    createOverlay();
    detectElements();
    highlightElements();

    // Update highlights on scroll and resize
    window.addEventListener('scroll', updateHighlights, { passive: true });
    window.addEventListener('resize', updateHighlights, { passive: true });
  }

  /**
   * Deactivate the overlay
   */
  function deactivateOverlay() {
    if (!overlayActive) return;

    overlayActive = false;
    removeOverlay();
    currentFilter = '';

    window.removeEventListener('scroll', updateHighlights);
    window.removeEventListener('resize', updateHighlights);
  }

  /**
   * Toggle overlay on/off
   */
  function toggleOverlay() {
    if (overlayActive) {
      deactivateOverlay();
    } else {
      activateOverlay();
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Listen for messages from popup and background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleOverlay') {
      toggleOverlay();
      sendResponse({ active: overlayActive });
    } else if (request.action === 'getStatus') {
      sendResponse({ active: overlayActive });
    }
    return true;
  });

  console.log('DevFinder: Content script loaded');
})();

