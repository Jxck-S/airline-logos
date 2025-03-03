#!/bin/bash

# Directories for logos and banners
logos_dir="./logos"
banners_dir="./banners"

# Combine logos
echo "Combining logos..."
mkdir -p "$logos_dir/combined_logos"  # Create a folder to store the combined logos

# Custom logos first
echo "Adding custom_logos..."
cp -rn ./custom_logos/* "$logos_dir/combined_logos/"

# Flightaware logos next
echo "Adding flightaware_logos..."
cp -rn ./flightaware_logos/* "$logos_dir/combined_logos/"

# Radarbox logos last
echo "Adding radarbox_logos..."
cp -rn ./radarbox_logos/* "$logos_dir/combined_logos/"

# Combine banners
echo "Combining banners..."
mkdir -p "$banners_dir/combined_banners"  # Create a folder to store the combined banners

# Custom banners first
echo "Adding custom_banners..."
cp -rn ./custom_banners/* "$banners_dir/combined_banners/"

# Avcodes banners next
echo "Adding avcodes_banners..."
cp -rn ./avcodes_banners/* "$banners_dir/combined_banners/"

# Fr24 banners next
echo "Adding fr24_banners..."
cp -rn ./fr24_banners/* "$banners_dir/combined_banners/"

# Radarbox banners last
echo "Adding radarbox_banners..."
cp -rn ./radarbox_banners/* "$banners_dir/combined_banners/"

# Finished
echo "Combining process complete. Logos are in '$logos_dir/combined_logos' and banners are in '$banners_dir/combined_banners'."
