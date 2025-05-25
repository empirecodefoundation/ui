import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface ClickData {
  timestamp: string;
  elementType: string;
  elementText: string;
  elementId?: string;
  elementClass?: string;
  pageUrl: string;
  userAgent: string;
  coordinates: {
    x: number;
    y: number;
  };
  sessionId: string;
  serverTimestamp: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const sessionId = searchParams.get('sessionId');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    const logsDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logsDir, `user-interactions-${date}.json`);

    // Check if log file exists
    try {
      await fs.access(logFile);
    } catch {
      return NextResponse.json({
        success: true,
        data: {
          totalClicks: 0,
          pageBreakdown: {},
          sessionBreakdown: {},
          topElements: [],
          hourlyBreakdown: {},
        },
        message: 'No data found for the specified date'
      });
    }

    // Read and parse log file
    const fileContent = await fs.readFile(logFile, 'utf-8');
    const allClicks: ClickData[] = JSON.parse(fileContent);

    // Filter data based on query parameters
    let filteredClicks = allClicks;
    
    if (page) {
      filteredClicks = filteredClicks.filter(click => 
        click.pageUrl.includes(page)
      );
    }
    
    if (sessionId) {
      filteredClicks = filteredClicks.filter(click => 
        click.sessionId === sessionId
      );
    }

    // Calculate analytics
    const analytics = {
      totalClicks: filteredClicks.length,
      
      // Page breakdown
      pageBreakdown: filteredClicks.reduce((acc, click) => {
        const url = new URL(click.pageUrl);
        const pathname = url.pathname;
        acc[pathname] = (acc[pathname] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      
      // Session breakdown
      sessionBreakdown: filteredClicks.reduce((acc, click) => {
        acc[click.sessionId] = (acc[click.sessionId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      
      // Top clicked elements
      topElements: Object.entries(
        filteredClicks.reduce((acc, click) => {
          const key = `${click.elementType}:${click.elementText}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([element, count]) => ({ element, count })),
      
      // Hourly breakdown
      hourlyBreakdown: filteredClicks.reduce((acc, click) => {
        const hour = new Date(click.timestamp).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {} as Record<number, number>),
      
      // User agents
      userAgents: Object.entries(
        filteredClicks.reduce((acc, click) => {
          const ua = click.userAgent.split(' ')[0]; // Simplified UA
          acc[ua] = (acc[ua] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      )
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([agent, count]) => ({ agent, count })),
      
      // Recent clicks (last 10)
      recentClicks: filteredClicks
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)
        .map(click => ({
          timestamp: click.timestamp,
          page: new URL(click.pageUrl).pathname,
          element: click.elementText || click.elementType,
          elementId: click.elementId,
        })),
    };

    return NextResponse.json({
      success: true,
      data: analytics,
      filters: { page, sessionId, date },
      message: `Analytics generated for ${filteredClicks.length} clicks`
    });

  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytics' },
      { status: 500 }
    );
  }
} 