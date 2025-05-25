import { NextResponse } from 'next/server';
import Groq from "groq-sdk";

// Remove global initialization
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

export async function POST(req: Request) {
  try {
    // Initialize Groq client only when the API is called
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY environment variable is not set' },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { idea, industry } = await req.json();

    const prompt = `You are a startup analysis API that MUST return ONLY valid JSON without any additional text or explanation.

Analyze this startup and provide detailed metrics:
Startup Idea: ${idea}
Industry: ${industry}

First, identify the two main competitors in this space, then provide a detailed analysis.
The JSON response MUST strictly follow this structure with realistic, numeric values based on the startup idea:
{
  "targetAudience": {
    "primary": "detailed description of primary target audience",
    "secondary": "detailed description of secondary target audience",
    "interests": ["specific interest 1", "specific interest 2", "specific interest 3"]
  },
  "demographics": {
    "regions": ["specific region 1", "specific region 2", "specific region 3"],
    "income": "specific income range",
    "education": "specific education level"
  },
  "potentialInvestors": [
    {
      "name": "real investor or fund name",
      "focus": "specific investment focus",
      "stage": "seed/series A/B/C"
    }
  ],
  "marketData": {
    "competitors": {
      "mainCompetitor1": "name of the first main competitor in your space",
      "mainCompetitor2": "name of the second main competitor in your space"
    },
    "growthProjection": [
      { "month": "Month 1", "users": "realistic user number" },
      { "month": "Month 2", "users": "realistic user number" },
      { "month": "Month 3", "users": "realistic user number" },
      { "month": "Month 4", "users": "realistic user number" },
      { "month": "Month 5", "users": "realistic user number" },
      { "month": "Month 6", "users": "realistic user number" }
    ],
    "demographicBreakdown": [
      { "name": "18-24", "value": "percentage (0-100)" },
      { "name": "25-34", "value": "percentage (0-100)" },
      { "name": "35-44", "value": "percentage (0-100)" },
      { "name": "45-54", "value": "percentage (0-100)" },
      { "name": "55+", "value": "percentage (0-100)" }
    ],
    "competitorComparison": [
      { 
        "name": "Market Share",
        "yours": "realistic percentage (0-100)",
        "mainCompetitor1": "realistic percentage (0-100)",
        "mainCompetitor2": "realistic percentage (0-100)"
      },
      {
        "name": "Customer Satisfaction",
        "yours": "realistic score (0-100)",
        "mainCompetitor1": "realistic score (0-100)",
        "mainCompetitor2": "realistic score (0-100)"
      },
      {
        "name": "Feature Completeness",
        "yours": "realistic score (0-100)",
        "mainCompetitor1": "realistic score (0-100)",
        "mainCompetitor2": "realistic score (0-100)"
      },
      {
        "name": "Price Competitiveness",
        "yours": "realistic score (0-100)",
        "mainCompetitor1": "realistic score (0-100)",
        "mainCompetitor2": "realistic score (0-100)"
      }
    ]
  }
}

IMPORTANT:
1. Return ONLY the JSON object without any additional text
2. All numeric values should be numbers, not strings
3. All percentages should add up to 100% where applicable
4. Growth projections should show realistic month-over-month growth
5. Competitor comparisons should use real competitor names and realistic relative scores
6. Base all metrics on the specific startup idea and industry provided
7. Competitor names should be real companies in the same space`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a JSON API that returns only valid JSON data without any explanation or additional text. All numeric values in your response should be numbers, not strings. When analyzing competitors, use real company names."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 2048,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from Groq API');
    }

    // Try to extract JSON if the response contains any extra text
    let jsonStr = response;
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    try {
      const analysis = JSON.parse(jsonStr);
      
      // Validate numeric values
      const validateNumeric = (obj: any) => {
        if (Array.isArray(obj)) {
          obj.forEach(item => validateNumeric(item));
        } else if (typeof obj === 'object' && obj !== null) {
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'string' && !isNaN(Number(value))) {
              obj[key] = Number(value);
            }
            if (typeof value === 'object') {
              validateNumeric(value);
            }
          });
        }
      };

      validateNumeric(analysis);
      
      // Validate demographic percentages sum to 100
      const demographicSum = analysis.marketData.demographicBreakdown.reduce(
        (sum: number, item: any) => sum + item.value, 
        0
      );
      
      if (Math.abs(demographicSum - 100) > 1) {
        // Normalize to 100%
        const factor = 100 / demographicSum;
        analysis.marketData.demographicBreakdown.forEach((item: any) => {
          item.value = Math.round(item.value * factor);
        });
      }

      return NextResponse.json(analysis);
    } catch (parseError) {
      console.error('Failed to parse JSON:', jsonStr);
      throw new Error('Invalid JSON response from Groq API');
    }
  } catch (error) {
    console.error('Error analyzing startup:', error);
    return NextResponse.json(
      { error: 'Failed to analyze startup. Please try again.' },
      { status: 500 }
    );
  }
} 