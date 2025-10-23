'use client';

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Plug, Rows, Edit, MessageSquare, Bot, Text, Mail } from 'lucide-react';

interface WorkflowCanvasProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodeClick: (id: string) => void;
}

// --- Custom Node Component (FIXED) ---
interface CustomNodeProps {
  data: {
    label: string;
    icon: React.ReactElement; // FIX: Added icon to the props interface
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
      <div className="p-1.5 bg-gray-700/50 rounded-md text-blue-300">
        {data.icon} {/* FIX: Render the icon from props */}
      </div>
      <span className="font-semibold text-gray-200">{data.label}</span>
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-blue-500" />
    </Card>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function WorkflowCanvas({ nodes, setNodes, edges, setEdges, onNodeClick }: WorkflowCanvasProps) {
  const reactFlowInstance = useReactFlow();

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onNodeClickHandler = useCallback((event: React.MouseEvent, node: Node) => onNodeClick(node.id), [onNodeClick]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      let icon = <Plug size={16} />;
      switch (type) {
        case 'Web Scraper': icon = <Plug size={16} />; break;
        case 'AI Summarizer': icon = <Rows size={16} />; break;
        case 'Slack Message': icon = <MessageSquare size={16} />; break;
        case 'Content Polisher': icon = <Edit size={16} />; break;
        case 'AI Text Generator': icon = <Bot size={16} />; break;
        case 'Sentiment Analyzer': icon = <Text size={16} />; break;
        case 'Email Generator': icon = <Mail size={16} />; break;
      }

      const newNode: Node = {
        id: `dndnode_${+new Date()}`,
        type: 'custom',
        position,
        data: { label: type, icon: icon },
      };
      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]
  );

  return (
    <div className="reactflow-wrapper flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes} // FIX: Re-enabled custom node types
        fitView
      >
        <Background gap={16} size={1} className="!bg-gray-950" />
        <MiniMap nodeColor="#3B82F6" maskColor="rgba(15, 23, 42, 0.7)" />
        <Controls className="[&_button]:bg-gray-800 [&_button]:border-gray-700 [&_button:hover]:bg-blue-600" />
      </ReactFlow>
    </div>
  );
}