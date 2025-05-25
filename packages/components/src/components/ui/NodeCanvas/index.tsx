// @ts-nocheck
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, X, Trash2, Save, Play, BrainCircuit, Box, ArrowRight, Database, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NodeCanvasProps {
  className?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  onSave?: (data: { nodes: Node[]; edges: Edge[] }) => void;
  onRun?: (data: { nodes: Node[]; edges: Edge[] }) => void;
  readOnly?: boolean;
}

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface NodeType {
  type: string;
  label: string;
  icon: React.ReactNode;
  inputs: number;
  outputs: number;
  config?: Record<string, any>;
}

// Define the available node types
const NODE_TYPES: NodeType[] = [
  { 
    type: "input", 
    label: "Input", 
    icon: <FileText size={20} />, 
    inputs: 0, 
    outputs: 1,
    config: { text: "Enter your input here" }
  },
  { 
    type: "llm", 
    label: "LLM", 
    icon: <BrainCircuit size={20} />, 
    inputs: 1, 
    outputs: 1,
    config: { model: "gpt-4", temperature: 0.7 }
  },
  { 
    type: "function", 
    label: "Function", 
    icon: <Box size={20} />, 
    inputs: 1, 
    outputs: 1,
    config: { name: "process", code: "return input;" }
  },
  { 
    type: "database", 
    label: "Database", 
    icon: <Database size={20} />, 
    inputs: 1, 
    outputs: 1,
    config: { source: "default" }
  },
  { 
    type: "output", 
    label: "Output", 
    icon: <ArrowRight size={20} />, 
    inputs: 1, 
    outputs: 0,
    config: { format: "text" }
  },
];

export const NodeCanvas: React.FC<NodeCanvasProps> = ({
  className,
  initialNodes = [],
  initialEdges = [],
  onSave,
  onRun,
  readOnly = false
}) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [draggingNode, setDraggingNode] = useState<Node | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [connecting, setConnecting] = useState<{ nodeId: string; output: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"canvas" | "json">("canvas");
  const [jsonView, setJsonView] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize the canvas offset
  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setCanvasOffset({ x: rect.left, y: rect.top });
    }
  }, []);

  // Update JSON view when nodes or edges change
  useEffect(() => {
    const data = { nodes, edges };
    setJsonView(JSON.stringify(data, null, 2));
  }, [nodes, edges]);

  // Add a new node
  const addNode = useCallback((type: string) => {
    const nodeType = NODE_TYPES.find(t => t.type === type);
    if (!nodeType) return;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      data: { ...nodeType.config || {} }
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  }, []);

  // Handle node selection
  const selectNode = useCallback((node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle node deselection
  const deselectNode = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle node deletion
  const deleteNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  // Start connecting nodes
  const startConnecting = useCallback((nodeId: string, output: number) => {
    setConnecting({ nodeId, output });
  }, []);

  // End connecting nodes
  const endConnecting = useCallback((targetNodeId: string, input: number) => {
    if (!connecting) return;
    
    // Prevent connecting to self
    if (connecting.nodeId === targetNodeId) {
      setConnecting(null);
      return;
    }
    
    // Create a new edge
    const newEdge: Edge = {
      id: `edge-${connecting.nodeId}-${targetNodeId}`,
      source: connecting.nodeId,
      target: targetNodeId
    };
    
    // Check if this edge already exists
    const edgeExists = edges.some(
      edge => edge.source === connecting.nodeId && edge.target === targetNodeId
    );
    
    if (!edgeExists) {
      setEdges(prev => [...prev, newEdge]);
    }
    
    setConnecting(null);
  }, [connecting, edges]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (draggingNode) {
      const newX = e.clientX - canvasOffset.x;
      const newY = e.clientY - canvasOffset.y;
      
      setNodes(prev => 
        prev.map(node => 
          node.id === draggingNode.id 
            ? { ...node, position: { x: newX, y: newY } } 
            : node
        )
      );
    }
  }, [draggingNode, canvasOffset]);

  // Handle mouse up to end dragging
  const handleMouseUp = useCallback(() => {
    setDraggingNode(null);
  }, []);

  // Handle node data change
  const handleNodeDataChange = useCallback((nodeId: string, key: string, value: any) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, [key]: value } } 
          : node
      )
    );
    
    // Update selected node if it's the one being changed
    if (selectedNode?.id === nodeId) {
      setSelectedNode(prev => prev ? { ...prev, data: { ...prev.data, [key]: value } } : null);
    }
  }, [selectedNode]);

  // Handle save
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave({ nodes, edges });
    }
    
    try {
      localStorage.setItem('nodeCanvas', JSON.stringify({ nodes, edges }));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to save workflow: " + (error instanceof Error ? error.message : String(error)));
    }
  }, [nodes, edges, onSave]);

  // Handle run
  const handleRun = useCallback(() => {
    if (onRun) {
      onRun({ nodes, edges });
    } else {
      setErrorMessage("Run handler not implemented");
    }
  }, [nodes, edges, onRun]);

  // Render a node
  const renderNode = useCallback((node: Node) => {
    const nodeType = NODE_TYPES.find(t => t.type === node.type);
    if (!nodeType) return null;
    
    const isSelected = selectedNode?.id === node.id;
    
    return (
      <div
        key={node.id}
        className={cn(
          "absolute bg-white border rounded-lg shadow-md p-3 w-48 transition-all",
          isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
        )}
        style={{ 
          left: `${node.position.x}px`, 
          top: `${node.position.y}px`,
          zIndex: isSelected ? 10 : 1
        }}
        onClick={() => selectNode(node)}
        onMouseDown={(e) => {
          e.stopPropagation();
          setDraggingNode(node);
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1 rounded",
              node.type === "input" ? "bg-green-100" :
              node.type === "llm" ? "bg-blue-100" :
              node.type === "function" ? "bg-purple-100" :
              node.type === "database" ? "bg-yellow-100" :
              "bg-red-100"
            )}>
              {nodeType.icon}
            </div>
            <h3 className="text-sm font-medium">{nodeType.label}</h3>
          </div>
          
          {!readOnly && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(node.id);
              }}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
        
        <div className="text-xs text-gray-500 truncate mb-1">
          {node.id}
        </div>
        
        <div className="flex justify-between mt-2">
          {/* Input ports */}
          <div className="flex flex-col space-y-2">
            {Array.from({ length: nodeType.inputs }).map((_, i) => (
              <div 
                key={`in-${i}`}
                className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (connecting) {
                    endConnecting(node.id, i);
                  }
                }}
              />
            ))}
          </div>
          
          {/* Output ports */}
          <div className="flex flex-col space-y-2">
            {Array.from({ length: nodeType.outputs }).map((_, i) => (
              <div 
                key={`out-${i}`}
                className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  startConnecting(node.id, i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }, [selectedNode, deleteNode, selectNode, connecting, startConnecting, endConnecting, readOnly]);

  // Render an edge
  const renderEdge = useCallback((edge: Edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;
    
    const sourceType = NODE_TYPES.find(t => t.type === sourceNode.type);
    const targetType = NODE_TYPES.find(t => t.type === targetNode.type);
    
    if (!sourceType || !targetType) return null;
    
    // Calculate the position of the output port of the source node
    const sourceX = sourceNode.position.x + 48 * 3; // Right of the node
    const sourceY = sourceNode.position.y + 24 + 12; // Middle of the node + offset
    
    // Calculate the position of the input port of the target node
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 24 + 12; // Middle of the node + offset
    
    // Define the path
    const path = `M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`;
    
    return (
      <svg 
        key={edge.id} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <path
          d={path}
          stroke="#CBD5E0"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }, [nodes]);

  // Render connecting line when creating an edge
  const renderConnectingLine = useCallback((e: React.MouseEvent) => {
    if (!connecting) return null;
    
    const sourceNode = nodes.find(n => n.id === connecting.nodeId);
    if (!sourceNode) return null;
    
    const sourceType = NODE_TYPES.find(t => t.type === sourceNode.type);
    if (!sourceType) return null;
    
    // Calculate the position of the output port of the source node
    const sourceX = sourceNode.position.x + 48 * 3; // Right of the node
    const sourceY = sourceNode.position.y + 24 + 12; // Middle of the node + offset
    
    // Calculate the mouse position relative to the canvas
    const mouseX = e.clientX - canvasOffset.x;
    const mouseY = e.clientY - canvasOffset.y;
    
    // Define the path
    const path = `M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${mouseX - 50} ${mouseY}, ${mouseX} ${mouseY}`;
    
    return (
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <path
          d={path}
          stroke="#3182CE"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
        />
      </svg>
    );
  }, [connecting, nodes, canvasOffset]);

  return (
    <Card className={cn("border shadow-md overflow-hidden w-full", className)}>
      <CardHeader className="bg-gray-100 px-4 py-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={20} />
          <CardTitle className="text-lg">AI Workflow Builder</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs",
              activeTab === "canvas" ? "bg-white shadow-sm" : ""
            )}
            onClick={() => setActiveTab("canvas")}
          >
            Canvas
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs",
              activeTab === "json" ? "bg-white shadow-sm" : ""
            )}
            onClick={() => setActiveTab("json")}
          >
            JSON
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {activeTab === "canvas" ? (
          <>
            {!readOnly && (
              <div className="p-3 border-b flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium mr-2">Add Node:</span>
                {NODE_TYPES.map(nodeType => (
                  <Button
                    key={nodeType.type}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 h-8"
                    onClick={() => addNode(nodeType.type)}
                  >
                    <div className={cn(
                      "p-1 rounded",
                      nodeType.type === "input" ? "bg-green-100" :
                      nodeType.type === "llm" ? "bg-blue-100" :
                      nodeType.type === "function" ? "bg-purple-100" :
                      nodeType.type === "database" ? "bg-yellow-100" :
                      "bg-red-100"
                    )}>
                      {nodeType.icon}
                    </div>
                    <span className="text-xs">{nodeType.label}</span>
                  </Button>
                ))}
              </div>
            )}
            
            <div className="flex h-[500px]">
              <div 
                ref={canvasRef}
                className="relative flex-grow bg-gray-50 overflow-hidden"
                onClick={deselectNode}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Render edges */}
                {edges.map(renderEdge)}
                
                {/* Render connecting line */}
                {connecting && handleMouseMove && renderConnectingLine(handleMouseMove)}
                
                {/* Render nodes */}
                {nodes.map(renderNode)}
              </div>
              
              {selectedNode && (
                <div className="w-64 border-l bg-white p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Node Properties</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={deselectNode}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Node ID (read-only) */}
                    <div>
                      <label className="text-xs font-medium block mb-1">ID</label>
                      <Input value={selectedNode.id} disabled size="sm" className="h-8 text-xs" />
                    </div>
                    
                    {/* Node type (read-only) */}
                    <div>
                      <label className="text-xs font-medium block mb-1">Type</label>
                      <Input value={selectedNode.type} disabled size="sm" className="h-8 text-xs" />
                    </div>
                    
                    {/* Node properties (editable) */}
                    {Object.entries(selectedNode.data || {}).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-xs font-medium block mb-1 capitalize">
                          {key}
                        </label>
                        <Input 
                          value={String(value)}
                          onChange={(e) => handleNodeDataChange(selectedNode.id, key, e.target.value)}
                          size="sm"
                          className="h-8 text-xs"
                          disabled={readOnly}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-4">
            <ScrollArea className="h-[500px] w-full rounded-md border bg-gray-50 p-4">
              <pre className="text-xs font-mono">{jsonView}</pre>
            </ScrollArea>
          </div>
        )}
        
        {errorMessage && (
          <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
        
        {!readOnly && (
          <div className="p-3 border-t flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleSave}
            >
              <Save size={16} />
              <span>Save</span>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleRun}
            >
              <Play size={16} />
              <span>Run</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 