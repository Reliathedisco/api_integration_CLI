# Testing DevFinder Extension

## Manual Testing Checklist

### Installation Test
- [ ] Icons generated and placed in `icons/` folder
- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] Extension icon appears in toolbar (after pinning)

### Activation Tests
- [ ] Keyboard shortcut works (`Cmd/Ctrl + Shift + F`)
- [ ] Extension icon click toggles overlay
- [ ] Popup button activates overlay
- [ ] ESC key closes overlay

### Element Detection Tests

Test on https://stripe.com/docs/api:

#### API Endpoints (Blue highlights)
- [ ] Detects API URLs like `/v1/customers`
- [ ] Highlights endpoint links
- [ ] Shows correct tooltip on hover
- [ ] Copies value on click

#### Webhooks (Green highlights)
- [ ] Detects webhook URLs
- [ ] Highlights correctly

#### IDs & Keys (Purple highlights)
- [ ] Detects `pk_test_...` keys
- [ ] Detects `sk_test_...` keys
- [ ] Highlights data-id attributes
- [ ] Detects client_id, app_id patterns

#### Tokens (Orange highlights)
- [ ] Detects bearer tokens
- [ ] Detects auth headers

#### Form Inputs (Yellow highlights)
- [ ] Highlights relevant input fields
- [ ] Detects inputs with key/token/id names

### UI Tests

#### Control Panel
- [ ] Panel appears at top center
- [ ] Search bar filters elements correctly
- [ ] Statistics show correct counts
- [ ] Close button works

#### Highlights
- [ ] Elements highlighted with correct colors
- [ ] Highlights pulse animation works
- [ ] Highlights scale on hover
- [ ] Multiple element types show different colors

#### Tooltips
- [ ] Tooltip appears on hover
- [ ] Shows element type and value
- [ ] "Click to copy" hint visible
- [ ] Tooltip follows cursor

#### Copy Functionality
- [ ] Click copies to clipboard
- [ ] "Copied!" notification appears
- [ ] Notification fades out after 2 seconds
- [ ] Correct value is copied

### Filter/Search Tests
- [ ] Search for "api" shows only API elements
- [ ] Search for "webhook" shows only webhooks
- [ ] Search for "key" shows keys and related elements
- [ ] Clear search shows all elements again
- [ ] Statistics update with filter

### Edge Cases

#### Performance
- [ ] Works on pages with 100+ elements
- [ ] No lag when scrolling
- [ ] Overlay doesn't slow down page

#### Responsive
- [ ] Works on small screens (mobile view)
- [ ] Control panel adapts to screen size
- [ ] Highlights position correctly on zoom

#### Different Websites
Test on various sites:
- [ ] GitHub (https://github.com/)
- [ ] Stripe Docs (https://stripe.com/docs/api)
- [ ] Firebase Docs (https://firebase.google.com/docs)
- [ ] Local development site
- [ ] Simple HTML page

#### Error Handling
- [ ] Works on sites with no detectable elements
- [ ] Handles dynamic content (SPAs)
- [ ] Doesn't break on complex DOM structures
- [ ] Gracefully handles permission errors

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Chrome (version 90+)
- [ ] Edge (Chromium-based)
- [ ] Brave Browser

## Automated Testing Ideas (Future)

```javascript
// Example test structure for future implementation

describe('DevFinder Extension', () => {
  test('should detect API endpoints', () => {
    // Test API endpoint detection logic
  });

  test('should highlight elements with correct colors', () => {
    // Test color coding
  });

  test('should copy to clipboard on click', () => {
    // Test clipboard functionality
  });

  test('should filter elements based on search', () => {
    // Test search/filter logic
  });
});
```

## Test Results Template

```
Date: ___________
Tester: ___________
Chrome Version: ___________

✓ Passed: ____ / ____
✗ Failed: ____
⚠ Issues Found: ____

Notes:
______________________
______________________
______________________
```

## Known Limitations

1. **Dynamic Content**: May need page reload to detect elements added after initial load
2. **Shadow DOM**: Elements inside Shadow DOM might not be detected
3. **iframes**: Elements inside iframes are not scanned
4. **Very Large Pages**: Performance may degrade on pages with 1000+ elements

## Performance Benchmarks

Target metrics:
- **Detection time**: < 500ms for typical page
- **Overlay render**: < 100ms
- **Memory usage**: < 50MB
- **No impact** on page load time

## Bug Report Template

```
**Description**: 

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected**: 

**Actual**: 

**Environment**:
- Chrome Version: 
- OS: 
- Website: 

**Screenshots**: (if applicable)
```

