# Button

A versatile button component that supports various styles, sizes, and states.

## Features

- Multiple variants (primary, secondary, outline, ghost, link)
- Different sizes (sm, md, lg, icon)
- Loading state with spinner
- Left and right icons
- Full width option
- Fully accessible
- Customizable with Tailwind CSS

## Usage

```tsx
import { Button } from '@empire-ui/core';

// Basic usage
<Button>Click me</Button>

// With variant
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

// With size
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon">Icon Button</Button>

// With loading state
<Button isLoading>Loading...</Button>

// With icons
<Button leftIcon={<Icon />}>Left Icon</Button>
<Button rightIcon={<Icon />}>Right Icon</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Custom className
<Button className="custom-class">Custom Button</Button>
```

## Props

| Prop      | Type                                                       | Default   | Description                                      |
| --------- | ---------------------------------------------------------- | --------- | ------------------------------------------------ |
| variant   | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' | 'primary' | The visual style of the button                   |
| size      | 'sm' \| 'md' \| 'lg' \| 'icon'                             | 'md'      | The size of the button                           |
| isLoading | boolean                                                    | false     | Whether the button is in a loading state         |
| leftIcon  | ReactNode                                                  | undefined | Icon to display on the left side                 |
| rightIcon | ReactNode                                                  | undefined | Icon to display on the right side                |
| fullWidth | boolean                                                    | false     | Whether the button should take up the full width |
| className | string                                                     | undefined | Additional CSS classes to apply                  |
| ...props  | ButtonHTMLAttributes                                       | -         | All standard button HTML attributes              |

## Accessibility

- Uses semantic HTML button element
- Supports keyboard navigation
- Includes focus styles
- Disabled state is properly handled
- Loading state is communicated to screen readers

## Styling

The button uses Tailwind CSS for styling and can be customized using the following classes:

- Base: `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors`
- Focus: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Disabled: `disabled:opacity-50 disabled:pointer-events-none`
- Variants: See the `buttonVariants` object in the component code
- Sizes: See the `buttonVariants` object in the component code

## Best Practices

1. Use appropriate variants for different actions:

   - Primary: Main actions
   - Secondary: Alternative actions
   - Outline: Less prominent actions
   - Ghost: Subtle actions
   - Link: Navigation actions

2. Choose appropriate sizes:

   - sm: Compact spaces
   - md: Default size
   - lg: Prominent actions
   - icon: Icon-only buttons

3. Use loading state for async actions

4. Include icons for better visual hierarchy

5. Use fullWidth sparingly, typically for mobile views
