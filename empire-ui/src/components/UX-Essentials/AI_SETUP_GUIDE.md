# 🤖 AI Analytics Setup Guide

## Quick Setup (2 minutes)

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-proj-...`)

### 2. Set Environment Variable

**Option A: Create .env.local file**
```bash
# Create the file in your project root
echo "OPENAI_API_KEY=your_actual_api_key_here" > .env.local
```

**Option B: Set in your system**
```bash
# Windows (PowerShell)
$env:OPENAI_API_KEY="your_actual_api_key_here"

# macOS/Linux
export OPENAI_API_KEY="your_actual_api_key_here"
```

### 3. Test the Integration
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/ai-analytics`
3. The AI will analyze your user interaction data!

## 🎯 What You'll Get

### AI-Powered Insights
- **Smart Summary**: AI-generated overview of user behavior
- **Key Insights**: 3-5 actionable insights about user patterns
- **Recommendations**: AI suggestions for improving UX

### Beautiful Charts
- **Bar Charts**: Most clicked elements with percentages
- **Pie Charts**: Page activity distribution
- **Area Charts**: Activity patterns by hour
- **Session Analysis**: Top user sessions

### Key Metrics Dashboard
- Total clicks and unique sessions
- Average clicks per session
- Most clicked element and most active page
- Real-time data processing

## 🔧 Configuration Options

### API Model Selection
The system uses GPT-3.5 Turbo by default. You can modify the model in:
```typescript
// src/app/api/ai-analytics/route.ts
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // Change to "gpt-4" for better insights
  // ...
});
```

### Cost Optimization
- GPT-3.5 Turbo: ~$0.001 per analysis
- GPT-4: ~$0.01 per analysis
- Fallback mode: Free (basic analysis without AI)

## 🚨 Troubleshooting

### "No OpenAI API Key" Error
```bash
# Check if environment variable is set
echo $OPENAI_API_KEY  # macOS/Linux
echo $env:OPENAI_API_KEY  # Windows PowerShell
```

### "Insufficient Credits" Error
- Check your OpenAI account balance
- Add credits at [OpenAI Billing](https://platform.openai.com/account/billing)

### "No Data Found" Error
- Make sure you have user interaction data
- Check the date selector (data is organized by date)
- Click some buttons on your site to generate data

## 📊 Sample Analysis Output

```json
{
  "summary": "Analysis of 45 user interactions across 8 sessions reveals strong engagement with navigation elements and action buttons.",
  "insights": [
    "The 'Like' button shows exceptional engagement with 15 clicks (33% of total)",
    "Dashboard page has the highest activity with 60% of all interactions",
    "Peak usage occurs between 12:00-13:00, indicating lunch-time browsing patterns"
  ],
  "recommendations": [
    "Consider A/B testing the 'Like' button design to optimize conversion",
    "Replicate dashboard engagement patterns on other pages",
    "Schedule important updates during peak hours (12:00-13:00)"
  ]
}
```

## 🎉 You're Ready!

Your AI Analytics system is now ready to provide intelligent insights about user behavior. The AI will help you understand:

- Which elements users interact with most
- When users are most active
- How to improve user experience
- Optimization opportunities

**Happy Analyzing! 🚀**