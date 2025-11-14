# 🎬 Recording Guide for Product Hunt Demo

Quick guide to record your Product Hunt demo without special tools (using macOS built-in features).

## 🎥 Method 1: macOS Built-in Screen Recording (Recommended)

### Step 1: Prepare Your Terminal

1. **Open Terminal or iTerm2**
2. **Set up for best visuals:**
   ```bash
   # Make text bigger for recording
   Cmd + "+" to increase font size (aim for 16-18pt)
   
   # Full screen or large window
   Cmd + Enter (full screen) or resize window to ~1200x700
   ```

3. **Clean terminal:**
   ```bash
   clear
   ```

### Step 2: Record with Built-in Tool

1. Press `Cmd + Shift + 5`
2. Click "Record Selected Portion" (middle icon)
3. Select your terminal window area
4. Click "Record" button
5. Run your demo script:
   ```bash
   ./demo-script.sh
   ```
6. Click stop icon in menu bar when done
7. Video saves to Desktop automatically

### Step 3: Convert to GIF (for Product Hunt)

**Online Conversion (easiest):**
1. Go to https://cloudconvert.com/mov-to-gif
2. Upload your .mov file
3. Settings:
   - Frame rate: 15-20 FPS
   - Width: 1200px
   - Quality: Good
4. Download GIF

**Or use EZGIF:**
1. Go to https://ezgif.com/video-to-gif
2. Upload video
3. Set frame rate to 10-15
4. Convert and download

## 🎥 Method 2: QuickTime Player

1. Open QuickTime Player
2. File > New Screen Recording
3. Click arrow next to record button
4. Select built-in microphone (optional - for voiceover)
5. Click anywhere to record full screen, or drag to select area
6. Run demo script
7. Click stop in menu bar
8. File > Export > 1080p
9. Convert to GIF using method above

## 📸 Taking Great Screenshots

### Terminal Setup
```bash
# 1. Make terminal look professional
# Recommended settings:
# - Font: SF Mono, Monaco, or JetBrains Mono
# - Size: 14-16pt
# - Theme: Something with good contrast (avoid pure black)
# - Window: ~100 columns x 30 rows

# 2. Clear any clutter
clear

# 3. Run command
npx @api-integrations/cli list
```

### Capture Screenshot
1. Press `Cmd + Shift + 4`
2. Press `Spacebar` to switch to window mode
3. Click on terminal window
4. Screenshot saves to Desktop

### Annotate (Optional)
1. Open screenshot in Preview
2. Click markup toolbar icon
3. Add arrows, highlights, text
4. Save

## 🎨 Product Hunt Gallery Images

You need 6 images at **1270x760px** (or similar high resolution)

### Image 1: Hero Image
Create a simple graphic with:
- Your tool name
- Tagline
- Main command in a terminal-style box
- Use Canva, Figma, or Keynote

### Images 2-3: Terminal Screenshots  
- Screenshot of `demo-script.sh` output
- Screenshot showing actual CLI command and output
- Crop and resize to 1270x760

### Image 4: Code Preview
- Open generated files in VS Code
- Use "Polacode" extension or take screenshot
- Show TypeScript code with syntax highlighting

### Image 5: Features Grid
- List key features with checkmarks
- Create in Canva or Keynote
- Use your brand colors

### Image 6: Integration Logos
- Show all 6 integration logos in a grid
- Stripe, Clerk, Resend, Liveblocks, Supabase, OpenAI
- Download official logos from their brand kits

## 🎬 Demo Video Script (30-60 seconds)

**Opening (5s):**
- Show terminal with project directory
- Text overlay: "Setting up API integrations takes hours"

**Problem (5s):**
- Quick cuts of:
  - Opening documentation pages
  - Complex code
  - Error messages
- Text: "Until now."

**Solution (30s):**
- Run: `npx @api-integrations/cli list`
- Show available integrations
- Run: `npx @api-integrations/cli add stripe`
- Show files being created
- Quick preview of generated code
- Text: "Production-ready. Fully typed. Battle-tested."

**Closing (10s):**
- Show your website/GitHub
- Text: "Free & Open Source"
- CTA: "Try it now"

## 🎯 Quick Recording Checklist

Before you hit record:
- [ ] Terminal font is large enough (16-18pt)
- [ ] Window is properly sized (1200x700 minimum)
- [ ] Background apps are closed (clean)
- [ ] Desktop is organized (if recording desktop)
- [ ] Demo script is executable (`chmod +x demo-script.sh`)
- [ ] You've tested the demo once
- [ ] Notifications are silenced (Do Not Disturb mode)
- [ ] Battery is charged (or plugged in)

## 🚀 Quick Start - Record Now!

```bash
# 1. Make sure everything is ready
cd "/Users/shirrelziv/API Integration Boilerplate Tool"
chmod +x demo-script.sh

# 2. Test the demo
./demo-script.sh

# 3. Clear terminal
clear

# 4. Press Cmd + Shift + 5 and record
# 5. Run: ./demo-script.sh
# 6. Stop recording
# 7. Convert to GIF using cloudconvert.com
```

## 💡 Pro Tips

1. **Keep it short** - 30-60 seconds max for GIF
2. **Show value quickly** - Get to the "wow" moment fast
3. **Use good lighting** - If recording yourself
4. **Test first** - Always do a practice run
5. **Edit ruthlessly** - Cut anything that doesn't add value
6. **Add captions** - Many watch without sound
7. **End with CTA** - Tell people what to do next

## 🛠️ Alternative Tools (if you want to get fancy)

### Free Tools:
- **OBS Studio** - Free, powerful screen recorder
- **Loom** - Free tier, easy sharing
- **Kap** - Lightweight GIF recorder (may need permissions)

### Paid Tools:
- **ScreenFlow** - Professional screen recording ($169)
- **Camtasia** - Full editing suite ($299)
- **CleanShot X** - Screenshot + recording ($29)

But honestly, **macOS built-in tools are perfect** for Product Hunt demos!

## ✅ You're Ready!

You now have everything you need to create an amazing Product Hunt demo. Just:
1. Run the demo script
2. Record it
3. Convert to GIF
4. Upload to Product Hunt

Good luck! 🎉





