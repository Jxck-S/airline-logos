#!/bin/bash

# Output directories
logos_out="./out/combined/logos"
banners_out="./out/combined/banners"
custom_out="./out/custom"
custom_logos_out="$custom_out/logos"
custom_banners_out="$custom_out/banners"

# Combine logos
echo "Combining logos..."
mkdir -p "$logos_out"
mkdir -p "$custom_logos_out"

# Custom Aircraft (Separate Output)
echo "Adding custom_aircraft logos to custom_out..."
if [ -d "./custom_aircraft/logos" ]; then
    cp -rn ./custom_aircraft/logos/* "$custom_logos_out/"
fi

# Custom logos first
echo "Adding custom_logos..."
cp -rn ./custom_logos/* "$logos_out/"

# Flightaware logos next
echo "Adding flightaware_logos..."
cp -rn ./flightaware_logos/* "$logos_out/"

# Radarbox logos last
echo "Adding radarbox_logos..."
cp -rn ./radarbox_logos/* "$logos_out/"

# Combine banners
echo "Combining banners..."
mkdir -p "$banners_out"
mkdir -p "$custom_banners_out"

# Custom Aircraft banners (Separate Output)
echo "Adding custom_aircraft banners to custom_out..."
if [ -d "./custom_aircraft/banners" ]; then
    cp -rn ./custom_aircraft/banners/* "$custom_banners_out/"
fi

# Copy index.json to custom_out
echo "Copying index.json to custom_out..."
cp ./custom_aircraft/index.json "$custom_out/index.json"

# Custom banners first
echo "Adding custom_banners..."
cp -rn ./custom_banners/* "$banners_out/"

# Avcodes banners next
echo "Adding avcodes_banners..."
cp -rn ./avcodes_banners/* "$banners_out/"

# Fr24 banners next
echo "Adding fr24_banners..."
cp -rn ./fr24_banners/* "$banners_out/"

# Radarbox banners last
echo "Adding radarbox_banners..."
cp -rn ./radarbox_banners/* "$banners_out/"

# Finished
echo "Combining process complete."
echo "Logos:   $logos_out"
echo "Banners: $banners_out"
echo "Custom:  $custom_out"
