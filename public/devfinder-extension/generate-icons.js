#!/usr/bin/env node

/**
 * Icon Generator for DevFinder Extension
 * 
 * This script generates the required icon files for the Chrome extension.
 * Requires Node.js and the 'canvas' package.
 * 
 * Installation:
 *   npm install canvas
 * 
 * Usage:
 *   node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Check if canvas is available
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.error('❌ Error: canvas package not found!');
  console.error('📦 Install it with: npm install canvas');
  console.error('');
  console.error('Alternative: Open generate-icons.html in your browser instead.');
  process.exit(1);
}

const { createCanvas } = Canvas;

// Icon sizes to generate
const SIZES = [16, 48, 128];

// Ensure icons directory exists
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
  console.log('✓ Created icons/ directory');
}

/**
 * Draw a magnifying glass icon on canvas
 */
function drawIcon(ctx, size) {
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  
  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Draw magnifying glass
  const centerX = size / 2;
  const centerY = size / 2.2;
  const radius = size / 4;
  const handleLength = size / 3.5;
  
  // Glass circle
  ctx.strokeStyle = 'white';
  ctx.lineWidth = size / 12;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Handle
  const handleStartX = centerX + radius * 0.7;
  const handleStartY = centerY + radius * 0.7;
  const handleEndX = handleStartX + handleLength * 0.7;
  const handleEndY = handleStartY + handleLength * 0.7;
  
  ctx.lineWidth = size / 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(handleStartX, handleStartY);
  ctx.lineTo(handleEndX, handleEndY);
  ctx.stroke();
}

/**
 * Generate icon file
 */
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  drawIcon(ctx, size);
  
  const filename = `icon${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);
  
  console.log(`✓ Generated ${filename} (${size}x${size})`);
}

// Generate all icons
console.log('🎨 Generating DevFinder icons...\n');

SIZES.forEach(size => {
  try {
    generateIcon(size);
  } catch (error) {
    console.error(`❌ Error generating ${size}x${size} icon:`, error.message);
  }
});

console.log('\n✅ All icons generated successfully!');
console.log('📁 Icons saved to:', iconsDir);
console.log('\n🚀 Next steps:');
console.log('   1. Load extension in Chrome (chrome://extensions/)');
console.log('   2. Enable Developer mode');
console.log('   3. Click "Load unpacked" and select this folder');

