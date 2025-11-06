# Quick Installation Guide for DevFinder

## Step 1: Generate Icons

1. Open `generate-icons.html` in your web browser (just double-click the file)
2. Icons will auto-generate when the page loads
3. Click the "Download" button under each icon (16x16, 48x48, 128x128)
4. Move all three downloaded PNG files into the `icons/` folder

**Or use this quick command (if you have ImageMagick):**

```bash
convert -size 16x16 -gravity center -background "#667eea" -fill white -pointsize 12 label:"🔍" icons/icon16.png
convert -size 48x48 -gravity center -background "#667eea" -fill white -pointsize 36 label:"🔍" icons/icon48.png
convert -size 128x128 -gravity center -background "#667eea" -fill white -pointsize 96 label:"🔍" icons/icon128.png
```

## Step 2: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. Select the `wherethefisit` folder
5. DevFinder should now appear in your extensions list!

## Step 3: Pin to Toolbar (Optional)

1. Click the puzzle piece icon 🧩 in Chrome toolbar
2. Find "DevFinder - Visual Element Locator"
3. Click the pin icon 📌 to keep it visible

## Step 4: Test It Out

1. Navigate to any website (try https://stripe.com/docs/api)
2. Press `Cmd+Shift+F` (Mac) or `Ctrl+Shift+F` (Windows/Linux)
3. Or click the DevFinder extension icon
4. The overlay should appear with highlighted elements!

## Troubleshooting

**Icons not loading?**
- Make sure all three icon files are in the `icons/` folder
- Icon filenames must be exactly: `icon16.png`, `icon48.png`, `icon128.png`

**Extension not appearing?**
- Check for errors in `chrome://extensions/` under DevFinder
- Click the "Errors" button if present to see details
- Reload the extension using the refresh icon

**Overlay not showing?**
- Refresh the webpage you're testing on
- Check browser console (F12) for DevFinder messages
- Try on a different website

## Quick Test Sites

Try DevFinder on these developer-friendly sites:
- https://stripe.com/docs/api
- https://docs.github.com/en/rest
- https://firebase.google.com/docs
- https://developer.mozilla.org/en-US/

Enjoy! 🚀

