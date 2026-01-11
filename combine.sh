#!/bin/bash

# Output directories
logos_out="./combined_out/logos"
banners_out="./combined_out/banners"

# Combine logos
echo "Combining logos..."
mkdir -p "$logos_out"

# Custom Aircraft (Highest Priority)
echo "Adding custom_aircraft logos..."
for d in ./custom_aircraft/*; do
    if [ -d "$d/logos" ]; then
        cp -rn "$d/logos/"* "$logos_out/" 2>/dev/null
    fi
done

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

# Custom Aircraft banners (Highest Priority)
echo "Adding custom_aircraft banners..."
for d in ./custom_aircraft/*; do
    if [ -d "$d/banners" ]; then
        cp -rn "$d/banners/"* "$banners_out/" 2>/dev/null
    fi
done

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
