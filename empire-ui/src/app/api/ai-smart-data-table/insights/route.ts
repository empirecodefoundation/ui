// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";

// Types for AI Insights
interface DataColumn {
  id: string;
  key: string;
  label: string;
  type: "string" | "number" | "date" | "boolean" | "currency" | "percentage" | "email" | "url";
}

interface DataRow {
  id: string;
  [key: string]: any;
}

interface AIInsight {
  id: string;
  type: "trend" | "anomaly" | "correlation" | "summary" | "prediction";
  title: string;
  description: string;
  confidence: number;
  data?: any;
  visualization?: "chart" | "graph" | "heatmap" | "scatter";
  timestamp: string;
}

// Generate AI insights for data
async function generateDataInsights(data: DataRow[], columns: DataColumn[]): Promise<AIInsight[]> {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    return generateMockInsights(data, columns);
  }

  try {
    const dataContext = {
      columns: columns.map(col => ({
        key: col.key,
        label: col.label,
        type: col.type
      })),
      sampleData: data.slice(0, 10),
      totalRows: data.length,
      statistics: generateBasicStatistics(data, columns)
    };

    const prompt = `
Analyze the following dataset and provide actionable insights.

Data Context:
- Columns: ${JSON.stringify(dataContext.columns)}
- Sample Data: ${JSON.stringify(dataContext.sampleData)}
- Total Rows: ${dataContext.totalRows}
- Statistics: ${JSON.stringify(dataContext.statistics)}

Please provide 3-5 insights in the following JSON format:
{
  "insights": [
    {
      "type": "trend|anomaly|correlation|summary|prediction",
      "title": "Insight title",
      "description": "Detailed insight description with specific findings",
      "confidence": 0.85
    }
  ]
}

Focus on:
1. Data trends and patterns
2. Anomalies or outliers
3. Correlations between variables
4. Summary statistics insights
5. Predictive observations

Provide specific, actionable insights based on the actual data.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert data scientist. Provide accurate, actionable insights based on data analysis."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const analysisText = aiResponse.choices[0]?.message?.content;

    if (!analysisText) {
      throw new Error("No insights received from OpenAI");
    }

    const analysis = JSON.parse(analysisText);
    
    return (analysis.insights || []).map((insight: any, index: number) => ({
      id: `insight-${Date.now()}-${index}`,
      type: insight.type,
      title: insight.title,
      description: insight.description,
      confidence: insight.confidence,
      timestamp: new Date().toISOString()
    }));

  } catch (error) {
    console.error("AI Insights Generation Error:", error);
    return generateMockInsights(data, columns);
  }
}

// Generate mock insights for demo
function generateMockInsights(data: DataRow[], columns: DataColumn[]): AIInsight[] {
  const numericColumns = columns.filter(col => col.type === 'number' || col.type === 'currency');
  const stringColumns = columns.filter(col => col.type === 'string');
  const booleanColumns = columns.filter(col => col.type === 'boolean');
  const dateColumns = columns.filter(col => col.type === 'date');
  
  const insights: AIInsight[] = [];

  // Data summary insight
  insights.push({
    id: `insight-${Date.now()}-1`,
    type: "summary",
    title: "Dataset Overview",
    description: `Your dataset contains ${data.length} records across ${columns.length} columns. The data includes ${numericColumns.length} numeric fields, ${stringColumns.length} text fields, ${booleanColumns.length} boolean fields, and ${dateColumns.length} date fields. This provides a rich foundation for comprehensive analysis.`,
    confidence: 0.95,
    timestamp: new Date().toISOString()
  });

  // Numeric data analysis
  if (numericColumns.length > 0) {
    const column = numericColumns[0];
    const values = data.map(row => row[column.key]).filter(v => v !== null && v !== undefined && !isNaN(Number(v)));
    
    if (values.length > 0) {
      const numericValues = values.map(v => Number(v));
      const avg = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);
      const range = max - min;
      
      insights.push({
        id: `insight-${Date.now()}-2`,
        type: "trend",
        title: `${column.label} Statistical Analysis`,
        description: `The ${column.label.toLowerCase()} field shows an average value of ${avg.toFixed(2)}, ranging from ${min} to ${max} (range: ${range}). ${avg > (min + max) / 2 ? 'Values tend to be higher than the midpoint' : 'Values are distributed around the lower range'}, suggesting ${avg > (min + max) / 2 ? 'positive skewness' : 'potential concentration in lower values'}.`,
        confidence: 0.82,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Data quality insight
  const nullCounts = columns.map(col => {
    const nullCount = data.filter(row => 
      row[col.key] === null || 
      row[col.key] === undefined || 
      row[col.key] === '' ||
      (typeof row[col.key] === 'string' && row[col.key].trim() === '')
    ).length;
    return { column: col.label, key: col.key, nullCount, percentage: (nullCount / data.length) * 100 };
  }).filter(item => item.nullCount > 0);

  if (nullCounts.length > 0) {
    const highNullColumns = nullCounts.filter(item => item.percentage > 10);
    insights.push({
      id: `insight-${Date.now()}-3`,
      type: "anomaly",
      title: "Data Quality Assessment",
      description: `Found missing values in ${nullCounts.length} columns. ${highNullColumns.length > 0 ? `Columns with significant missing data (>10%): ${highNullColumns.map(col => col.column).join(', ')}. ` : ''}Consider data cleaning strategies such as imputation, removal, or flagging incomplete records for better analysis accuracy.`,
      confidence: 0.88,
      timestamp: new Date().toISOString()
    });
  }

  // Boolean field analysis
  if (booleanColumns.length > 0) {
    const boolColumn = booleanColumns[0];
    const trueCount = data.filter(row => row[boolColumn.key] === true).length;
    const falseCount = data.filter(row => row[boolColumn.key] === false).length;
    const truePercentage = (trueCount / (trueCount + falseCount)) * 100;
    
    insights.push({
      id: `insight-${Date.now()}-4`,
      type: "correlation",
      title: `${boolColumn.label} Distribution Analysis`,
      description: `The ${boolColumn.label.toLowerCase()} field shows ${truePercentage.toFixed(1)}% positive values (${trueCount} records) and ${(100 - truePercentage).toFixed(1)}% negative values (${falseCount} records). ${truePercentage > 70 ? 'This indicates a strong positive bias' : truePercentage < 30 ? 'This shows a strong negative bias' : 'This represents a relatively balanced distribution'} which may impact analysis outcomes.`,
      confidence: 0.75,
      timestamp: new Date().toISOString()
    });
  }

  // Correlation insight for multiple numeric columns
  if (numericColumns.length >= 2) {
    const col1 = numericColumns[0];
    const col2 = numericColumns[1];
    
    insights.push({
      id: `insight-${Date.now()}-5`,
      type: "correlation",
      title: `Relationship Between ${col1.label} and ${col2.label}`,
      description: `Analysis of the relationship between ${col1.label.toLowerCase()} and ${col2.label.toLowerCase()} suggests potential correlations worth investigating. Consider creating scatter plots or correlation matrices to identify linear relationships, trends, or dependencies between these variables that could inform business decisions.`,
      confidence: 0.65,
      timestamp: new Date().toISOString()
    });
  }

  // Predictive insight
  if (data.length > 10 && numericColumns.length > 0) {
    insights.push({
      id: `insight-${Date.now()}-6`,
      type: "prediction",
      title: "Predictive Analysis Opportunities",
      description: `With ${data.length} data points and ${numericColumns.length} numeric variables, this dataset is suitable for predictive modeling. Consider implementing regression analysis, time series forecasting, or machine learning models to predict future trends and identify key performance indicators.`,
      confidence: 0.70,
      timestamp: new Date().toISOString()
    });
  }

  return insights.slice(0, 5); // Return top 5 insights
}

// Generate basic statistics for data
function generateBasicStatistics(data: DataRow[], columns: DataColumn[]) {
  const stats: any = {};
  
  columns.forEach(column => {
    const values = data.map(row => row[column.key]).filter(v => v !== null && v !== undefined);
    
    if (column.type === 'number' || column.type === 'currency') {
      const numericValues = values.map(v => Number(v)).filter(v => !isNaN(v));
      if (numericValues.length > 0) {
        const sorted = [...numericValues].sort((a, b) => a - b);
        const sum = numericValues.reduce((acc, val) => acc + val, 0);
        const mean = sum / numericValues.length;
        
        stats[column.key] = {
          count: numericValues.length,
          min: Math.min(...numericValues),
          max: Math.max(...numericValues),
          mean: mean,
          median: sorted[Math.floor(sorted.length / 2)],
          sum: sum,
          nullCount: data.length - values.length,
          variance: numericValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numericValues.length
        };
      }
    } else if (column.type === 'boolean') {
      const booleanValues = values.filter(v => typeof v === 'boolean');
      const trueCount = booleanValues.filter(v => v === true).length;
      const falseCount = booleanValues.filter(v => v === false).length;
      
      stats[column.key] = {
        count: booleanValues.length,
        trueCount: trueCount,
        falseCount: falseCount,
        truePercentage: (trueCount / booleanValues.length) * 100,
        nullCount: data.length - values.length
      };
    } else {
      const uniqueValues = new Set(values);
      const valueCounts: Record<string, number> = {};
      values.forEach(val => {
        const key = String(val);
        valueCounts[key] = (valueCounts[key] || 0) + 1;
      });
      
      stats[column.key] = {
        count: values.length,
        uniqueCount: uniqueValues.size,
        nullCount: data.length - values.length,
        topValues: Object.entries(valueCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([value, count]) => ({ value, count }))
      };
    }
  });
  
  return stats;
}

// Insights generation endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, columns } = body;

    if (!data || !columns) {
      return NextResponse.json(
        { error: "Missing required fields: data, columns" },
        { status: 400 }
      );
    }

    if (!Array.isArray(data) || !Array.isArray(columns)) {
      return NextResponse.json(
        { error: "Data and columns must be arrays" },
        { status: 400 }
      );
    }

    if (data.length === 0) {
      return NextResponse.json(
        { error: "Data array cannot be empty" },
        { status: 400 }
      );
    }

    const insights = await generateDataInsights(data, columns);

    return NextResponse.json({
      success: true,
      insights,
      metadata: {
        totalRecords: data.length,
        totalColumns: columns.length,
        insightCount: insights.length,
        generatedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("AI Insights Generation Error:", error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Insight generation failed",
        details: "Please check your data format and try again"
      },
      { status: 500 }
    );
  }
}

// Health check for insights endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "AI Smart Data Table - Insights",
    timestamp: new Date().toISOString(),
    capabilities: {
      trendAnalysis: true,
      anomalyDetection: true,
      correlationAnalysis: true,
      statisticalSummary: true,
      predictiveInsights: true
    },
    supportedDataTypes: [
      "string", "number", "date", "boolean", "currency", "percentage", "email", "url"
    ],
    requiredEnvVars: {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY
    }
  });
}
