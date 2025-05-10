"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Bell,
  Menu,
  MessageSquare,
  BrainCircuit,
  FileText,
  Image,
  Code,
  Settings,
  LogOut,
  Zap,
  ChevronDown,
  ChevronUp,
  Filter,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Sample data for dashboard
const models = [
  { name: "GPT-4", type: "LLM", tokens: 2845233, cost: 67.32, status: "active" },
  { name: "Stable Diffusion", type: "Image", tokens: 825132, cost: 32.18, status: "active" },
  { name: "Whisper", type: "Audio", tokens: 412850, cost: 12.95, status: "inactive" },
  { name: "CodeLlama", type: "Code", tokens: 1532420, cost: 45.61, status: "active" },
  { name: "Mistral", type: "LLM", tokens: 1248560, cost: 28.42, status: "active" },
];

const recentRequests = [
  {
    id: "req_2940258",
    model: "GPT-4",
    type: "Chat",
    status: "completed",
    duration: "1.2s",
    tokens: 412,
    time: "1m ago"
  },
  {
    id: "req_2940257",
    model: "Stable Diffusion",
    type: "Image",
    status: "completed",
    duration: "2.8s",
    tokens: 0,
    time: "3m ago"
  },
  {
    id: "req_2940256",
    model: "GPT-4",
    type: "Chat",
    status: "completed",
    duration: "0.8s",
    tokens: 124,
    time: "8m ago"
  },
  {
    id: "req_2940255",
    model: "CodeLlama",
    type: "Completion",
    status: "failed",
    duration: "0.0s",
    tokens: 0,
    time: "12m ago"
  },
  {
    id: "req_2940254",
    model: "Mistral",
    type: "Chat",
    status: "completed",
    duration: "0.9s",
    tokens: 256,
    time: "15m ago"
  }
];

export default function DashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside 
        className={`bg-gray-900 text-white w-64 shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
              <BrainCircuit className="h-5 w-5 text-purple-600" />
            </div>
            {sidebarOpen && <span className="text-lg font-bold">Empire AI</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <NavItem icon={<Activity />} label="Dashboard" active={true} collapsed={!sidebarOpen} />
            <NavItem icon={<MessageSquare />} label="Conversations" collapsed={!sidebarOpen} />
            <NavItem icon={<Image />} label="Image Generation" collapsed={!sidebarOpen} />
            <NavItem icon={<FileText />} label="Documents" collapsed={!sidebarOpen} />
            <NavItem icon={<Code />} label="Code Generation" collapsed={!sidebarOpen} />
            <NavItem icon={<BarChart />} label="Analytics" collapsed={!sidebarOpen} />
            
            <li className="pt-6 mt-6 border-t border-gray-800">
              <h3 className={`mb-2 text-xs uppercase text-gray-500 ${!sidebarOpen && "text-center"}`}>
                {sidebarOpen ? "Settings" : ""}
              </h3>
              <ul className="space-y-2">
                <NavItem icon={<Settings />} label="Settings" collapsed={!sidebarOpen} />
                <NavItem icon={<HelpCircle />} label="Help" collapsed={!sidebarOpen} />
                <NavItem icon={<LogOut />} label="Logout" collapsed={!sidebarOpen} />
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 relative h-10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/assets/images/user.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main Dashboard Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's an overview of your AI platform.</p>
          </div>
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Requests" 
              value="124,329" 
              change="+5.2%" 
              trend="up" 
              icon={<Activity className="h-8 w-8 text-white" />}
              color="bg-blue-500"
            />
            <StatCard 
              title="Active Users" 
              value="2,845" 
              change="+12.5%" 
              trend="up" 
              icon={<Users className="h-8 w-8 text-white" />}
              color="bg-green-500"
            />
            <StatCard 
              title="Token Usage" 
              value="8.2M" 
              change="+3.8%" 
              trend="up" 
              icon={<Zap className="h-8 w-8 text-white" />}
              color="bg-purple-500"
            />
            <StatCard 
              title="Cost" 
              value="$215.32" 
              change="-2.3%" 
              trend="down" 
              icon={<DollarSign className="h-8 w-8 text-white" />}
              color="bg-red-500"
            />
          </div>
          
          {/* Charts & Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Usage Overview</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Daily token usage across all models
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-500">
                    Chart Placeholder
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Model Distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Model Distribution</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Token usage by model
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-sm">GPT-4</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm">Stable Diffusion</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                        <span className="text-sm">CodeLlama</span>
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Mistral</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <span className="text-sm">Others</span>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tables Section */}
          <div className="grid grid-cols-1 gap-6">
            <Tabs defaultValue="models" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="models">AI Models</TabsTrigger>
                  <TabsTrigger value="requests">Recent Requests</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <TabsContent value="models">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">Model</th>
                            <th className="py-3 px-4 text-left font-medium">Type</th>
                            <th className="py-3 px-4 text-left font-medium">Tokens</th>
                            <th className="py-3 px-4 text-left font-medium">Cost</th>
                            <th className="py-3 px-4 text-left font-medium">Status</th>
                            <th className="py-3 px-4 text-left font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {models.map((model, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="py-3 px-4 font-medium">{model.name}</td>
                              <td className="py-3 px-4">{model.type}</td>
                              <td className="py-3 px-4">{model.tokens.toLocaleString()}</td>
                              <td className="py-3 px-4">${model.cost.toFixed(2)}</td>
                              <td className="py-3 px-4">
                                <Badge variant={model.status === "active" ? "default" : "secondary"}>
                                  {model.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requests">
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-4 text-left font-medium">Request ID</th>
                            <th className="py-3 px-4 text-left font-medium">Model</th>
                            <th className="py-3 px-4 text-left font-medium">Type</th>
                            <th className="py-3 px-4 text-left font-medium">Status</th>
                            <th className="py-3 px-4 text-left font-medium">Duration</th>
                            <th className="py-3 px-4 text-left font-medium">Tokens</th>
                            <th className="py-3 px-4 text-left font-medium">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentRequests.map((request, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="py-3 px-4 font-mono text-xs">{request.id}</td>
                              <td className="py-3 px-4">{request.model}</td>
                              <td className="py-3 px-4">{request.type}</td>
                              <td className="py-3 px-4">
                                <Badge variant={request.status === "completed" ? "default" : "destructive"}>
                                  {request.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">{request.duration}</td>
                              <td className="py-3 px-4">{request.tokens}</td>
                              <td className="py-3 px-4 text-gray-500">{request.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Navigation Item Component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, active = false, collapsed = false }: NavItemProps) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
          active
            ? "bg-gray-800 text-white"
            : "text-gray-400 hover:text-white hover:bg-gray-800"
        }`}
      >
        <span className="mr-3">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </a>
    </li>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, trend, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center mt-1">
              {trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
                {change}
              </span>
            </div>
          </div>
          <div className={`rounded-full p-3 ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Missing components for DropdownMenu
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
} 