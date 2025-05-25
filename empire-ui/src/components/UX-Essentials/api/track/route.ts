import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Handle both regular JSON and sendBeacon blob requests
    let clickData;
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      clickData = await request.json();
    } else {
      // Handle sendBeacon blob data
      const text = await request.text();
      try {
        clickData = JSON.parse(text);
      } catch {
        // If parsing fails, try to get it as form data or raw text
        clickData = { rawData: text, timestamp: new Date().toISOString() };
      }
    }
    
    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    try {
      await fs.access(logsDir);
    } catch {
      await fs.mkdir(logsDir, { recursive: true });
    }

    // Create filename with current date
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `user-interactions-${today}.json`);

    // Read existing data or create empty array
    let existingData = [];
    try {
      const fileContent = await fs.readFile(logFile, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is empty, start with empty array
      existingData = [];
    }

    // Add new click data
    existingData.push({
      ...clickData,
      serverTimestamp: new Date().toISOString(),
    });

    // Write back to file
    await fs.writeFile(logFile, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Click data logged successfully',
      logFile: `user-interactions-${today}.json`
    });

  } catch (error) {
    console.error('Error logging click data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log click data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const logsDir = path.join(process.cwd(), 'logs');
    
    // Check if logs directory exists
    try {
      await fs.access(logsDir);
    } catch {
      return NextResponse.json({ 
        success: true, 
        files: [],
        message: 'No logs directory found'
      });
    }

    // Get all log files
    const files = await fs.readdir(logsDir);
    const logFiles = files.filter(file => file.startsWith('user-interactions-') && file.endsWith('.json'));

    return NextResponse.json({
      success: true,
      files: logFiles,
      message: `Found ${logFiles.length} log files`
    });

  } catch (error) {
    console.error('Error reading log files:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read log files' },
      { status: 500 }
    );
  }
} 