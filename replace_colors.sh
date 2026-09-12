#!/bin/bash
# Find all TSX files
find src -name "*.tsx" -type f | while read file; do
  # Replace dark purples with text-main/muted
  sed -i 's/text-\[#4A3E3D\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#4A3E3D\]\/[0-9]*/text-[var(--text-muted)]/g' "$file"
  
  sed -i 's/text-\[#6D28D9\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#5B21B6\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#7C3AED\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#4C1D95\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#7E22CE\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#6B21A8\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#8B5CF6\]/text-[var(--text-main)]/g' "$file"
  
  # Replace backgrounds with our variables
  sed -i 's/bg-\[#F3EEFD\]/bg-[var(--grad-end)]/g' "$file"
  sed -i 's/bg-\[#EDE9FE\]/bg-[var(--grad-end)]/g' "$file"
  sed -i 's/bg-\[#FAF5FF\]/bg-white\/60/g' "$file"
  sed -i 's/bg-\[#FAF7FF\]/bg-[var(--grad-end)]/g' "$file"
  sed -i 's/bg-\[#F3E8FF\]/bg-[var(--accent)]/g' "$file"
  sed -i 's/bg-\[#E9D5FF\]/bg-[var(--dominant)]/g' "$file"
  sed -i 's/bg-\[#D8B4E5\]/bg-[var(--grad-start)]/g' "$file"
  sed -i 's/bg-\[#C084FC\]/bg-[var(--dominant)]/g' "$file"
  sed -i 's/bg-\[#8B5CF6\]/bg-[var(--dominant)]/g' "$file"
  
  # Gradients
  sed -i 's/from-\[#8B5CF6\]/from-[var(--dominant)]/g' "$file"
  sed -i 's/to-\[#A594F9\]/to-[var(--grad-start)]/g' "$file"
  sed -i 's/via-\[#A594F9\]/via-[var(--dominant)]/g' "$file"
  sed -i 's/via-\[#C4B5FD\]/via-[var(--accent)]/g' "$file"
  sed -i 's/to-\[#C4B5FD\]/to-[var(--accent)]/g' "$file"
  sed -i 's/from-\[#E9D5FF\]/from-[var(--grad-start)]/g' "$file"
  sed -i 's/to-\[#D8B4E5\]/to-[var(--accent)]/g' "$file"
  sed -i 's/from-\[#D8B4E5\]/from-[var(--accent)]/g' "$file"
  sed -i 's/to-\[#C084FC\]/to-[var(--dominant)]/g' "$file"
  sed -i 's/to-\[#E9D5FF\]/to-[var(--grad-start)]/g' "$file"
  sed -i 's/to-\[#F3E8FF\]/to-white/g' "$file"
  
  # Borders
  sed -i 's/border-\[#D8B4FE\]/border-[var(--dominant)]/g' "$file"
  sed -i 's/border-\[#C4B5FD\]/border-[var(--dominant)]/g' "$file"
  sed -i 's/border-\[#DDD6FE\]/border-[var(--dominant)]/g' "$file"
  sed -i 's/border-\[#E9D5FF\]/border-[var(--dominant)]/g' "$file"
  sed -i 's/border-\[#D8B4E5\]/border-[var(--dominant)]/g' "$file"
  
  # Icons / text color
  sed -i 's/text-\[#A594F9\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#E8A0BF\]/text-[var(--text-main)]/g' "$file"
  sed -i 's/text-\[#C084FC\]/text-[var(--text-main)]/g' "$file"
  
  # Shadows
  sed -i 's/shadow-\[#C084FC\]/shadow-[var(--dominant)]/g' "$file"
  sed -i 's/shadow-\[#A594F9\]/shadow-[var(--dominant)]/g' "$file"
  sed -i 's/shadow-\[#8B5CF6\]/shadow-[var(--dominant)]/g' "$file"
  
  # Some extra text colors
  sed -i 's/text-white/text-[var(--text-main)]/g' "$file"
  
done
