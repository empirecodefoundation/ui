# 🏹 Animated Arrow Components

A collection of arrow components with the primary one being a stable diagonal arrow that changes to horizontal on hover.

## ✨ Features

- **Stable with Hover Animation**: Arrow points diagonally by default, changes to horizontal on hover
- **Customizable**: Size, color, stroke width, and CSS classes
- **Framer Motion**: Smooth, performant animations
- **TypeScript**: Full type safety
- **Responsive**: Works on all screen sizes

## 🚀 Quick Start

```tsx
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

<button className="explore-button">
  EXPLORE SEGMENTS
  <AnimatedArrowDynamic 
    size={18} 
    color="black" 
    className="animated-arrow" 
  />
</button>
```

## 📦 Available Components

### 1. AnimatedArrowDynamic (Recommended)
Stable arrow with direction change on hover:
- Points diagonally up-right by default
- Rotates to point right (horizontal) on hover
- Smooth rotation transition
- Best for interactive buttons

### 2. AnimatedArrow (Legacy)
Simple continuous movement animation:
- Smooth diagonal movement
- Path drawing animation on mount
- Good for subtle effects

### 3. AnimatedArrowPulse (Legacy)
Pulsing scale animation:
- Scale and opacity effects
- Rhythmic pulsing motion
- Good for attention-grabbing CTAs

## 🎨 Props

All components accept the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Custom CSS classes |
| `size` | `number` | `20` | Arrow size in pixels |
| `color` | `string` | `"currentColor"` | Arrow color |
| `strokeWidth` | `number` | `2` | Line thickness |

## 💡 Usage Examples

### Basic Usage
```tsx
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

<AnimatedArrowDynamic size={24} color="white" strokeWidth={2.5} />
```

### In Explore Button
```tsx
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

<a href="#" className="explore-button">
  EXPLORE SEGMENTS
  <AnimatedArrowDynamic 
    size={18} 
    color="black" 
    strokeWidth={2.5}
    className="animated-arrow"
  />
</a>
```

### In Primary Button
```tsx
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';

<a href="#" className="button-primary">
  GET STARTED
  <AnimatedArrowDynamic 
    size={14} 
    color="white" 
    strokeWidth={2}
    className="animated-arrow"
  />
</a>
```

## 🎯 CSS Integration

The arrows work seamlessly with your existing button styles:

### Explore Button
```css
.explore-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.explore-button:hover .animated-arrow {
  transform: translateX(4px);
}
```

### Primary Button
```css
.button-primary {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.button-primary:hover .animated-arrow {
  transform: translateX(4px);
}
```

## 🎨 Animation Details

### AnimatedArrowDynamic (Recommended)
- **Default State**: Points diagonally up-right (-45 degrees)
- **Hover State**: Rotates to point right (0 degrees)
- **Transition**: 0.3s ease-out
- **Additional CSS**: Optional translateX on hover

## 🔧 Customization

### Custom Colors
```tsx
<AnimatedArrowDynamic color="#ff6b6b" />  // Red
<AnimatedArrowDynamic color="currentColor" />  // Inherit
<AnimatedArrowDynamic color="rgb(59, 130, 246)" />  // Blue
```

### Custom Sizes
```tsx
<AnimatedArrowDynamic size={12} />  // Small
<AnimatedArrowDynamic size={20} />  // Default
<AnimatedArrowDynamic size={32} />  // Large
```

### Custom Animation
Override with custom className:
```css
.my-custom-arrow {
  transition: transform 0.5s ease;
}

.my-custom-arrow:hover {
  transform: rotate(45deg) scale(1.2);
}
```

## 🏗️ Implementation

The arrows are built with:
- **SVG**: Scalable vector graphics
- **Framer Motion**: React animation library
- **TypeScript**: Type-safe props
- **CSS Classes**: Utility-first approach

## 📱 Responsive Design

The arrows automatically scale with their container and work on all devices:
- Mobile: Touch-friendly sizes
- Tablet: Medium scale
- Desktop: Full interactions

## 🎪 Live Examples

See the `StableArrowExample.tsx` file for a complete showcase of the stable arrow with hover direction change.

## 🤝 Contributing

Feel free to contribute additional arrow variants:
- Different direction changes
- Different starting positions
- Color transition effects
- Path morphing animations 