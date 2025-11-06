# 🔍 DevFinder - Visual Element Locator

A powerful Chrome extension that helps developers quickly locate and extract important elements on any website using visual overlays and color-coded highlights.

## Features

### 🎯 Element Detection
DevFinder automatically scans web pages and highlights:
- **API Endpoints** (Blue) - URLs containing `/api/`, `/v1/`, `/graphql`, etc.
- **Webhooks** (Green) - URLs with `/webhook`, `/hooks`, `/callback`
- **IDs & Keys** (Purple) - API keys, client IDs, data attributes with key patterns
- **Tokens** (Orange) - Bearer tokens, auth tokens, access tokens
- **Form Inputs** (Yellow) - Important form fields with valuable data

### ⚡ Quick Actions
- **Click** any highlighted element to copy its value to clipboard
- **Hover** over elements to see detailed tooltips
- **Search/Filter** to find specific types of elements
- **Live Stats** showing count of each element type found

### 🎨 Beautiful UI
- Clean, modern overlay interface
- Semi-transparent backdrop with blur effect
- Animated highlights with subtle pulse effect
- Responsive design works on any screen size

## Installation

### From Source (Developer Mode)

1. **Clone or download** this repository to your local machine

2. **Open Chrome** and navigate to `chrome://extensions/`

3. **Enable Developer Mode** (toggle in top-right corner)

4. **Click "Load unpacked"** and select the `wherethefisit` folder

5. **Pin the extension** to your toolbar for easy access (optional)

### Generate Icons (Optional)

The extension needs icons in three sizes. You can:

#### Option A: Use a Simple Placeholder
Create a simple colored square as placeholder:
```bash
# Install ImageMagick if you don't have it
brew install imagemagick  # macOS
# or: sudo apt-get install imagemagick  # Linux

# Generate icons
convert -size 16x16 xc:#667eea icons/icon16.png
convert -size 48x48 xc:#667eea icons/icon48.png
convert -size 128x128 xc:#667eea icons/icon128.png
```

#### Option B: Create Custom Icons
Use any image editor to create PNG files:
- `icons/icon16.png` (16x16 pixels)
- `icons/icon48.png` (48x48 pixels)
- `icons/icon128.png` (128x128 pixels)

Recommended design: A magnifying glass icon with a gradient purple/blue theme.

## Usage

### Activation Methods

1. **Keyboard Shortcut**: `Ctrl+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)
2. **Click the extension icon** in your browser toolbar
3. **Click the popup button** "Activate Overlay"

### Using the Overlay

Once activated, you'll see:

1. **Control Panel** at the top with:
   - Search bar to filter elements
   - Live statistics for each element type
   - Close button

2. **Highlighted Elements** throughout the page:
   - Different colors for different types
   - Animated pulse effect
   - Click to copy values

3. **Tooltips** on hover showing:
   - Element type
   - Full value/content
   - "Click to copy" hint

### Tips & Tricks

- **Filter elements**: Type keywords like "api", "key", or "webhook" in the search bar
- **Quick copy**: Click any highlighted element to instantly copy its value
- **Close overlay**: Press `ESC` or click the X button
- **Re-scan page**: Close and reopen the overlay to detect new elements

## Best Use Cases

DevFinder works great on:

- 📘 **API Documentation** (Stripe, Twilio, etc.)
- 🔧 **Developer Dashboards** (GitHub, Firebase, AWS)
- 🧪 **Testing Environments** (finding test keys and endpoints)
- 📊 **Admin Panels** (locating IDs and configuration values)
- 🌐 **Any Website** where you need to extract technical data

## Technical Details

### Architecture

- **Manifest V3** - Latest Chrome extension format
- **Vanilla JavaScript** - No dependencies, fast and lightweight
- **Content Script** - Injected into web pages for element detection
- **Service Worker** - Background script for keyboard shortcuts
- **Popup UI** - Quick access control panel

### Detection Patterns

The extension uses regex patterns to identify:

```javascript
// API Endpoints
/\/api\//i, /\/v\d+\//, /\/graphql/i, /\/rest\//i

// Webhooks
/\/webhook/i, /\/hooks?\//i, /\/callback/i

// Keys & IDs
/[_-]?key[_-]?/i, /^sk_/, /^pk_/, /[_-]id$/i

// Tokens
/bearer\s+/i, /auth[_-]?token/i, /access[_-]?token/i
```

### Privacy & Security

- ✅ **No data collection** - Everything runs locally
- ✅ **No external requests** - Extension doesn't send data anywhere
- ✅ **Minimal permissions** - Only requires `activeTab` and `scripting`
- ✅ **Open source** - Fully auditable code

## Development

### Project Structure

```
wherethefisit/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI
├── popup.js           # Popup logic
├── background.js      # Service worker for shortcuts
├── content.js         # Main detection & highlighting logic
├── styles.css         # Extension styles
├── icons/            # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md         # This file
```

### Customization

#### Add New Element Types

Edit `content.js` and add to `ELEMENT_TYPES`:

```javascript
NEW_TYPE: {
  name: 'New Type',
  color: '#ff0000', // Red
  patterns: [/your-pattern/i],
  attributes: ['data-custom']
}
```

#### Change Colors

Update colors in `ELEMENT_TYPES` object in `content.js`:

```javascript
API_ENDPOINT: {
  color: '#your-hex-color'
}
```

#### Modify Keyboard Shortcut

Edit `manifest.json`:

```json
"commands": {
  "toggle-overlay": {
    "suggested_key": {
      "default": "Ctrl+Shift+D"
    }
  }
}
```

### Future Enhancements

Potential features to add:

- 🤖 **AI-powered detection** using ML models
- 💾 **Export detected elements** to JSON/CSV
- 🎯 **Custom patterns** user can define
- 📊 **Analytics** showing element frequency
- 🔄 **Auto-refresh** on page changes
- 📝 **Element annotations** with notes
- 🌓 **Dark mode** toggle

## Troubleshooting

### Extension not working?

1. **Reload the extension**:
   - Go to `chrome://extensions/`
   - Click the refresh icon on DevFinder

2. **Refresh the webpage** you're testing on

3. **Check console for errors**:
   - Right-click page → Inspect → Console
   - Look for DevFinder messages

### No elements detected?

- Some websites use dynamic content - try scrolling first
- The page might not have detectable patterns
- Try adjusting detection patterns in `content.js`

### Keyboard shortcut not working?

1. Check `chrome://extensions/shortcuts`
2. Ensure no conflicts with other extensions
3. Try clicking the extension icon instead

## Contributing

Found a bug or want to add a feature?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use and modify as needed.

## Credits

Built with ❤️ for developers who love efficient workflows.

---

**Happy Element Hunting! 🔍**

