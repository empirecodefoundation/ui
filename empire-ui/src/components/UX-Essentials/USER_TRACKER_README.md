# User Interaction Tracker Component

A reusable React component for tracking user interactions (button clicks) on any website. Perfect for hackathons and analytics implementations.

## Features

- 🎯 **Smart Button Detection**: Automatically detects buttons, links with `role="button"`, and elements with button classes
- 🤖 **AI-Powered Analytics**: OpenAI integration for intelligent insights and recommendations
- 📊 **Beautiful Visualizations**: Interactive charts with bar graphs, pie charts, and area charts
- 📊 **Comprehensive Logging**: Captures timestamp, element details, coordinates, user agent, and session info
- 🔧 **Highly Configurable**: Customizable tracking options and API endpoints
- 📁 **File Logging**: Automatically saves interaction data to JSON files organized by date
- 🚀 **Easy Integration**: Drop-in component that works with any React/Next.js application

## Quick Start

### 1. Copy the Component Files

Copy these files to your project:
- `src/components/UserTracker.tsx` - Main tracking component
- `src/app/api/track/route.ts` - API endpoint for logging (Next.js App Router)

### 2. Basic Usage

```tsx
import UserTracker from './components/UserTracker';

function App() {
  return (
    <div>
      {/* Add this component anywhere in your app */}
      <UserTracker />
      
      {/* Your existing content */}
      <button>This click will be tracked!</button>
    </div>
  );
}
```

### 3. Advanced Configuration

```tsx
<UserTracker 
  enableConsoleLog={true}        // Show tracking data in console
  trackAllClicks={false}         // Only track buttons (recommended)
  sessionId="custom-session-123" // Custom session identifier
  apiEndpoint="/api/custom-track" // Custom API endpoint
/>
```

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableConsoleLog` | boolean | `false` | Log tracking data to browser console |
| `trackAllClicks` | boolean | `false` | Track all clicks vs just button elements |
| `sessionId` | string | auto-generated | Custom session identifier |
| `apiEndpoint` | string | `"/api/track"` | API endpoint for sending tracking data |

## What Gets Tracked

The component automatically tracks clicks on:
- `<button>` elements
- `<a>` elements (links) - including navigation links
- Elements with `role="button"`
- Elements with class `btn` or `button`
- Next.js `Link` components
- Any element when `trackAllClicks={true}`

### Special Handling for Navigation Links
- **Navigation links** (that redirect to other pages) are tracked using `navigator.sendBeacon()` for reliability
- **Non-navigation links** (anchors, mailto, tel, javascript) are tracked normally
- **Tracking completes before navigation** to ensure data is captured

## Data Structure

Each tracked interaction includes:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "elementType": "button",
  "elementText": "Click Me",
  "elementId": "submit-btn",
  "elementClass": "bg-blue-500 hover:bg-blue-600",
  "pageUrl": "https://yoursite.com/page",
  "userAgent": "Mozilla/5.0...",
  "coordinates": {
    "x": 150,
    "y": 300
  },
  "sessionId": "session_1705312245123_abc123",
  "serverTimestamp": "2024-01-15T10:30:45.456Z"
}
```

## File Storage

Interaction data is automatically saved to:
```
logs/user-interactions-YYYY-MM-DD.json
```

Each day gets its own file for easy organization and analysis.

## API Endpoints

### POST `/api/track`
Logs a new interaction to the file system.

**Request Body:**
```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "elementType": "button",
  "elementText": "Click Me",
  // ... other tracking data
}
```

**Response:**
```json
{
  "success": true,
  "message": "Click data logged successfully",
  "logFile": "user-interactions-2024-01-15.json"
}
```

### GET `/api/track`
Returns list of available log files.

**Response:**
```json
{
  "success": true,
  "files": ["user-interactions-2024-01-15.json"],
  "message": "Found 1 log files"
}
```

## Multi-Page Tracking

The UserTracker component automatically works across multiple pages when properly integrated:

### Key Features for Multi-Page Apps:
- **Session Persistence**: Same session ID across all pages during user visit
- **Page Context**: Each click logs the current page URL
- **Navigation Tracking**: Track user journey across different pages
- **Cross-Page Analytics**: Analyze user behavior patterns across your entire site

### Implementation for Multi-Page Apps:

#### Option 1: Global Integration (Recommended)
Add UserTracker to your root layout for site-wide tracking:

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

#### Option 2: Per-Page Integration
Add UserTracker to specific pages:

```tsx
// Individual page components
import UserTracker from '../components/UserTracker';

export default function HomePage() {
  return (
    <>
      <UserTracker sessionId="homepage-session" />
      <YourPageContent />
    </>
  );
}
```

### Multi-Page Data Structure

Each interaction includes page context:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "pageUrl": "https://yoursite.com/dashboard",
  "elementText": "Save Settings",
  "sessionId": "session_1705312245123_abc123",
  // ... other tracking data
}
```

### Analytics API for Multi-Page Data

Get analytics filtered by page:

```bash
# All clicks on a specific page
GET /api/analytics?page=/dashboard

# All clicks for a specific session
GET /api/analytics?sessionId=session_123

# All clicks for a specific date
GET /api/analytics?date=2024-01-15
```

## 🤖 AI Analytics (NEW!)

The UserTracker now includes powerful AI-driven analytics that provide intelligent insights about user behavior patterns.

### Features
- **🧠 AI-Generated Insights**: OpenAI analyzes your data and provides actionable insights
- **📊 Beautiful Charts**: Interactive visualizations with Recharts
- **🎯 Smart Recommendations**: AI suggests UX improvements based on user behavior
- **📈 Key Metrics**: Comprehensive dashboard with important statistics

### Quick Setup
1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set environment variable: `OPENAI_API_KEY=your_api_key_here`
3. Navigate to `/ai-analytics` in your app
4. Get instant AI-powered insights!

### What You Get
- **Smart Summary**: AI overview of user behavior patterns
- **Top Elements Chart**: Bar chart of most clicked elements
- **Page Activity**: Pie chart showing page engagement distribution
- **Time Patterns**: Area chart of activity by hour
- **Session Analysis**: Top user sessions with click counts
- **AI Recommendations**: Specific suggestions for improving UX

### Sample AI Output
```json
{
  "summary": "Analysis of 45 interactions across 8 sessions shows strong engagement with action buttons and navigation elements.",
  "insights": [
    "The 'Like' button shows exceptional engagement with 33% of total clicks",
    "Dashboard page drives 60% of user activity",
    "Peak usage occurs during lunch hours (12:00-13:00)"
  ],
  "recommendations": [
    "A/B test the 'Like' button design to optimize conversion",
    "Replicate dashboard engagement patterns on other pages",
    "Schedule important updates during peak hours"
  ]
}
```

### Cost & Performance
- **GPT-3.5 Turbo**: ~$0.001 per analysis (recommended)
- **GPT-4**: ~$0.01 per analysis (premium insights)
- **Fallback Mode**: Free basic analysis if OpenAI is unavailable
- **Real-time Processing**: Analysis completes in 2-5 seconds

For detailed setup instructions, see [AI_SETUP_GUIDE.md](./AI_SETUP_GUIDE.md).

## Integration Examples

### React App
```tsx
import UserTracker from './components/UserTracker';

function App() {
  return (
    <>
      <UserTracker enableConsoleLog={true} />
      <YourAppContent />
    </>
  );
}
```

### Next.js App Router
```tsx
// app/layout.tsx
import UserTracker from '../components/UserTracker';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UserTracker />
        {children}
      </body>
    </html>
  );
}
```

### Next.js Pages Router
```tsx
// pages/_app.tsx
import UserTracker from '../components/UserTracker';

export default function App({ Component, pageProps }) {
  return (
    <>
      <UserTracker />
      <Component {...pageProps} />
    </>
  );
}
```

## Customization

### Custom Button Detection
Modify the `handleClick` function in `UserTracker.tsx` to detect custom button patterns:

```tsx
const shouldTrack = trackAllClicks || 
                   target.tagName.toLowerCase() === 'button' ||
                   target.closest('button') !== null ||
                   target.getAttribute('role') === 'button' ||
                   target.classList.contains('btn') ||
                   target.classList.contains('button') ||
                   target.classList.contains('your-custom-class'); // Add custom classes
```

### Custom Data Fields
Add additional tracking data by modifying the `ClickData` interface and `clickData` object:

```tsx
interface ClickData {
  // ... existing fields
  customField: string;
  userId?: string;
}

const clickData: ClickData = {
  // ... existing data
  customField: 'custom-value',
  userId: getCurrentUserId(), // Your custom logic
};
```

## Performance Considerations

- The component uses event delegation for efficient event handling
- File I/O is handled asynchronously to avoid blocking the UI
- Consider implementing log rotation for high-traffic sites
- Use `trackAllClicks={false}` for better performance (default)

## Security Notes

- Log files are stored server-side and not accessible via direct URL
- Consider implementing authentication for the `/api/track` endpoints in production
- Be mindful of GDPR/privacy regulations when tracking user interactions
- Sanitize logged data to prevent XSS in log analysis tools

## Troubleshooting

### Component Not Tracking Clicks
1. Check browser console for errors
2. Ensure `enableConsoleLog={true}` to see tracking activity
3. Verify button elements match the detection criteria
4. Check network tab for API call failures

### Log Files Not Created
1. Ensure the API route is properly set up
2. Check server permissions for creating the `logs` directory
3. Verify the API endpoint URL is correct
4. Check server logs for file system errors

### TypeScript Errors
1. Ensure all required dependencies are installed
2. Check that the component is imported correctly
3. Verify TypeScript configuration includes the component files

## License

This component is provided as-is for hackathon and educational use. Feel free to modify and distribute according to your needs.

## Contributing

This is a hackathon project! Feel free to:
- Add new tracking features
- Improve performance
- Add database storage options
- Create visualization tools for the logged data

Happy tracking! 🎯 