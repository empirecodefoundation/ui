"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import icons
import { 
  Rocket, Power, Shield, Gauge, Zap, Star, 
  RotateCw, Wifi, Send, Code, Copy, Download,
  XCircle, CheckCircle, AlertCircle, InfoIcon
} from "lucide-react";

interface StarshipUIProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  status?: "idle" | "ready" | "warning" | "critical" | "offline";
  theme?: "dark" | "light" | "system";
  showPanel?: boolean;
  initialTab?: string;
  onCommand?: (command: string) => void;
  onSystemChange?: (status: string) => void;
  children?: React.ReactNode;
}

interface SystemLog {
  id: string;
  timestamp: Date;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export function StarshipUI({ 
  name = "Stellar Voyager",
  status = "idle",
  theme = "dark",
  showPanel = true,
  initialTab = "dashboard",
  onCommand,
  onSystemChange,
  className,
  children,
  ...props
}: StarshipUIProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [power, setPower] = useState(75);
  const [shields, setShields] = useState(92);
  const [command, setCommand] = useState("");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: "1",
      timestamp: new Date(),
      message: "System initialized",
      type: "info"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 60000),
      message: "All systems nominal",
      type: "success"
    }
  ]);
  
  // Simulated metrics
  const [metrics, setMetrics] = useState({
    temperature: 36.5,
    radiation: 0.04,
    oxygen: 98.7,
    pressure: 1.02,
    velocity: 0,
    coordinates: { x: "24.526", y: "-18.847", z: "3.091" }
  });
  
  // System modules status
  const [modules, setModules] = useState([
    { id: "nav", name: "Navigation", status: "online", uptime: "24h 12m" },
    { id: "propulsion", name: "Propulsion", status: "online", uptime: "24h 12m" },
    { id: "life", name: "Life Support", status: "online", uptime: "24h 12m" },
    { id: "comms", name: "Communications", status: "online", uptime: "24h 12m" },
    { id: "sensors", name: "Sensors", status: "online", uptime: "24h 12m" },
    { id: "power", name: "Power Systems", status: "online", uptime: "24h 12m" }
  ]);
  
  // Simulated navigation data
  const [navigation, setNavigation] = useState({
    destination: "Kepler-186f",
    eta: "364 days 8 hours",
    distance: "487.28 light years",
    trajectory: "optimal",
    fuelReserves: 94.2
  });
  
  // Simulate status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random small fluctuations in metrics
      setMetrics(prev => ({
        ...prev,
        temperature: +(prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1),
        radiation: +(prev.radiation + (Math.random() * 0.01 - 0.005)).toFixed(3),
        oxygen: +(prev.oxygen + (Math.random() * 0.2 - 0.1)).toFixed(1),
        pressure: +(prev.pressure + (Math.random() * 0.01 - 0.005)).toFixed(2),
        velocity: prev.velocity
      }));
      
      // Small fluctuations in power and shields
      setPower(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));
      setShields(prev => Math.min(100, Math.max(0, prev + (Math.random() * 1 - 0.5))));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle status changes
  useEffect(() => {
    if (onSystemChange) {
      onSystemChange(currentStatus);
    }
  }, [currentStatus, onSystemChange]);
  
  // Execute command
  const executeCommand = () => {
    if (!command.trim()) return;
    
    // Add to logs
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      message: `Command executed: ${command}`,
      type: "info" as const
    };
    
    setSystemLogs(prev => [newLog, ...prev]);
    
    // Call the onCommand callback if provided
    if (onCommand) {
      onCommand(command);
    }
    
    // Process simple commands for demo purposes
    if (command.toLowerCase().includes("status")) {
      addSystemLog(`All systems ${currentStatus}`, "info");
    } else if (command.toLowerCase().includes("power")) {
      if (command.toLowerCase().includes("increase")) {
        setPower(prev => Math.min(100, prev + 10));
        addSystemLog("Power levels increased by 10%", "success");
      } else if (command.toLowerCase().includes("decrease")) {
        setPower(prev => Math.max(0, prev - 10));
        addSystemLog("Power levels decreased by 10%", "warning");
      }
    } else if (command.toLowerCase().includes("shield")) {
      if (command.toLowerCase().includes("raise")) {
        setShields(prev => Math.min(100, prev + 15));
        addSystemLog("Shields raised by 15%", "success");
      } else if (command.toLowerCase().includes("lower")) {
        setShields(prev => Math.max(0, prev - 15));
        addSystemLog("Shields lowered by 15%", "warning");
      }
    } else if (command.toLowerCase().includes("course")) {
      addSystemLog("Course adjustment calculated", "success");
      setNavigation(prev => ({
        ...prev,
        trajectory: "recalculating...",
      }));
      
      // Simulate course recalculation
      setTimeout(() => {
        setNavigation(prev => ({
          ...prev,
          trajectory: "optimal",
        }));
        addSystemLog("New course trajectory set: optimal", "success");
      }, 2000);
    }
    
    // Clear the command input
    setCommand("");
  };
  
  // Helper to add log entries
  const addSystemLog = (message: string, type: SystemLog["type"]) => {
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      message,
      type
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };
  
  // Copy logs to clipboard
  const copyLogs = () => {
    const logText = systemLogs
      .map(log => `[${log.timestamp.toISOString()}] ${log.type.toUpperCase()}: ${log.message}`)
      .join('\n');
    
    navigator.clipboard.writeText(logText);
    addSystemLog("System logs copied to clipboard", "success");
  };
  
  // Get status color
  const getStatusColor = () => {
    switch (currentStatus) {
      case "ready": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      case "offline": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  };
  
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden border border-gray-800 bg-black text-white relative",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className={`ml-3 px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1 ${
            currentStatus === "ready" ? "bg-green-900 text-green-300" :
            currentStatus === "warning" ? "bg-yellow-900 text-yellow-300" :
            currentStatus === "critical" ? "bg-red-900 text-red-300" :
            currentStatus === "offline" ? "bg-gray-800 text-gray-400" :
            "bg-blue-900 text-blue-300"
          }`}>
            <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
            <span>{currentStatus.toUpperCase()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-400 hover:text-white h-8 w-8 p-0"
            onClick={() => {
              const newStatus = currentStatus === "ready" ? "idle" : "ready";
              setCurrentStatus(newStatus);
              addSystemLog(`System status changed to ${newStatus}`, "info");
            }}
          >
            <Power className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-gray-400 hover:text-white h-8 w-8 p-0"
            onClick={() => {
              addSystemLog("Diagnostics scan initiated", "info");
              
              // Simulate diagnostic process
              setTimeout(() => {
                addSystemLog("Diagnostics complete: All systems nominal", "success");
              }, 2000);
            }}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main Interface */}
      <div className="flex flex-col md:flex-row">
        {/* Left Panel - Always visible */}
        <div className="w-full md:w-3/5 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
            </TabsList>
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <h3 className="text-xs uppercase text-gray-500">Power Systems</h3>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Output Level</span>
                        <span>{power.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500" 
                          initial={{ width: 0 }}
                          animate={{ width: `${power}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xs uppercase text-gray-500">Shield Systems</h3>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-400" />
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Integrity</span>
                        <span>{shields.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-purple-500" 
                          initial={{ width: 0 }}
                          animate={{ width: `${shields}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                <h3 className="text-sm font-medium mb-3">Environmental Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Temperature</div>
                    <div className="flex items-baseline">
                      <span className="text-xl">{metrics.temperature}</span>
                      <span className="ml-1 text-xs text-gray-500">°C</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Radiation</div>
                    <div className="flex items-baseline">
                      <span className="text-xl">{metrics.radiation}</span>
                      <span className="ml-1 text-xs text-gray-500">mSv</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Oxygen</div>
                    <div className="flex items-baseline">
                      <span className="text-xl">{metrics.oxygen}</span>
                      <span className="ml-1 text-xs text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Pressure</div>
                    <div className="flex items-baseline">
                      <span className="text-xl">{metrics.pressure}</span>
                      <span className="ml-1 text-xs text-gray-500">atm</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Velocity</div>
                    <div className="flex items-baseline">
                      <span className="text-xl">{metrics.velocity}</span>
                      <span className="ml-1 text-xs text-gray-500">c</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="flex items-center space-x-1">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor()}`}></span>
                      <span className="text-sm">{currentStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Alert Banner - Conditionally rendered */}
              {currentStatus === "warning" && (
                <motion.div 
                  className="border border-yellow-800 bg-yellow-900/30 rounded-lg p-3 flex items-center space-x-2 text-yellow-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <div className="font-medium">System Warning</div>
                    <div className="text-xs">Anomaly detected in sensor array. Maintenance recommended.</div>
                  </div>
                </motion.div>
              )}
              
              {currentStatus === "critical" && (
                <motion.div 
                  className="border border-red-800 bg-red-900/30 rounded-lg p-3 flex items-center space-x-2 text-red-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <XCircle className="h-5 w-5" />
                  <div>
                    <div className="font-medium">CRITICAL ALERT</div>
                    <div className="text-xs">Multiple system failures detected. Immediate action required.</div>
                  </div>
                </motion.div>
              )}
            </TabsContent>
            
            {/* Navigation Tab */}
            <TabsContent value="navigation" className="space-y-4">
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                <h3 className="text-sm font-medium mb-3">Current Navigation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Destination</div>
                    <div className="text-sm font-medium">{navigation.destination}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">ETA</div>
                    <div className="text-sm font-medium">{navigation.eta}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Distance</div>
                    <div className="text-sm font-medium">{navigation.distance}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Trajectory</div>
                    <div className="text-sm font-medium">{navigation.trajectory}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Fuel Reserves</div>
                    <div className="text-sm font-medium">{navigation.fuelReserves}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="flex items-center space-x-1">
                      <span className={`h-2 w-2 rounded-full ${
                        navigation.trajectory === "optimal" ? "bg-green-500" : "bg-blue-500"
                      }`}></span>
                      <span className="text-sm">{
                        navigation.trajectory === "optimal" ? "On Course" : "Calculating"
                      }</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                <h3 className="text-sm font-medium mb-3">Stellar Coordinates</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">X-Axis</div>
                    <div className="text-sm font-mono">{metrics.coordinates.x}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Y-Axis</div>
                    <div className="text-sm font-mono">{metrics.coordinates.y}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Z-Axis</div>
                    <div className="text-sm font-mono">{metrics.coordinates.z}</div>
                  </div>
                </div>
              </div>
              
              {/* Space Map Placeholder */}
              <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/30">
                <div className="p-3 bg-gray-900 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="text-sm font-medium">Deep Space Map</h3>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Gauge className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                      <Star className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 w-full bg-black">
                  {/* Simulated space map with stars */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 200 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-px w-px bg-white rounded-full opacity-70"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 2}px`,
                          height: `${Math.random() * 2}px`,
                          opacity: Math.random() * 0.7 + 0.3,
                        }}
                      />
                    ))}
                    
                    {/* Current location indicator */}
                    <div className="absolute top-1/2 left-1/2 h-3 w-3 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                    </div>
                    
                    {/* Destination indicator */}
                    <div 
                      className="absolute h-2 w-2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ top: '25%', left: '75%' }}
                    >
                      <div className="absolute inset-0 border border-green-500 rounded-full"></div>
                      <div className="absolute inset-0 m-1 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Course line */}
                    <div className="absolute top-1/2 left-1/2 h-px w-1/3 bg-blue-500 opacity-50 transform -translate-y-1/2 rotate-45 origin-left"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Systems Tab */}
            <TabsContent value="systems" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {modules.map(module => (
                  <div 
                    key={module.id}
                    className="border border-gray-800 rounded-lg p-3 bg-gray-900/50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium">{module.name}</h3>
                        <p className="text-xs text-gray-500">Uptime: {module.uptime}</p>
                      </div>
                      <Badge variant={module.status === "online" ? "default" : "destructive"}>
                        {module.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                <h3 className="text-sm font-medium mb-3">System Diagnostics</h3>
                <div className="space-y-3">
                  <Button 
                    size="sm" 
                    className="mr-2"
                    onClick={() => {
                      addSystemLog("Full system diagnostic initiated", "info");
                      
                      // Simulate diagnostic process
                      setTimeout(() => {
                        addSystemLog("Diagnostic complete: All systems operational", "success");
                      }, 3000);
                    }}
                  >
                    Run Diagnostics
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => {
                      addSystemLog("System restart sequence initiated", "warning");
                      
                      // Simulate restart sequence
                      setTimeout(() => {
                        setModules(prev => prev.map(m => ({ ...m, status: "offline" })));
                        setCurrentStatus("offline");
                        addSystemLog("All systems offline", "info");
                        
                        setTimeout(() => {
                          setModules(prev => prev.map(m => ({ ...m, status: "online" })));
                          setCurrentStatus("ready");
                          addSystemLog("System restart complete", "success");
                        }, 3000);
                      }, 2000);
                    }}
                  >
                    Restart Systems
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => {
                      setCurrentStatus(currentStatus === "critical" ? "ready" : "critical");
                      addSystemLog(
                        currentStatus === "critical" 
                          ? "Emergency protocols deactivated" 
                          : "Emergency protocols activated",
                        currentStatus === "critical" ? "success" : "error"
                      );
                    }}
                  >
                    {currentStatus === "critical" ? "Clear Emergency" : "Emergency Protocols"}
                  </Button>
                </div>
              </div>
              
              {/* Network Status */}
              <div className="border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-3 bg-gray-900 border-b border-gray-800">
                  <h3 className="text-sm font-medium">Network Status</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Connected</span>
                    <Badge variant="outline" className="ml-auto">Encrypted</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Bandwidth</span>
                      <span>1.2 TB/s</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Latency</span>
                      <span>0.03 ms</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Signal Strength</span>
                      <span>98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Command Input */}
          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Enter command..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeCommand();
                  }
                }}
                className="bg-gray-900 border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Button 
                onClick={executeCommand}
                disabled={!command.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Execute
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Try commands like "status", "increase power", "raise shields", or "adjust course"
            </p>
          </div>
        </div>
        
        {/* Right Panel - System Logs (collapsible on mobile) */}
        {showPanel && (
          <div className="w-full md:w-2/5 bg-gray-900 border-t md:border-t-0 md:border-l border-gray-800 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">System Logs</h3>
              <div className="flex items-center space-x-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0"
                  onClick={copyLogs}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    const logText = systemLogs
                      .map(log => `[${log.timestamp.toISOString()}] ${log.type.toUpperCase()}: ${log.message}`)
                      .join('\n');
                    
                    const blob = new Blob([logText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `starship_logs_${new Date().toISOString().split('T')[0]}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                    
                    addSystemLog("Logs exported to file", "success");
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0"
                  onClick={() => {
                    setSystemLogs([]);
                    addSystemLog("System logs cleared", "info");
                  }}
                >
                  <XCircle className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            
            <div className="h-[calc(100vh-13rem)] md:h-[30rem] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {systemLogs.map((log) => (
                <div 
                  key={log.id}
                  className={`text-xs p-2 rounded border ${
                    log.type === 'error' ? 'bg-red-900/30 border-red-800 text-red-300' :
                    log.type === 'warning' ? 'bg-yellow-900/30 border-yellow-800 text-yellow-300' :
                    log.type === 'success' ? 'bg-green-900/30 border-green-800 text-green-300' :
                    'bg-gray-900 border-gray-800 text-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    {log.type === 'error' && <XCircle className="h-3 w-3 mr-1" />}
                    {log.type === 'warning' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {log.type === 'success' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {log.type === 'info' && <InfoIcon className="h-3 w-3 mr-1" />}
                    <span className="font-mono text-[10px] text-gray-500">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="mt-1">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Children content - can be used to inject additional UI elements */}
      {children}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.5);
        }
      `}</style>
    </div>
  );
} 