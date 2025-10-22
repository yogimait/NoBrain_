'use client';

import { useState } from 'react';
import { Node, Edge, ReactFlowProvider } from 'reactflow'; 
import Sidebar from '@/components/Sidebar';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import NodeConfigPanel from '@/components/NodeConfigPanel';
import Navbar from '@/components/Navbar'; // <-- IMPORT the new Navbar
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plug, Rows, Rocket } from 'lucide-react';

export default function HomePage() {
  const [mode, setMode] = useState<'landing' | 'builder'>('landing');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const addNode = (nodeType: string) => {
    // This function remains the same
    let icon;
    switch (nodeType) {
        case 'Web Scraper': icon = <Plug size={16} />; break;
        case 'AI Summarizer': icon = <Rows size={16} />; break;
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

  if (mode === 'landing') {
    // The landing page remains unchanged and works as intended.
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="flex w-full justify-between items-center mb-16 max-w-7xl relative z-10">
            <div className="flex items-center gap-3">
                <Rocket className="w-8 h-8 text-blue-400" />
                <span className="text-3xl font-bold tracking-wide text-blue-300">NoBrain</span>
            </div>
             <Button variant="outline" className="text-gray-200 border-gray-700 hover:border-blue-500 hover:text-blue-300 transition-all" onClick={() => setMode('builder')}>
                Go to Builder
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl relative z-10">
            <div className="flex flex-col justify-center">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
                AI automation so simple, <br className="hidden md:block"/> it’s a <span className="text-blue-400">No-Brainer.</span>
                </h1>
                <p className="text-lg mb-10 text-gray-300 max-w-md">
                Design and deploy multi-agent AI workflows without writing a single line of code.
                </p>
                <div className="flex gap-4">
                    <Button
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
                        style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
                        onClick={() => setMode('builder')}
                    >
                        Try the Demo
                    </Button>
                    <Button
                        variant="outline"
                        className="text-gray-200 px-8 py-3 rounded-xl font-semibold text-lg border-gray-700 hover:border-purple-500 hover:text-purple-300 transition"
                    >
                        Explore Templates
                    </Button>
                </div>
            </div>
            <div className="relative flex items-center justify-center">
                <Card className="p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-blue-700/50 rounded-2xl w-full max-w-xl aspect-[16/9] flex items-center justify-center" style={{ boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)' }}>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <Card className="bg-gray-700/50 p-3 rounded-lg flex items-center gap-2 border border-blue-600/50">
                            <Plug className="w-5 h-5 text-blue-300" />
                            <span className="text-sm font-semibold text-white">Web Scraper</span>
                        </Card>
                        <div className="text-blue-400 text-2xl justify-self-center">→</div>
                        <Card className="bg-gray-700/50 p-3 rounded-lg flex items-center gap-2 border border-purple-600/50">
                            <Rows className="w-5 h-5 text-purple-300" />
                            <span className="text-sm font-semibold text-white">Summarizer</span>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
      </main>
    );
  }

  // --- Builder Page JSX (UPDATED) ---
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-gray-950 to-purple-950/20 text-gray-100">
      {/* RENDER THE NEW NAVBAR COMPONENT */}
      <Navbar />

      {/* Main content area that fills the remaining space */}
      <main className="flex flex-1 pt-16 overflow-hidden">
        <ReactFlowProvider>
          <Sidebar addNode={addNode} />
          <div className="flex-1 relative">
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