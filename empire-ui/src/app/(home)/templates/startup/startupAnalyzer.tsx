import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Target, Users, Briefcase } from 'lucide-react';
import { 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface StartupAnalysisResult {
  targetAudience: {
    primary: string;
    secondary: string;
    interests: string[];
  };
  demographics: {
    regions: string[];
    income: string;
    education: string;
  };
  potentialInvestors: Array<{
    name: string;
    focus: string;
    stage: string;
  }>;
  marketData: {
    growthProjection: Array<{
      month: string;
      users: number;
    }>;
    demographicBreakdown: Array<{
      name: string;
      value: number;
    }>;
    competitorComparison: Array<{
      name: string;
      yours: number;
      mainCompetitor1: number;
      mainCompetitor2: number;
    }>;
    competitors: {
      mainCompetitor1: string;
      mainCompetitor2: string;
    };
  };
}

const StartupAnalyzer = () => {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StartupAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeStartup = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea, industry }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze startup');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze startup. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Grid background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Content */}
      <div className="relative w-full max-w-6xl mx-auto p-4 space-y-8">
        <Card className="w-full bg-black/50 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Startup Idea Analyzer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Startup Idea</label>
                <Textarea
                  placeholder="Describe your startup idea in detail..."
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="h-32 bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Industry</label>
                <Input
                  placeholder="e.g., SaaS, Fintech, E-commerce"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-black/50 border-gray-800 text-white placeholder:text-gray-500"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-3">
                  {error}
                </div>
              )}
              <Button
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                onClick={analyzeStartup}
                disabled={loading || !idea || !industry}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing your startup...
                  </>
                ) : (
                  'Analyze Startup Potential'
                )}
              </Button>
            </div>

            {result && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-black/50 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="h-5 w-5 text-blue-400" />
                      <h3 className="font-semibold text-white">Target Audience</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">{result.targetAudience.primary}</p>
                      <p className="text-sm text-gray-400">{result.targetAudience.secondary}</p>
                    </div>
                  </Card>

                  <Card className="p-4 bg-black/50 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-green-400" />
                      <h3 className="font-semibold text-white">Key Demographics</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">{result.demographics.regions.join(', ')}</p>
                      <p className="text-sm text-gray-400">{result.demographics.income}</p>
                    </div>
                  </Card>

                  <Card className="p-4 bg-black/50 border border-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-2 mb-4">
                      <Briefcase className="h-5 w-5 text-purple-400" />
                      <h3 className="font-semibold text-white">Potential Investors</h3>
                    </div>
                    <div className="space-y-2">
                      {result.potentialInvestors.map((investor, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-gray-300">{investor.name}</p>
                          <p className="text-gray-400">{investor.focus}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card className="p-4 bg-black/50 border border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Projected Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={result.marketData.growthProjection}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="users" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="p-4 bg-black/50 border border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Age Demographics</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={result.marketData.demographicBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            {result.marketData.demographicBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="p-4 md:col-span-2 bg-black/50 border border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">Competitive Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.marketData.competitorComparison}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="#fff" />
                          <YAxis stroke="#fff" />
                          <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                          <Legend />
                          <Bar dataKey="yours" fill="#8884d8" name="Your Startup" />
                          <Bar 
                            dataKey="mainCompetitor1" 
                            fill="#82ca9d" 
                            name={result.marketData.competitors.mainCompetitor1} 
                          />
                          <Bar 
                            dataKey="mainCompetitor2" 
                            fill="#ffc658" 
                            name={result.marketData.competitors.mainCompetitor2} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StartupAnalyzer;