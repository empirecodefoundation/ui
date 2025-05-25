# Button Component

A versatile and reusable button component with various styles, sizes, and states.

## Features

- Multiple variants (primary, secondary, outline, ghost, link)
- Different sizes (sm, md, lg)
- Loading state with spinner
- Icon support (before and after text)
- Full width option
- Disabled state
- Accessible by default
- TypeScript support
- Customizable via className

## Usage

```tsx
import { Button } from '@empireui/components';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="md">
  Click me
</Button>

// With loading state
<Button loading>Loading...</Button>

// With icon
<Button icon={<IconComponent />}>With Icon</Button>

// With icon after text
<Button iconAfter={<IconComponent />}>With Icon After</Button>

// Full width
<Button fullWidth>Full Width Button</Button>

// Disabled state
<Button disabled>Disabled Button</Button>
```

## Props

| Prop      | Type                                                       | Default   | Description                               |
| --------- | ---------------------------------------------------------- | --------- | ----------------------------------------- |
| variant   | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' | 'primary' | Visual style of the button                |
| size      | 'sm' \| 'md' \| 'lg'                                       | 'md'      | Size of the button                        |
| icon      | React.ReactNode                                            | undefined | Icon to display before the text           |
| iconAfter | React.ReactNode                                            | undefined | Icon to display after the text            |
| loading   | boolean                                                    | false     | Shows loading spinner and disables button |
| fullWidth | boolean                                                    | false     | Makes button take full width of container |
| disabled  | boolean                                                    | false     | Disables the button                       |
| className | string                                                     | undefined | Additional CSS classes                    |
| ...props  | HTMLButtonElement                                          | -         | All standard button props                 |

## Accessibility

- Uses semantic button element
- Proper ARIA attributes for loading state
- Keyboard navigation support
- Focus styles for better visibility
- Disabled state properly handled

## Styling

The button uses Tailwind CSS for styling and can be customized using:

1. Variant prop for different styles
2. Size prop for different sizes
3. className prop for custom styles
4. CSS variables for theme customization

## Best Practices

1. Always provide meaningful text content
2. Use appropriate variant for the context
3. Consider loading state for async actions
4. Use icons to enhance visual hierarchy
5. Maintain consistent sizing across your UI
6. Test keyboard navigation
7. Ensure sufficient color contrast
