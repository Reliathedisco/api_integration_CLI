#!/usr/bin/env python3
"""
Simple icon generator for DevFinder Chrome Extension
Creates basic placeholder icons without external dependencies
"""

import struct
import zlib

def create_png(width, height, color_rgb):
    """
    Create a simple solid color PNG file without PIL
    color_rgb: tuple of (r, g, b) values 0-255
    """
    
    def png_chunk(chunk_type, data):
        """Create a PNG chunk with CRC"""
        chunk_data = chunk_type + data
        crc = zlib.crc32(chunk_data) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk_data + struct.pack('>I', crc)
    
    # PNG signature
    png_signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk (image header)
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_chunk = png_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk (image data) - solid color
    r, g, b = color_rgb
    scanline = bytes([0]) + bytes([r, g, b] * width)  # 0 = no filter
    raw_data = scanline * height
    compressed_data = zlib.compress(raw_data, 9)
    idat_chunk = png_chunk(b'IDAT', compressed_data)
    
    # IEND chunk (end of file)
    iend_chunk = png_chunk(b'IEND', b'')
    
    return png_signature + ihdr_chunk + idat_chunk + iend_chunk


def create_gradient_icon(width, height):
    """
    Create a gradient icon (simplified - creates purple square)
    """
    # Use the primary purple color from the gradient
    purple = (102, 126, 234)  # #667eea
    return create_png(width, height, purple)


def main():
    """Generate all required icon sizes"""
    import os
    
    # Ensure icons directory exists
    icons_dir = 'icons'
    if not os.path.exists(icons_dir):
        os.makedirs(icons_dir)
        print(f'✓ Created {icons_dir}/ directory')
    
    sizes = [16, 48, 128]
    
    print('🎨 Generating DevFinder icons...\n')
    
    for size in sizes:
        filename = f'{icons_dir}/icon{size}.png'
        
        # Create gradient-colored square
        png_data = create_gradient_icon(size, size)
        
        with open(filename, 'wb') as f:
            f.write(png_data)
        
        print(f'✓ Generated icon{size}.png ({size}x{size})')
    
    print('\n✅ All icons generated successfully!')
    print(f'📁 Icons saved to: {os.path.abspath(icons_dir)}')
    print('\n📝 Note: These are simple placeholder icons.')
    print('   For better icons with the magnifying glass design:')
    print('   1. Open generate-icons.html in your browser, OR')
    print('   2. Run: npm install canvas && node generate-icons.js')
    print('\n🚀 Next step: Load extension in Chrome (chrome://extensions/)')


if __name__ == '__main__':
    main()

