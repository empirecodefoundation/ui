# 🎯 3D Lanyard Component

An interactive, physics-based 3D lanyard component built with React Three Fiber and Rapier physics engine.

## ✨ Features

- **Physics Simulation**: Realistic rope physics using Rapier
- **Interactive**: Drag and drop the card with mouse/touch
- **Responsive**: Automatically adjusts to screen size
- **Customizable**: Easy to customize textures, models, and physics
- **TypeScript**: Full TypeScript support

## 🚀 Quick Start

```tsx
import Lanyard from './components/3d/Lanyard'

<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
```

## 📦 Prerequisites

Make sure you have these dependencies installed:

```json
{
  "@react-three/fiber": "^9.1.2",
  "@react-three/drei": "^10.1.2",
  "@react-three/rapier": "^2.1.0",
  "meshline": "^3.3.1",
  "three": "^0.177.0"
}
```

## 🛠️ Setup Instructions

### 1. TypeScript Configuration

Create `src/global.d.ts`:
```typescript
export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
```

### 2. Next.js Configuration

Update `next.config.mjs`:
```javascript
webpack: (config) => {
  config.module.rules.push({
    test: /\.(glb|gltf)$/,
    type: 'asset/resource',
  });
  return config;
},
```

### 3. Assets Setup

Place these files in `public/assets/lanyard/`:
- `card.glb` - 3D model of the card
- `lanyard.png` - Texture for the rope/band

## 🎨 Customization

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `[number, number, number]` | `[0, 0, 30]` | Camera position |
| `gravity` | `[number, number, number]` | `[0, -40, 0]` | Physics gravity vector |
| `fov` | `number` | `20` | Camera field of view |
| `transparent` | `boolean` | `true` | Background transparency |
| `className` | `string` | Default styles | Custom CSS classes |

### Examples

```tsx
// Basic usage
<Lanyard />

// Custom physics
<Lanyard 
  position={[0, 0, 15]} 
  gravity={[0, -60, 0]} 
  fov={25} 
/>

// Custom styling
<Lanyard 
  className="w-full h-96 rounded-lg overflow-hidden"
  transparent={false}
/>
```

### Customizing Assets

1. **Card Model**: Edit `card.glb` using [Model Viewer Editor](https://modelviewer.dev/editor/)
2. **Lanyard Texture**: Replace `lanyard.png` with your custom texture
3. **Materials**: Modify the mesh materials in the `Band` component

## 🎯 Advanced Usage

### Custom Card Model

```tsx
// Replace the asset imports in Lanyard.tsx
import cardGLB from "/path/to/your/custom-card.glb";
import lanyardTexture from "/path/to/your/custom-texture.png";
```

### Custom Physics Settings

```tsx
// Modify the segmentProps in the Band component
const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 8,    // Increase for more dampening
  linearDamping: 6,     // Increase for less movement
};
```

### Custom Lighting

```tsx
// Modify the Environment and Lightformer components
<Environment blur={0.5}>
  <Lightformer
    intensity={5}
    color="blue"
    position={[0, -1, 5]}
    // ... other props
  />
</Environment>
```

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure `global.d.ts` is properly configured
2. **Asset Loading**: Check that `.glb` files are in the correct path
3. **Performance**: Reduce physics complexity for better performance
4. **Mobile**: Consider touch interactions on mobile devices

### Performance Optimization

```tsx
// Reduce physics simulation quality for better performance
<Physics gravity={gravity} timeStep={1 / 30}>  {/* Lower from 1/60 */}
  <Band />
</Physics>
```

## 📱 Responsive Design

The component automatically detects screen size and adjusts:
- Mesh resolution changes based on screen width
- Physics parameters can be adjusted for mobile

```tsx
const [isSmall, setIsSmall] = useState(() => {
  return typeof window !== "undefined" && window.innerWidth < 1024;
});
```

## 🤝 Contributing

Feel free to contribute improvements:
1. Better mobile touch handling
2. Additional physics presets
3. More customization options
4. Performance optimizations

## 📄 License

This component is part of Empire UI and follows the MIT license. 