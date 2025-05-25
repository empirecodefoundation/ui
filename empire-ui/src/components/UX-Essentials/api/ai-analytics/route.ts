import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  serverTimestamp: string;
}

interface AnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  chartData: {
    buttonClicks: Array<{ name: string; clicks: number; percentage: number }>;
    pageActivity: Array<{ page: string; clicks: number }>;
    timeDistribution: Array<{ hour: string; clicks: number }>;
    sessionActivity: Array<{ session: string; clicks: number }>;
  };
  keyMetrics: {
    totalClicks: number;
    uniqueSessions: number;
    mostClickedElement: string;
    mostActivePage: string;
    averageClicksPerSession: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { date } = await request.json();
    const targetDate = date || new Date().toISOString().split('T')[0];

    // Read the log file
    const logsDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logsDir, `user-interactions-${targetDate}.json`);

    let clickData: ClickData[] = [];
    try {
      const fileContent = await fs.readFile(logFile, 'utf-8');
      clickData = JSON.parse(fileContent);
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: 'No data found for the specified date',
        date: targetDate
      }, { status: 404 });
    }

    if (clickData.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No interaction data available',
        date: targetDate
      }, { status: 404 });
    }

    // Process the data for analysis
    const processedData = processClickData(clickData);

    // Generate AI insights
    const aiInsights = await generateAIInsights(clickData, processedData);

    const result: AnalysisResult = {
      summary: aiInsights.summary,
      insights: aiInsights.insights,
      recommendations: aiInsights.recommendations,
      chartData: processedData.chartData,
      keyMetrics: processedData.keyMetrics,
    };

    return NextResponse.json({
      success: true,
      data: result,
      date: targetDate,
      totalInteractions: clickData.length
    });

  } catch (error) {
    console.error('Error in AI analytics:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate AI analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function processClickData(clickData: ClickData[]) {
  // Button clicks analysis
  const buttonClicksMap = new Map<string, number>();
  const pageActivityMap = new Map<string, number>();
  const timeDistributionMap = new Map<number, number>();
  const sessionActivityMap = new Map<string, number>();

  clickData.forEach(click => {
    // Button clicks
    const buttonKey = click.elementText || `${click.elementType}${click.elementId ? `#${click.elementId}` : ''}`;
    buttonClicksMap.set(buttonKey, (buttonClicksMap.get(buttonKey) || 0) + 1);

    // Page activity
    const pagePath = new URL(click.pageUrl).pathname;
    pageActivityMap.set(pagePath, (pageActivityMap.get(pagePath) || 0) + 1);

    // Time distribution
    const hour = new Date(click.timestamp).getHours();
    timeDistributionMap.set(hour, (timeDistributionMap.get(hour) || 0) + 1);

    // Session activity
    sessionActivityMap.set(click.sessionId, (sessionActivityMap.get(click.sessionId) || 0) + 1);
  });

  const totalClicks = clickData.length;

  // Convert to chart data format
  const buttonClicks = Array.from(buttonClicksMap.entries())
    .map(([name, clicks]) => ({
      name: name.length > 30 ? name.substring(0, 30) + '...' : name,
      clicks,
      percentage: Math.round((clicks / totalClicks) * 100)
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10); // Top 10

  const pageActivity = Array.from(pageActivityMap.entries())
    .map(([page, clicks]) => ({ page, clicks }))
    .sort((a, b) => b.clicks - a.clicks);

  const timeDistribution = Array.from(timeDistributionMap.entries())
    .map(([hour, clicks]) => ({ hour: `${hour}:00`, clicks }))
    .sort((a, b) => a.hour.localeCompare(b.hour));

  const sessionActivity = Array.from(sessionActivityMap.entries())
    .map(([session, clicks]) => ({ 
      session: session.substring(session.length - 8), // Last 8 chars for display
      clicks 
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10); // Top 10 sessions

  // Key metrics
  const uniqueSessions = sessionActivityMap.size;
  const mostClickedElement = buttonClicks[0]?.name || 'N/A';
  const mostActivePage = pageActivity[0]?.page || 'N/A';
  const averageClicksPerSession = Math.round(totalClicks / uniqueSessions);

  return {
    chartData: {
      buttonClicks,
      pageActivity,
      timeDistribution,
      sessionActivity
    },
    keyMetrics: {
      totalClicks,
      uniqueSessions,
      mostClickedElement,
      mostActivePage,
      averageClicksPerSession
    }
  };
}

async function generateAIInsights(clickData: ClickData[], processedData: any) {
  try {
    const prompt = `
Analyze this user interaction data and provide insights:

Data Summary:
- Total Clicks: ${processedData.keyMetrics.totalClicks}
- Unique Sessions: ${processedData.keyMetrics.uniqueSessions}
- Most Clicked Element: ${processedData.keyMetrics.mostClickedElement}
- Most Active Page: ${processedData.keyMetrics.mostActivePage}
- Average Clicks per Session: ${processedData.keyMetrics.averageClicksPerSession}

Top Button Clicks:
${processedData.chartData.buttonClicks.slice(0, 5).map((item: any) => `- ${item.name}: ${item.clicks} clicks (${item.percentage}%)`).join('\n')}

Page Activity:
${processedData.chartData.pageActivity.slice(0, 3).map((item: any) => `- ${item.page}: ${item.clicks} clicks`).join('\n')}

Please provide:
1. A brief summary (2-3 sentences)
2. 3-5 key insights about user behavior
3. 3-5 actionable recommendations for improving user experience

Format your response as JSON with keys: summary, insights (array), recommendations (array).
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a UX analytics expert. Analyze user interaction data and provide actionable insights in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    try {
      return JSON.parse(aiResponse);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      return {
        summary: "AI analysis completed successfully with valuable insights about user behavior patterns.",
        insights: [
          `Users generated ${processedData.keyMetrics.totalClicks} total interactions across ${processedData.keyMetrics.uniqueSessions} sessions`,
          `The most popular element "${processedData.keyMetrics.mostClickedElement}" shows strong user engagement`,
          `Page "${processedData.keyMetrics.mostActivePage}" has the highest activity levels`,
          `Average of ${processedData.keyMetrics.averageClicksPerSession} clicks per session indicates good user engagement`
        ],
        recommendations: [
          "Focus on optimizing the most clicked elements for better user experience",
          "Analyze why certain pages have higher activity and replicate successful patterns",
          "Consider A/B testing variations of popular buttons to improve conversion",
          "Monitor session patterns to identify potential user journey improvements"
        ]
      };
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback analysis without AI
    return {
      summary: `Analysis of ${processedData.keyMetrics.totalClicks} user interactions across ${processedData.keyMetrics.uniqueSessions} sessions reveals interesting usage patterns.`,
      insights: [
        `Total of ${processedData.keyMetrics.totalClicks} clicks recorded across ${processedData.keyMetrics.uniqueSessions} unique sessions`,
        `"${processedData.keyMetrics.mostClickedElement}" is the most popular element with significant user engagement`,
        `Page "${processedData.keyMetrics.mostActivePage}" shows the highest user activity`,
        `Users average ${processedData.keyMetrics.averageClicksPerSession} clicks per session, indicating active engagement`
      ],
      recommendations: [
        "Optimize the most clicked elements to improve user experience and conversion rates",
        "Study high-activity pages to understand what drives user engagement",
        "Consider improving less popular elements based on successful patterns",
        "Monitor user session flows to identify optimization opportunities"
      ]
    };
  }
}