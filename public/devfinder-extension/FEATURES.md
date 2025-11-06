# DevFinder - Feature Documentation

## Current Features (v1.0.0)

### 🔍 Element Detection

#### Supported Element Types

1. **API Endpoints** (Blue - `#3b82f6`)
   - Detects URLs containing:
     - `/api/` - Standard API paths
     - `/v1/`, `/v2/`, etc. - Versioned APIs
     - `/graphql` - GraphQL endpoints
     - `/rest/` - REST API paths
     - `.json` - JSON endpoints
     - `/endpoints/` - Endpoint paths
   - Scans attributes: `href`, `src`, `data-url`, `data-endpoint`, `action`

2. **Webhooks** (Green - `#10b981`)
   - Detects URLs containing:
     - `/webhook` - Standard webhook paths
     - `/hooks/` - Hook endpoints
     - `/callback` - Callback URLs
     - `/notify` - Notification endpoints
   - Scans attributes: `href`, `src`, `data-url`, `data-webhook`

3. **IDs & Keys** (Purple - `#8b5cf6`)
   - Detects patterns:
     - `key_` prefix/suffix patterns
     - `sk_` - Secret key prefix (Stripe, etc.)
     - `pk_` - Public key prefix
     - `id-` prefix or `-id` suffix
     - `_token` suffix
     - `client_id`, `app_id` patterns
     - `api_key` patterns
   - Scans attributes: `data-id`, `data-key`, `id`, `data-client-id`, `data-app-id`, `data-api-key`

4. **Tokens** (Orange - `#f59e0b`)
   - Detects patterns:
     - `bearer ` - Bearer token prefix
     - `token-` prefix
     - `auth_token` - Auth token patterns
     - `access_token` - Access tokens
     - `refresh_token` - Refresh tokens
     - `jwt` - JWT tokens
   - Scans attributes: `data-token`, `data-auth`, `data-bearer`

5. **Form Inputs** (Yellow - `#eab308`)
   - Detects input elements:
     - `<input type="text">`
     - `<input type="password">`
     - `<input type="email">`
     - Inputs with `name` containing "key", "token", or "id"

### 🎯 User Interface

#### Overlay System
- **Semi-transparent backdrop** with blur effect
- **Non-intrusive** - doesn't block page interaction
- **Smooth animations** - fade in/out transitions
- **Responsive design** - adapts to any screen size

#### Control Panel
- **Top-positioned** floating panel
- **Search/Filter bar** - Type to filter elements
- **Live statistics** - Real-time count per element type
- **Close button** - Easy dismissal
- **Modern design** - Gradient theme with clean UI

#### Highlights
- **Color-coded borders** - Each type has unique color
- **Pulse animation** - Subtle breathing effect
- **Hover effects** - Scale up on hover
- **Smart positioning** - Updates on scroll/resize
- **Click to copy** - Instant clipboard copy

#### Tooltips
- **Contextual information** - Shows element type and value
- **Hover-triggered** - Appears near cursor
- **Truncated values** - Prevents overflow
- **Copy hint** - "Click to copy" instruction

### ⚡ Interactions

#### Activation Methods
1. **Keyboard shortcut**: `Cmd/Ctrl + Shift + F`
2. **Extension icon click**: Toggle from toolbar
3. **Popup button**: Activate via popup interface

#### Click Actions
- **Copy to clipboard** - Click any highlight
- **Visual feedback** - "Copied!" notification
- **Automatic dismissal** - Notification fades after 2s

#### Filter/Search
- **Real-time filtering** - Instant results
- **Multi-field search** - Searches both type and value
- **Case-insensitive** - Flexible matching
- **Statistics update** - Counts reflect filtered results

#### Keyboard Controls
- **ESC key** - Close overlay
- **Keyboard shortcut** - Toggle on/off

### 🎨 Design Features

#### Color System
- **Consistent palette** - Purple/blue gradient theme
- **Accessible colors** - High contrast highlights
- **Semantic meaning** - Colors indicate element types
- **Visual hierarchy** - Important elements stand out

#### Animations
- **Fade in/out** - Smooth overlay transitions
- **Slide down** - Control panel entrance
- **Pulse effect** - Highlight breathing animation
- **Notification pop** - Copy feedback animation

#### Typography
- **System fonts** - Native look and feel
- **Monospace values** - Code/data displayed clearly
- **Readable sizes** - Optimized for scanning
- **Weight hierarchy** - Bold for emphasis

### 🔧 Technical Features

#### Performance
- **Lightweight** - No external dependencies
- **Fast scanning** - Efficient DOM traversal
- **Debounced updates** - Optimized scroll/resize
- **Memory efficient** - Cleanup on deactivation

#### Compatibility
- **Manifest V3** - Latest Chrome extension standard
- **Modern JavaScript** - ES6+ features
- **Cross-browser potential** - Chromium-based browsers
- **Responsive** - Works on all screen sizes

#### Privacy & Security
- **No tracking** - Zero data collection
- **No external calls** - Fully local operation
- **Minimal permissions** - Only essential access
- **XSS protection** - HTML escaping for safety

#### Code Quality
- **Clean architecture** - Modular structure
- **Well-commented** - Documented functions
- **No linter errors** - Clean code
- **Extensible** - Easy to add features

## Usage Statistics

### Element Limits
- **Text content scan**: Up to 200 characters
- **Total detection**: Unlimited elements
- **Filter display**: Shows all matching elements
- **Tooltip preview**: First 200 chars of value

### Scan Coverage
- **Attributes scanned**: 15+ data attributes
- **Pattern matching**: 30+ regex patterns
- **Element types**: 5 categories
- **DOM depth**: Full page traversal

## Browser Support

### Tested On
- ✅ Chrome 90+ (Recommended)
- ✅ Chrome 120+ (Latest)
- ✅ Edge (Chromium-based)
- ✅ Brave Browser

### Requirements
- Chrome 90+ (Manifest V3 support)
- JavaScript enabled
- Clipboard API support

## Limitations

### Current Limitations
1. **Static Detection**: Scans on activation only
   - *Workaround*: Toggle overlay to re-scan

2. **Shadow DOM**: Limited access to shadow DOM elements
   - *Note*: Will be addressed in future version

3. **iframes**: Cannot scan iframe content
   - *Note*: Security restriction

4. **Very Large Pages**: May slow on 1000+ elements
   - *Optimization*: Detection limited to visible viewport

### Known Issues
None currently reported.

## Accessibility

### Screen Reader Support
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support

### Visual Accessibility
- High contrast colors
- Scalable interface
- Clear visual indicators

## Performance Metrics

### Target Performance
- **Detection time**: < 500ms
- **Overlay render**: < 100ms
- **Memory usage**: < 50MB
- **No page slowdown**: Zero impact on load time

### Optimization Techniques
- Efficient selector queries
- Event delegation
- Debounced handlers
- Cleanup on deactivation

## Future Enhancements

See [ROADMAP.md](./ROADMAP.md) for planned features.

## Changelog

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Basic element detection
- ✅ Visual overlay system
- ✅ Click to copy functionality
- ✅ Search/filter capability
- ✅ Keyboard shortcuts
- ✅ Multiple activation methods
- ✅ Statistics display
- ✅ Tooltip system
- ✅ Color-coded highlights

---

**Last Updated**: 2025-11-04

