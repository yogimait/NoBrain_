'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Handle,
  Position,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Brain, 
  ArrowLeft, 
  CheckCircle, 
  Rocket, 
  Play, 
  Settings,
  BarChart3,
  Calendar,
  Users,
  Zap,
  Bot,
  Mail,
  MessageSquare,
  Database,
  Twitter,
  Linkedin,
  Instagram,
  Rss,
  Upload
} from 'lucide-react';

// Custom Node Component for the workflow chart
interface CustomNodeProps {
  data: {
    label: string;
    icon: React.ReactElement;
    color: string;
  };
  selected?: boolean;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, selected = false }) => {
  const baseBorderStyle = '1px solid rgba(59, 130, 246, 0.5)';
  const selectedBorderStyle = '1px solid rgba(59, 130, 246, 1)';
  const baseShadowStyle = '0 0 10px rgba(59, 130, 246, 0.4), inset 0 0 5px rgba(59, 130, 246, 0.2)';
  const selectedShadowStyle = '0 0 15px rgba(59, 130, 246, 0.7), inset 0 0 8px rgba(59, 130, 246, 0.4)';

  return (
    <Card
      className="relative p-3 min-w-[150px] bg-gray-800/70 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-200"
      style={{
        border: selected ? selectedBorderStyle : baseBorderStyle,
        boxShadow: selected ? selectedShadowStyle : baseShadowStyle,
      }}
    >
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-purple-500" />
      <div className={`p-1.5 bg-gray-700/50 rounded-md ${data.color}`}>
        {data.icon}
      </div>
      <span className="font-semibold text-gray-200">{data.label}</span>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-blue-500" />
    </Card>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function CompleteWorkflowPage() {
  const router = useRouter();
  const [workflowData, setWorkflowData] = useState<{ nodes: Node[], edges: Edge[] }>({
    nodes: [],
    edges: []
  });

  // Mock workflow data - in a real app, this would come from the previous steps
  useEffect(() => {
    const mockNodes: Node[] = [
      {
        id: 'node-1',
        type: 'custom',
        position: { x: 100, y: 100 },
        data: { 
          label: 'RSS Feed', 
          icon: <Rss className="w-4 h-4" />,
          color: 'text-orange-300'
        },
      },
      {
        id: 'node-2',
        type: 'custom',
        position: { x: 400, y: 100 },
        data: { 
          label: 'GPT-4 Agent', 
          icon: <Bot className="w-4 h-4" />,
          color: 'text-green-300'
        },
      },
      {
        id: 'node-3',
        type: 'custom',
        position: { x: 100, y: 300 },
        data: { 
          label: 'Email Service', 
          icon: <Mail className="w-4 h-4" />,
          color: 'text-red-300'
        },
      },
      {
        id: 'node-4',
        type: 'custom',
        position: { x: 400, y: 300 },
        data: { 
          label: 'LinkedIn API', 
          icon: <Linkedin className="w-4 h-4" />,
          color: 'text-blue-300'
        },
      },
    ];

    const mockEdges: Edge[] = [
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

    setWorkflowData({ nodes: mockNodes, edges: mockEdges });
  }, []);

  const workflowStats = {
    totalNodes: workflowData.nodes.length,
    totalConnections: workflowData.edges.length,
    estimatedRuns: '24/7',
    lastRun: 'Just now',
    successRate: '98.5%'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950/20 to-purple-950/20">
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
                onClick={() => router.push('/workflow/editor')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            You just created a NoBrainer! 🎉
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Your workflow is now live and running automatically. It will process data, 
            make decisions, and execute actions without any manual intervention.
          </p>
        </div>

        {/* Workflow Chart */}
        <Card className="bg-gray-900/60 border-gray-700/50 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Workflow</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>
          </div>
          
          <div className="h-96 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
            <ReactFlowProvider>
              <ReactFlow
                nodes={workflowData.nodes}
                edges={workflowData.edges}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
              >
                <Background gap={16} size={1} className="!bg-gray-950" />
                <MiniMap nodeColor="#3B82F6" maskColor="rgba(15, 23, 42, 0.7)" />
                <Controls className="[&_button]:bg-gray-800 [&_button]:border-gray-700 [&_button:hover]:bg-blue-600" />
              </ReactFlow>
            </ReactFlowProvider>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Settings className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Nodes</p>
                <p className="text-white text-2xl font-bold">{workflowStats.totalNodes}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Connections</p>
                <p className="text-white text-2xl font-bold">{workflowStats.totalConnections}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Runs</p>
                <p className="text-white text-2xl font-bold">{workflowStats.estimatedRuns}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-white text-2xl font-bold">{workflowStats.successRate}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Monitor Your Workflow</h3>
              <p className="text-gray-400">
                Track performance, view logs, and monitor the health of your automation
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Create More Workflows</h3>
              <p className="text-gray-400">
                Build additional automations to streamline more of your processes
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push('/workflow/create')}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Create New Workflow
              </Button>
            </div>
          </Card>
        </div>

        {/* Success Tips */}
        <Card className="bg-green-500/10 border-green-500/30 p-6 mt-8">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
            <div>
              <h4 className="text-green-400 font-semibold mb-2">What happens next?</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Your workflow is now running automatically in the background</li>
                <li>• You'll receive notifications for any issues or important events</li>
                <li>• Monitor performance and make adjustments as needed</li>
                <li>• Your data is processed securely and efficiently</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}