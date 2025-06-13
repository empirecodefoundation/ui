# Features Section Component

A dynamic features showcase component with scroll-triggered zoom effects and industrial design aesthetic.

## Features

- **Scroll-triggered zoom effects**: Background image zooms out as the section comes into view
- **Industrial design**: Dark theme with 50px border radius container
- **Responsive layout**: Two-column layout that adapts to different screen sizes
- **Interactive buttons**: Includes both standard and outline button variants
- **Smooth animations**: CSS transitions for smooth scroll effects

## Usage

```tsx
import { FeaturesSection } from '@/components/common/features-section';

export default function Page() {
  return (
    <div>
      <FeaturesSection />
    </div>
  );
}
```

## Component Structure

The component consists of several key sections:

### 1. Background Image with Scroll Effect
- Uses the `img4.png` image as background
- Starts zoomed in (scale 1.5) and zooms out to normal size as user scrolls
- Opacity increases from 30% to 90% during scroll

### 2. Left Content Section
- **Header**: Large "Features" title with subtitle
- **Description**: Detailed text about Empire UI components
- **Action buttons**: "WATCH DEMO" (outline) and "GET UPDATES" (filled)

### 3. Right Content Section
- **Feature List**: Four key features with icons:
  - ULTRA-FAST ADDITIONS ⚡
  - LONG-LASTING UI UPDATES 🔋
  - REGULAR UPDATED UI COMPONENTS 🔒
  - SEAMLESS CONNECTIVITY 🌐

## Scroll Effect Implementation

The component uses a custom hook that:
1. Tracks scroll position relative to the section
2. Calculates progress from 0 to 1
3. Updates image scale and opacity based on progress

```tsx
const imageScale = 1.5 + (1 - scrollProgress) * 0.8;
const imageOpacity = 0.3 + scrollProgress * 0.6;
```

## Button Variants

### Standard Button
```tsx
<a href="#" className={cn("explore-button", MinecartLCD.className)}>
  GET UPDATES
  <span className="flex-grow"></span>
  <AnimatedArrowDynamic size={22} color="black" />
</a>
```

### Outline Button
```tsx
<a href="#" className={cn("explore-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-black", MinecartLCD.className)}>
  WATCH DEMO
  <span className="flex-grow"></span>
  <AnimatedArrowDynamic size={22} color="currentColor" />
</a>
```

## Styling

The component uses:
- **Font**: MinecartLCD for industrial aesthetic
- **Colors**: Black/dark theme with white text
- **Border radius**: 50px for modern rounded corners
- **Backdrop blur**: For glass-morphism effect
- **Responsive padding**: Adjusts on different screen sizes

## Accessibility

- Semantic HTML structure
- Proper contrast ratios
- Keyboard navigation support
- Screen reader friendly text

## Performance

- Uses `next/image` for optimized image loading
- CSS transforms for smooth animations
- Event listener cleanup to prevent memory leaks
- Efficient scroll calculation

## Dependencies

- React 18+
- Next.js
- Framer Motion (for AnimatedArrow)
- Tailwind CSS
- MinecartLCD font

## Example Page

See the full implementation at `/examples/features` or use the `FeaturesSectionExample` component for testing. 