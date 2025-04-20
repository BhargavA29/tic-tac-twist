#!/bin/bash

# Create icons from the SVG file
# Note: This requires ImageMagick to be installed

# Create icon-192x192.png
convert -background none ../public/icon.svg -resize 192x192 ../public/icon-192x192.png

# Create icon-512x512.png
convert -background none ../public/icon.svg -resize 512x512 ../public/icon-512x512.png

# Create favicon.ico
convert -background none ../public/icon.svg -resize 64x64 ../public/favicon.ico

echo "Icons generated successfully!" 