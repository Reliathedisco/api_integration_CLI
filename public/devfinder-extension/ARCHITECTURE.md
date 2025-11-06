# DevFinder - Technical Architecture

## System Overview

DevFinder is a Chrome extension built with vanilla JavaScript that injects overlay UI into web pages to highlight and extract developer-relevant elements.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Chrome Browser                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────┐         ┌─────────────────────┐          │
│  │  Extension    │         │   Active Web Page   │          │
│  │    Popup      │         │                     │          │
│  │ ┌───────────┐ │         │  ┌───────────────┐  │          │
│  │ │popup.html │ │         │  │   Website     │  │          │
│  │ │popup.js   │ │◄────────┤  │   Content     │  │          │
│  │ └───────────┘ │ Message │  │               │  │          │
│  └───────────────┘         │  └───────────────┘  │          │
│         │                  │         ▲            │          │
│         │ Send             │         │            │          │
│         │ Message          │    Injected          │          │
│         ▼                  │         │            │          │
│  ┌───────────────┐         │  ┌───────────────┐  │          │
│  │  Background   │         │  │  content.js   │  │          │
│  │  Service      │◄────────┤  │  + styles.css │  │          │
│  │  Worker       │ Message │  │               │  │          │
│  │               │         │  │  ┌─────────┐  │  │          │
│  │background.js  │         │  │  │ Overlay │  │  │          │
│  └───────────────┘         │  │  │ System  │  │  │          │
│         ▲                  │  │  └─────────┘  │  │          │
│         │                  │  └───────────────┘  │          │
│    Keyboard                │                     │          │
│    Shortcuts               └─────────────────────┘          │
│         │                                                    │
└─────────┼────────────────────────────────────────────────────┘
          │
    Ctrl/Cmd+Shift+F
```

---

## Component Architecture

### 1. Manifest (manifest.json)
**Role**: Extension configuration and permissions

```json
{
  "manifest_version": 3,
  "permissions": ["activeTab", "scripting", "clipboardWrite"],
  "content_scripts": [...],
  "background": { "service_worker": "background.js" },
  "commands": { "toggle-overlay": {...} }
}
```

**Responsibilities:**
- Define extension metadata
- Declare permissions
- Configure content scripts injection
- Setup keyboard commands
- Register background worker

---

### 2. Content Script (content.js)
**Role**: Main detection and UI logic

**Lifecycle:**
```
Page Load → Inject content.js → Wait for activation
                                      │
                                      ▼
                              User triggers shortcut
                                      │
                                      ▼
                              activateOverlay()
                                      │
                    ┌─────────────────┴─────────────────┐
                    ▼                                   ▼
            detectElements()                    createOverlay()
                    │                                   │
                    ▼                                   ▼
            highlightElements()                 Render UI
```

**Key Functions:**

#### Detection Phase
```javascript
detectElements() {
  1. Query all DOM elements
  2. For each element:
     - Check attributes against patterns
     - Check text content against patterns
     - Classify by type (API, webhook, etc.)
  3. Store detected elements
  4. Return results
}
```

#### Rendering Phase
```javascript
highlightElements() {
  1. Create highlight div for each element
  2. Position based on element.getBoundingClientRect()
  3. Apply color based on type
  4. Attach event listeners
  5. Append to DOM
}
```

#### Interaction Phase
```javascript
Event Handlers:
  - Click → copyToClipboard() → Show notification
  - Hover → showTooltip()
  - Search → filterElements() → updateHighlights()
  - Scroll/Resize → updateHighlightPositions()
}
```

**State Management:**
```javascript
let overlayActive = false;
let detectedElements = [];
let highlightedElements = new Map();
let currentFilter = '';
```

---

### 3. Background Service Worker (background.js)
**Role**: Handle keyboard shortcuts

```javascript
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-overlay') {
    // Find active tab
    // Send message to content script
    chrome.tabs.sendMessage(tabId, { action: 'toggleOverlay' });
  }
});
```

**Communication Flow:**
```
User presses Ctrl+Shift+F
         │
         ▼
Chrome captures keyboard event
         │
         ▼
background.js receives command
         │
         ▼
Sends message to active tab
         │
         ▼
content.js receives message
         │
         ▼
toggleOverlay() executed
```

---

### 4. Popup UI (popup.html + popup.js)
**Role**: Extension popup interface

**UI Structure:**
```html
popup.html
├── Header (Icon + Title)
├── Toggle Button
├── Keyboard Shortcuts Info
├── Color Legend
└── Status Display
```

**Communication:**
```javascript
popup.js:
  User clicks button
         │
         ▼
  Query active tab
         │
         ▼
  Send message to content script
         │
         ▼
  Receive response
         │
         ▼
  Update UI state
```

---

### 5. Styles (styles.css)
**Role**: Visual styling for overlay

**CSS Architecture:**
```
styles.css
├── Overlay Container (#devfinder-overlay)
├── Backdrop (.devfinder-backdrop)
├── Control Panel (.devfinder-controls)
│   ├── Header
│   ├── Search Bar
│   └── Statistics
├── Highlights (.devfinder-highlight)
├── Tooltip (.devfinder-tooltip)
├── Notification (.devfinder-notification)
└── Animations
    ├── @keyframes fadeIn
    ├── @keyframes slideDown
    └── @keyframes highlightPulse
```

**Z-Index Hierarchy:**
```
Page Content:           z-index: auto (0)
Backdrop:              z-index: 2147483647 (MAX)
Highlights:            z-index: 2147483646 (MAX-1)
Highlights (hover):    z-index: 2147483647 (MAX)
Control Panel:         z-index: 2147483648 (MAX+1)
Tooltip:               z-index: 2147483649 (MAX+2)
Notification:          z-index: 2147483650 (MAX+3)
```

---

## Data Flow

### Element Detection Flow

```
┌──────────────┐
│  Web Page    │
│    DOM       │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│  document.querySelectorAll   │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  For each element:           │
│  ┌────────────────────────┐  │
│  │ Check attributes       │  │
│  │ - href, src, data-*    │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ Check text content     │  │
│  │ - Match regex patterns │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ Classify by type       │  │
│  │ - API, webhook, etc.   │  │
│  └────────────────────────┘  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  detectedElements[]          │
│  [                           │
│    {                         │
│      element: DOMElement,    │
│      type: 'API_ENDPOINT',   │
│      value: '/api/users',    │
│      color: '#3b82f6'        │
│    },                        │
│    ...                       │
│  ]                           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Create Highlights           │
│  Position & Style            │
└──────────────────────────────┘
```

### User Interaction Flow

```
┌─────────────────┐
│ User hovers     │
│ over highlight  │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ mouseenter event    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ showTooltip()       │
│ - Get element data  │
│ - Position tooltip  │
│ - Show value        │
└─────────────────────┘

┌─────────────────┐
│ User clicks     │
│ highlight       │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ click event         │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ copyToClipboard()   │
│ - Get value         │
│ - navigator.clipboard
│ - Show notification │
└─────────────────────┘
```

---

## Pattern Matching System

### Pattern Registry

```javascript
ELEMENT_TYPES = {
  API_ENDPOINT: {
    name: 'API Endpoint',
    color: '#3b82f6',
    patterns: [
      /\/api\//i,           // Matches: /api/users
      /\/v\d+\//,           // Matches: /v1/items, /v2/data
      /\/graphql/i,         // Matches: /graphql
      /\/rest\//i,          // Matches: /rest/api
      /\.json$/i,           // Matches: data.json
      /\/endpoints?\//i     // Matches: /endpoint/, /endpoints/
    ],
    attributes: ['href', 'src', 'data-url', 'data-endpoint']
  },
  // ... other types
}
```

### Detection Algorithm

```
For each element in DOM:
  Skip if element is in #devfinder-overlay
  
  For each ELEMENT_TYPE:
    For each attribute in type.attributes:
      value = element.getAttribute(attribute)
      
      For each pattern in type.patterns:
        if pattern.test(value):
          Add to detectedElements
          Break to next element
    
    textContent = element.textContent.trim()
    if textContent.length < 200:
      For each pattern in type.patterns:
        if pattern.test(textContent):
          Add to detectedElements
          Break to next element
```

---

## Event System

### Chrome Extension Messages

```javascript
// From popup.js or background.js
chrome.tabs.sendMessage(tabId, {
  action: 'toggleOverlay'
});

// Received in content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleOverlay') {
    toggleOverlay();
    sendResponse({ active: overlayActive });
  }
});
```

### DOM Events

```javascript
Event Listeners:
  
  Overlay:
    - ESC key → deactivateOverlay()
    - Scroll → updateHighlights() [debounced]
    - Resize → updateHighlights() [debounced]
  
  Control Panel:
    - Close button click → deactivateOverlay()
    - Search input → handleSearch()
  
  Highlights:
    - Click → copyToClipboard()
    - Mouseenter → showTooltip()
    - Mouseleave → hideTooltip()
```

---

## Performance Optimizations

### 1. Efficient DOM Queries
```javascript
// Single query, iterate once
const allElements = document.querySelectorAll('*');

// Instead of multiple queries per pattern
```

### 2. Debounced Updates
```javascript
// Don't update on every scroll event
window.addEventListener('scroll', debounce(updateHighlights, 100));
```

### 3. Early Bailout
```javascript
// Skip elements in our own overlay
if (element.closest('#devfinder-overlay')) continue;

// Limit text content scan
if (textContent.length > 200) continue;
```

### 4. Map for O(1) Lookup
```javascript
// Fast element → highlight mapping
let highlightedElements = new Map();
```

### 5. Cleanup on Deactivation
```javascript
function deactivateOverlay() {
  removeOverlay();
  clearHighlights();
  detectedElements = [];
  highlightedElements.clear();
  // Remove event listeners
}
```

---

## Security Considerations

### 1. XSS Prevention
```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;  // Automatically escapes
  return div.innerHTML;
}
```

### 2. Minimal Permissions
```json
"permissions": [
  "activeTab",      // Only active tab
  "scripting",      // Inject scripts
  "clipboardWrite"  // Copy to clipboard
]
// No "tabs" permission (no access to all tabs)
// No "storage" permission (no persistent storage)
```

### 3. Content Security Policy
- No eval() usage
- No inline scripts
- All code in separate files

---

## Extension Lifecycle

```
┌─────────────────────────────────────────────────────┐
│ 1. Installation                                     │
│    - Chrome loads manifest.json                     │
│    - Registers background service worker            │
│    - Sets up keyboard commands                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 2. Page Load                                        │
│    - content.js injected via manifest               │
│    - styles.css applied                             │
│    - Script waits for activation                    │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 3. Activation (User trigger)                        │
│    - Keyboard shortcut OR icon click                │
│    - background.js → content.js message             │
│    - content.js: activateOverlay()                  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 4. Active State                                     │
│    - Overlay visible                                │
│    - Elements highlighted                           │
│    - Event listeners active                         │
│    - Responds to user interactions                  │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│ 5. Deactivation                                     │
│    - ESC key OR close button OR toggle              │
│    - Remove overlay from DOM                        │
│    - Clear highlights                               │
│    - Remove event listeners                         │
└─────────────────────────────────────────────────────┘
```

---

## File Sizes & Metrics

```
manifest.json       ~1 KB
content.js         ~15 KB  (430 lines, main logic)
background.js      ~1 KB   (simple message handler)
popup.html         ~3 KB   (UI structure)
popup.js           ~2 KB   (popup logic)
styles.css         ~6 KB   (all styling)
───────────────────────────
Total Code:        ~28 KB  (uncompressed)
```

---

## Browser Compatibility

### Chrome/Chromium
✅ Chrome 90+ (Manifest V3 required)  
✅ Chrome 120+ (Latest, recommended)

### Edge
✅ Edge 90+ (Chromium-based)

### Brave
✅ Brave Browser (Chromium-based)

### Firefox
❌ Not compatible (different extension API)  
🔮 Future: Port to Firefox Manifest V3

### Safari
❌ Not compatible (WebExtensions API differs)  
🔮 Future: Adapt for Safari

---

## API Dependencies

### Chrome Extension APIs Used
```javascript
chrome.runtime.onMessage      // Message passing
chrome.tabs.query             // Get active tab
chrome.tabs.sendMessage       // Send to content script
chrome.commands.onCommand     // Keyboard shortcuts
```

### Web APIs Used
```javascript
navigator.clipboard.writeText() // Copy to clipboard
document.querySelectorAll()     // DOM queries
getBoundingClientRect()         // Element positioning
MutationObserver (future)       // DOM change detection
```

### No External Dependencies
- ✅ No npm packages
- ✅ No CDN resources
- ✅ No external fonts
- ✅ No analytics services

---

## Future Architecture Enhancements

### V1.1.0 - Dynamic Detection
```
Add MutationObserver to watch DOM changes:

new MutationObserver((mutations) => {
  if (overlayActive) {
    detectElements();
    updateHighlights();
  }
}).observe(document.body, {
  childList: true,
  subtree: true
});
```

### V1.2.0 - AI Integration
```
Worker thread for ML inference:

Service Worker
     │
     ▼
Web Worker (ML Model)
     │
     ▼
Classify elements
     │
     ▼
Return predictions
```

### V2.0.0 - Workflow Integration
```
Export System:

detectedElements
     │
     ▼
Transform to format
     │
     ├─→ Postman Collection
     ├─→ OpenAPI Spec
     ├─→ Code Generation
     └─→ Documentation
```

---

## Testing Architecture

### Unit Testing (Future)
```javascript
describe('Element Detection', () => {
  test('detects API endpoints', () => {
    const element = createMockElement({ href: '/api/users' });
    const detected = detectElements();
    expect(detected).toContainElementType('API_ENDPOINT');
  });
});
```

### Integration Testing
- Manual testing with demo.html
- Real-world testing on live sites
- Cross-browser testing

---

## Deployment Architecture

```
Development
     │
     ├─→ Local Testing (demo.html)
     │
     ├─→ Manual QA (TEST.md checklist)
     │
     └─→ Ready for Distribution
              │
              ├─→ GitHub Release
              │
              └─→ Chrome Web Store (future)
```

---

**Last Updated**: November 4, 2025  
**Version**: 1.0.0  
**Architecture Status**: Stable

