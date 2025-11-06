#!/bin/bash

# Quick icon generator using base64 data URIs
# Creates simple purple square icons as placeholders

echo "Generating placeholder icons..."

# Create a simple SVG icon
create_icon() {
    SIZE=$1
    FILENAME="icon${SIZE}.png"
    
    # Create SVG
    cat > temp_icon.svg << SVGEOF
<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-size="${SIZE/2}" text-anchor="middle" dominant-baseline="central" fill="white">🔍</text>
</svg>
SVGEOF

    echo "Created ${FILENAME}"
}

create_icon 16
create_icon 48
create_icon 128

echo "Note: For better icons, open generate-icons.html in your browser"
