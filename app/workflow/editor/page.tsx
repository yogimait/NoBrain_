'use client';

import { useState, useEffect } from 'react';
import { Node, Edge, ReactFlowProvider } from 'reactflow'; 
import Sidebar from '@/components/Sidebar';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import NodeConfigPanel from '@/components/NodeConfigPanel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plug, Rows, Rocket, ArrowLeft, Brain, ArrowRight, Bot, Mail, MessageSquare } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function WorkflowEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAIGenerated = searchParams.get('mode') === 'ai-generated';
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Initialize with dummy workflow if AI-generated
  useEffect(() => {
    if (isAIGenerated && nodes.length === 0) {
      const dummyNodes: Node[] = [
        {
          id: 'node-1',
          type: 'custom',
          position: { x: 100, y: 100 },
          data: { 
            label: 'RSS Feed', 
            icon: <Plug size={16} /> 
          },
        },
        {
          id: 'node-2',
          type: 'custom',
          position: { x: 400, y: 100 },
          data: { 
            label: 'AI Summarizer', 
            icon: <Rows size={16} /> 
          },
        },
        {
          id: 'node-3',
          type: 'custom',
          position: { x: 100, y: 300 },
          data: { 
            label: 'Email Service', 
            icon: <Mail size={16} /> 
          },
        },
        {
          id: 'node-4',
          type: 'custom',
          position: { x: 400, y: 300 },
          data: { 
            label: 'Slack Message', 
            icon: <MessageSquare size={16} /> 
          },
        },
      ];

      const dummyEdges: Edge[] = [
        {
          id: 'edge-1-2',
          source: 'node-1',
          target: 'node-2',
          type: 'smoothstep',
        },
        {
          id: 'edge-2-3',
          source: 'node-2',
          target: 'node-3',
          type: 'smoothstep',
        },
        {
          id: 'edge-2-4',
          source: 'node-2',
          target: 'node-4',
          type: 'smoothstep',
        },
      ];

      setNodes(dummyNodes);
      setEdges(dummyEdges);
    }
  }, [isAIGenerated, nodes.length]);

  const addNode = (nodeType: string) => {
    // This function remains the same
    let icon;
    switch (nodeType) {
        case 'Web Scraper': icon = <Plug size={16} />; break;
        case 'AI Summarizer': icon = <Rows size={16} />; break;
        case 'Gemini API': icon = <Brain size={16} />; break;
        case 'GPT-4': icon = <Brain size={16} />; break;
        case 'Claude': icon = <Brain size={16} />; break;
        case 'Twitter API': icon = <Plug size={16} />; break;
        case 'LinkedIn API': icon = <Plug size={16} />; break;
        case 'Instagram API': icon = <Plug size={16} />; break;
        case 'Email Service': icon = <Plug size={16} />; break;
        case 'Slack Message': icon = <Plug size={16} />; break;
        case 'RSS Feed': icon = <Plug size={16} />; break;
        case 'Webhook': icon = <Plug size={16} />; break;
        case 'Database': icon = <Plug size={16} />; break;
        case 'File Upload': icon = <Plug size={16} />; break;
        case 'Text Processor': icon = <Plug size={16} />; break;
        case 'Image Processor': icon = <Plug size={16} />; break;
        case 'Data Transformer': icon = <Plug size={16} />; break;
        case 'Condition Check': icon = <Plug size={16} />; break;
        case 'Delay': icon = <Plug size={16} />; break;
        case 'Schedule': icon = <Plug size={16} />; break;
        case 'Loop': icon = <Plug size={16} />; break;
        case 'Merge': icon = <Plug size={16} />; break;
        case 'AI Text Generator': icon = <Brain size={16} />; break;
        case 'Content Polisher': icon = <Plug size={16} />; break;
        case 'Sentiment Analyzer': icon = <Plug size={16} />; break;
        case 'Email Generator': icon = <Plug size={16} />; break;
        // ... other cases
        default: icon = <Plug size={16} />;
    }
    const newNode: Node = {
      id: String(Date.now() + Math.random()),
      type: 'custom',
      position: { x: 250, y: 50 + nodes.length * 50 },
      data: { label: nodeType, icon: icon },
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const selectNode = (id: string) => {
    setSelectedNodeId(id);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-gray-950 to-purple-950/20 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900/60 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-300">NoBrain</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300"
                onClick={() => router.push(isAIGenerated ? '/workflow/ai-summary' : '/workflow/create')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push('/workflow/credentials')}
                disabled={nodes.length === 0}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area that fills the remaining space */}
      <main className="flex flex-1 overflow-hidden">
        <ReactFlowProvider>
          <Sidebar addNode={addNode} />
          <div className="flex-1 relative">
            {/* AI Generated Banner */}
            {isAIGenerated && (
              <div className="absolute top-4 left-4 right-4 z-10">
                <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Bot className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-green-400 font-semibold">AI-Generated Workflow</h3>
                      <p className="text-gray-300 text-sm">This workflow was created by our AI. You can edit, add, or remove nodes as needed.</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => {
                        // Clear the AI-generated flag and reset to empty workflow
                        router.push('/workflow/editor');
                      }}
                    >
                      Start Fresh
                    </Button>
                  </div>
                </Card>
              </div>
            )}
            
            <WorkflowCanvas
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
              onNodeClick={selectNode}
            />
          </div>
          {selectedNodeId && (
            <NodeConfigPanel
              node={nodes.find((n) => n.id === selectedNodeId) || null}
              onClose={() => setSelectedNodeId(null)}
            />
          )}
        </ReactFlowProvider>
      </main>
    </div>
  );
}