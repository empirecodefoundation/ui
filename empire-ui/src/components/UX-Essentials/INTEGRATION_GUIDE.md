# UserTracker Integration Guide

A step-by-step guide for integrating the UserTracker component into your own projects.

## 🚀 Quick Start (5 minutes)

### Option 1: Next.js/React Projects (Recommended)

#### Step 1: Copy the Files
Copy these files to your project:

```
your-project/
├── src/
│   ├── components/
│   │   └── UserTracker.tsx          # Main tracking component
│   └── app/api/
│       └── track/
│           └── route.ts             # API endpoint (Next.js App Router)
```

#### Step 2: Install Dependencies (if needed)
```bash
npm install react react-dom
# For TypeScript projects
npm install -D typescript @types/react @types/node
```

#### Step 3: Add to Your App
```tsx
// app/layout.tsx (Next.js App Router)
import UserTracker from '../components/UserTracker';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UserTracker enableConsoleLog={true} />
        {children}
      </body>
    </html>
  );
}
```

#### Step 4: Test It
```tsx
// Any page component
export default function MyPage() {
  return (
    <div>
      <button>This will be tracked!</button>
      <a href="/other-page">This link will be tracked too!</a>
    </div>
  );
}
```

That's it! 🎉 Your app is now tracking user interactions.

---

## 📋 Detailed Integration Options

### Option 2: React Projects (Create React App, Vite, etc.)

#### File Structure:
```
src/
├── components/
│   └── UserTracker.tsx
├── api/
│   └── tracking.ts                  # Custom API handler
└── App.tsx
```

#### Setup:
```tsx
// src/App.tsx
import UserTracker from './components/UserTracker';

function App() {
  return (
    <div className="App">
      <UserTracker 
        apiEndpoint="/api/track"
        enableConsoleLog={true}
      />
      {/* Your app content */}
    </div>
  );
}
```

#### Custom API Handler:
```typescript
// src/api/tracking.ts
export async function logUserInteraction(data: any) {
  try {
    const response = await fetch('/your-backend-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error('Tracking failed:', error);
  }
}
```

### Option 3: Vue.js Projects

#### Vue Component Version:
```vue
<!-- components/UserTracker.vue -->
<template>
  <!-- This component renders nothing visible -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface ClickData {
  timestamp: string;
  elementType: string;
  elementText: string;
  elementId?: string;
  elementClass?: string;
  pageUrl: string;
  userAgent: string;
  coordinates: { x: number; y: number };
  sessionId: string;
}

const props = defineProps<{
  apiEndpoint?: string;
  enableConsoleLog?: boolean;
  trackAllClicks?: boolean;
}>();

const sessionId = ref(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

const handleClick = async (event: MouseEvent) => {
  // Similar logic to React version
  const target = event.target as HTMLElement;
  const clickableElement = target.closest('button') || target.closest('a') || target;
  
  if (!clickableElement) return;
  
  const clickData: ClickData = {
    timestamp: new Date().toISOString(),
    elementType: clickableElement.tagName.toLowerCase(),
    elementText: clickableElement.textContent?.trim() || '',
    elementId: clickableElement.id || undefined,
    elementClass: clickableElement.className || undefined,
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    coordinates: { x: event.clientX, y: event.clientY },
    sessionId: sessionId.value,
  };

  if (props.enableConsoleLog) {
    console.log('User Interaction Tracked:', clickData);
  }

  try {
    await fetch(props.apiEndpoint || '/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clickData),
    });
  } catch (error) {
    console.error('Failed to log click data:', error);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClick, true);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClick, true);
});
</script>
```

#### Usage in Vue:
```vue
<!-- App.vue -->
<template>
  <div id="app">
    <UserTracker :enable-console-log="true" />
    <!-- Your app content -->
  </div>
</template>

<script setup>
import UserTracker from './components/UserTracker.vue';
</script>
```

### Option 4: Vanilla JavaScript (Any Website)

#### Standalone Script:
```html
<!-- Add to any HTML page -->
<script>
(function() {
  const UserTracker = {
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    apiEndpoint: '/api/track',
    enableConsoleLog: true,

    init() {
      document.addEventListener('click', this.handleClick.bind(this), true);
    },

    async handleClick(event) {
      const target = event.target;
      const clickableElement = target.closest('button') || 
                              target.closest('a') || 
                              target.closest('[role="button"]') ||
                              (target.classList.contains('btn') ? target : null);

      if (!clickableElement) return;

      const clickData = {
        timestamp: new Date().toISOString(),
        elementType: clickableElement.tagName.toLowerCase(),
        elementText: clickableElement.textContent?.trim() || '',
        elementId: clickableElement.id || undefined,
        elementClass: clickableElement.className || undefined,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        coordinates: { x: event.clientX, y: event.clientY },
        sessionId: this.sessionId,
      };

      if (this.enableConsoleLog) {
        console.log('User Interaction Tracked:', clickData);
      }

      try {
        await fetch(this.apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clickData),
        });
      } catch (error) {
        console.error('Failed to log click data:', error);
      }
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UserTracker.init());
  } else {
    UserTracker.init();
  }

  // Make it globally accessible
  window.UserTracker = UserTracker;
})();
</script>
```

---

## 🔧 Configuration Options

### Basic Configuration:
```tsx
<UserTracker 
  enableConsoleLog={true}          // Show logs in console
  trackAllClicks={false}           // Only track buttons/links
  sessionId="custom-session-123"   // Custom session ID
  apiEndpoint="/api/custom-track"  // Custom API endpoint
/>
```

### Advanced Configuration:
```tsx
<UserTracker 
  enableConsoleLog={process.env.NODE_ENV === 'development'}
  trackAllClicks={false}
  sessionId={getUserSessionId()}
  apiEndpoint={process.env.REACT_APP_TRACKING_ENDPOINT}
  onTrackingError={(error) => console.error('Tracking error:', error)}
  beforeTrack={(data) => ({ ...data, userId: getCurrentUserId() })}
/>
```

---

## 🗄️ Backend Integration

### Option 1: File-Based Logging (Simple)
Use the provided Next.js API route that saves to JSON files.

### Option 2: Database Integration
```typescript
// api/track/route.ts (Next.js)
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const clickData = await request.json();
    
    await prisma.userInteraction.create({
      data: {
        timestamp: new Date(clickData.timestamp),
        elementType: clickData.elementType,
        elementText: clickData.elementText,
        elementId: clickData.elementId,
        elementClass: clickData.elementClass,
        pageUrl: clickData.pageUrl,
        userAgent: clickData.userAgent,
        coordinatesX: clickData.coordinates.x,
        coordinatesY: clickData.coordinates.y,
        sessionId: clickData.sessionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
```

### Option 3: Third-Party Analytics
```typescript
// Integration with Google Analytics, Mixpanel, etc.
const logClick = async (clickData: ClickData) => {
  // Send to your analytics service
  gtag('event', 'user_interaction', {
    element_type: clickData.elementType,
    element_text: clickData.elementText,
    page_url: clickData.pageUrl,
  });
  
  // Also send to your own backend
  await fetch('/api/track', {
    method: 'POST',
    body: JSON.stringify(clickData),
  });
};
```

---

## 📊 Data Analysis

### Querying the Data:
```typescript
// Get analytics for a specific page
const pageAnalytics = await fetch('/api/analytics?page=/dashboard');

// Get analytics for a specific session
const sessionAnalytics = await fetch('/api/analytics?sessionId=session_123');

// Get analytics for a date range
const dateAnalytics = await fetch('/api/analytics?date=2024-01-15');
```

### Sample Analytics Queries:
```sql
-- Most clicked elements
SELECT element_text, COUNT(*) as clicks 
FROM user_interactions 
GROUP BY element_text 
ORDER BY clicks DESC;

-- Page popularity
SELECT page_url, COUNT(*) as visits 
FROM user_interactions 
GROUP BY page_url 
ORDER BY visits DESC;

-- User journey analysis
SELECT session_id, page_url, timestamp 
FROM user_interactions 
ORDER BY session_id, timestamp;
```

---

## 🎨 Customization Examples

### Custom Element Detection:
```typescript
// Track custom components
const shouldTrack = trackAllClicks || 
                   clickableElement !== null ||
                   target.classList.contains('trackable') ||
                   target.dataset.track === 'true';
```

### Custom Data Fields:
```typescript
const clickData = {
  // ... standard fields
  customField: 'custom-value',
  userId: getCurrentUserId(),
  experimentId: getActiveExperiment(),
  deviceType: getDeviceType(),
};
```

### Conditional Tracking:
```typescript
// Only track in production
if (process.env.NODE_ENV === 'production') {
  return <UserTracker enableConsoleLog={false} />;
}

// Only track for certain users
if (user.hasAnalyticsConsent) {
  return <UserTracker sessionId={user.id} />;
}
```

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. Tracking Not Working
```typescript
// Debug mode
<UserTracker enableConsoleLog={true} />
// Check browser console for logs
```

#### 2. Navigation Links Not Tracked
```typescript
// Ensure sendBeacon is supported
if (!navigator.sendBeacon) {
  console.warn('sendBeacon not supported, navigation tracking may be unreliable');
}
```

#### 3. API Endpoint Issues
```typescript
// Test the endpoint
fetch('/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'data' }),
}).then(r => console.log('API test:', r.status));
```

#### 4. TypeScript Errors
```bash
npm install -D @types/react @types/node
```

---

## 📦 Creating an NPM Package

### Package Structure:
```
user-tracker-package/
├── src/
│   ├── index.ts
│   ├── UserTracker.tsx
│   └── types.ts
├── dist/
├── package.json
├── README.md
└── tsconfig.json
```

### package.json:
```json
{
  "name": "your-user-tracker",
  "version": "1.0.0",
  "description": "Reusable user interaction tracking component",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  }
}
```

### Publishing:
```bash
npm login
npm publish
```

### Usage After Publishing:
```bash
npm install your-user-tracker
```

```tsx
import { UserTracker } from 'your-user-tracker';

function App() {
  return (
    <div>
      <UserTracker enableConsoleLog={true} />
      {/* Your app */}
    </div>
  );
}
```

---

## 🔒 Privacy & GDPR Compliance

### Privacy-First Implementation:
```typescript
<UserTracker 
  enableTracking={user.hasAnalyticsConsent}
  anonymizeData={true}
  respectDoNotTrack={true}
/>
```

### Data Anonymization:
```typescript
const anonymizeData = (data: ClickData) => ({
  ...data,
  userAgent: data.userAgent.split(' ')[0], // Only browser name
  pageUrl: new URL(data.pageUrl).pathname, // Remove query params
  sessionId: hashSessionId(data.sessionId), // Hash the session ID
});
```

---

## 📈 Performance Optimization

### Lazy Loading:
```typescript
const UserTracker = lazy(() => import('./components/UserTracker'));

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <UserTracker />
      </Suspense>
      {/* Your app */}
    </div>
  );
}
```

### Debounced Tracking:
```typescript
const debouncedTrack = debounce(logClick, 100);
```

### Batch Requests:
```typescript
// Collect multiple interactions and send in batches
const batchTracker = new BatchTracker({
  batchSize: 10,
  flushInterval: 5000,
});
```

---

## 🎯 Use Cases

### E-commerce:
- Track product clicks
- Monitor checkout flow
- Analyze cart abandonment

### SaaS Applications:
- Feature usage analytics
- User onboarding tracking
- A/B testing support

### Content Websites:
- Article engagement
- Navigation patterns
- Social sharing tracking

### Mobile Apps:
- Button tap tracking
- Screen navigation
- User flow analysis

---

## 🤝 Contributing

Want to improve the UserTracker? Here's how:

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Submit a pull request

### Ideas for Contributions:
- Framework-specific versions (Vue, Angular, Svelte)
- Advanced analytics features
- Performance optimizations
- Privacy enhancements
- Mobile app versions (React Native, Flutter)

---

## 📞 Support

Need help integrating UserTracker?

- 📖 Check the documentation
- 🐛 Report issues on GitHub
- 💬 Join our Discord community
- 📧 Email support@usertracker.dev

---

**Happy Tracking! 🎉**

*UserTracker - Making user analytics simple and privacy-friendly.* 