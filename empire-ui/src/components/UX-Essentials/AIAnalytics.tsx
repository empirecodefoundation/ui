'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

interface AnalysisData {
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

interface AIAnalyticsProps {
  date?: string;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00',
  '#ff00ff', '#00ffff', '#ff0000', '#0000ff', '#ffff00'
];

export default function AIAnalytics({ date }: AIAnalyticsProps) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(date || new Date().toISOString().split('T')[0]);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch analysis');
      }

      setAnalysisData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, [selectedDate]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-blue-600">
            {`Clicks: ${payload[0].value}`}
          </p>
          {payload[0].payload.percentage && (
            <p className="text-gray-600">
              {`${payload[0].payload.percentage}% of total`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-lg text-gray-600">🤖 AI is analyzing your user interactions...</p>
            <p className="text-sm text-gray-500">This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Analysis Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>💡 Make sure you have:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Set your OPENAI_API_KEY in environment variables</li>
                <li>User interaction data for the selected date</li>
                <li>A valid OpenAI API key with sufficient credits</li>
              </ul>
            </div>
            <button
              onClick={fetchAnalysis}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No Data Available</h2>
            <p className="text-gray-500">No user interaction data found for the selected date.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🤖 AI-Powered User Analytics
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Intelligent insights powered by OpenAI
          </p>
          
          {/* Date Selector */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <label className="text-gray-700 font-medium">Analysis Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={fetchAnalysis}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              🔄 Refresh Analysis
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{analysisData.keyMetrics.totalClicks}</div>
            <div className="text-gray-600">Total Clicks</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{analysisData.keyMetrics.uniqueSessions}</div>
            <div className="text-gray-600">Unique Sessions</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{analysisData.keyMetrics.averageClicksPerSession}</div>
            <div className="text-gray-600">Avg Clicks/Session</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-lg font-bold text-orange-600 truncate">{analysisData.keyMetrics.mostClickedElement}</div>
            <div className="text-gray-600">Top Element</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-lg font-bold text-red-600">{analysisData.keyMetrics.mostActivePage}</div>
            <div className="text-gray-600">Top Page</div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            🧠 AI Summary
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{analysisData.summary}</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Button Clicks Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Most Clicked Elements</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analysisData.chartData.buttonClicks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Page Activity Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🌐 Page Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analysisData.chartData.pageActivity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ page, clicks, percent }) => `${page}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="clicks"
                >
                  {analysisData.chartData.pageActivity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Time Distribution Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⏰ Activity by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analysisData.chartData.timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="clicks" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Session Activity Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">👥 Top Sessions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analysisData.chartData.sessionActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Insights */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              💡 AI Insights
            </h2>
            <div className="space-y-4">
              {analysisData.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🎯 AI Recommendations
            </h2>
            <div className="space-y-4">
              {analysisData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>🤖 Powered by OpenAI GPT-3.5 Turbo • 📊 Built with Recharts</p>
        </div>
      </div>
    </div>
  );
}