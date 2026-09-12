#!/bin/bash
find src/components -name "*.tsx" -not -name "CuteBabySnake.tsx" -not -name "CuteSnakeMascot.tsx" -type f | while read file; do
  
  # Purples to dominant
  sed -i 's/#8B5CF6/var(--dominant)/g' "$file"
  sed -i 's/#A594F9/var(--dominant)/g' "$file"
  sed -i 's/#C8B6E2/var(--dominant)/g' "$file"
  sed -i 's/#C4B5FD/var(--dominant)/g' "$file"
  sed -i 's/#DDD6FE/var(--dominant)/g' "$file"
  
  # Light backgrounds to grad-end or grad-start
  sed -i 's/#F7F3FD/var(--grad-end)/g' "$file"
  sed -i 's/#FAF7F2/var(--grad-end)/g' "$file"
  sed -i 's/#F8F6F4/var(--grad-end)/g' "$file"
  sed -i 's/#EDE9FE/var(--grad-start)/g' "$file"
  sed -i 's/#F3EEFD/var(--grad-start)/g' "$file"
  sed -i 's/#FAF5FF/var(--grad-end)/g' "$file"
  
  # Pinks to accent
  sed -i 's/#E8A0BF/var(--accent)/g' "$file"
  sed -i 's/#F5D5E0/var(--accent)/g' "$file"
  
  # Dark text
  sed -i 's/#4A3E3D/var(--text-main)/g' "$file"
  sed -i 's/#7A3E5D/var(--text-main)/g' "$file"
  sed -i 's/#6D28D9/var(--text-main)/g' "$file"
  
done
