'use client';

import { useState, useRef, useCallback } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import NodeConfigPanel from '@/components/NodeConfigPanel';
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
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Rocket, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Linkedin,
  Twitter,
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  Settings,
  Play,
  Save,
  Eye,
  Brain,
  Wand2,
  Palette,
  Database,
  FileText,
  Bot,
  Globe,
  Smartphone,
  Laptop,
  Server,
  HardDrive,
  Cpu,
  Network,
  Gauge,
  Target,
  BarChart3,
  LineChart,
  Truck,
  Package,
  Map,
  Route,
  Locate,
  Compass,
  Waypoints,
  ArrowUp,
  ArrowDown,
  DollarSign,
  PieChart,
  TrendingDown,
  Minus,
  ArrowRightCircle,
  ArrowLeftCircle,
  ChevronDown,
  ChevronUp,
  Monitor,
  Wifi,
  Signal,
  Battery,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Star,
  Heart,
  Shield,
  Lock,
  Unlock,
  EyeOff,
  Volume2,
  VolumeX,
  WifiOff,
  Terminal,
  Code,
  Bug,
  ShieldCheck,
  AlertTriangle,
  Info,
  Lightbulb,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  Circle,
  Pencil,
  X,
  MapPin,
  Navigation,
  Layers,
  Activity,
  TrendingUp,
  Users,
  Timer,
  RefreshCw,
  Instagram,
  Facebook,
  Youtube,
  Github,
  Slack,
  Bell,
  Link,
  ShoppingCart,
  CreditCard,
  Cloud,
  Video,
  Music,
  Camera,
  Mic,
  Phone,
  MessageCircle,
  Send,
  Share2,
  ThumbsUp,
  Heart as HeartIcon,
  Smile,
  Image,
  File,
  Folder,
  Download,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Rss
} from 'lucide-react';

// Enhanced Platform options
const platforms = [
  // Social Media
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'text-blue-600', category: 'Social Media' },
  { id: 'twitter', name: 'Twitter/X', icon: <Twitter className="w-5 h-5" />, color: 'text-blue-400', category: 'Social Media' },
  { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: 'text-pink-500', category: 'Social Media' },
  { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: 'text-blue-700', category: 'Social Media' },
  { id: 'youtube', name: 'YouTube', icon: <Youtube className="w-5 h-5" />, color: 'text-red-600', category: 'Social Media' },
  { id: 'tiktok', name: 'TikTok', icon: <Video className="w-5 h-5" />, color: 'text-black', category: 'Social Media' },
  
  // Communication
  { id: 'email', name: 'Email', icon: <Mail className="w-5 h-5" />, color: 'text-red-500', category: 'Communication' },
  { id: 'slack', name: 'Slack', icon: <Slack className="w-5 h-5" />, color: 'text-purple-500', category: 'Communication' },
  { id: 'discord', name: 'Discord', icon: <MessageCircle className="w-5 h-5" />, color: 'text-indigo-500', category: 'Communication' },
  { id: 'telegram', name: 'Telegram', icon: <Send className="w-5 h-5" />, color: 'text-blue-500', category: 'Communication' },
  { id: 'whatsapp', name: 'WhatsApp', icon: <Phone className="w-5 h-5" />, color: 'text-green-500', category: 'Communication' },
  
  // Productivity
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-5 h-5" />, color: 'text-green-500', category: 'Productivity' },
  { id: 'notion', name: 'Notion', icon: <FileText className="w-5 h-5" />, color: 'text-gray-600', category: 'Productivity' },
  { id: 'trello', name: 'Trello', icon: <Layers className="w-5 h-5" />, color: 'text-blue-500', category: 'Productivity' },
  { id: 'asana', name: 'Asana', icon: <Target className="w-5 h-5" />, color: 'text-purple-600', category: 'Productivity' },
  
  // Development
  { id: 'github', name: 'GitHub', icon: <Github className="w-5 h-5" />, color: 'text-gray-800', category: 'Development' },
  { id: 'gitlab', name: 'GitLab', icon: <Github className="w-5 h-5" />, color: 'text-orange-500', category: 'Development' },
  
  // E-commerce
  { id: 'shopify', name: 'Shopify', icon: <ShoppingCart className="w-5 h-5" />, color: 'text-green-600', category: 'E-commerce' },
  { id: 'stripe', name: 'Stripe', icon: <CreditCard className="w-5 h-5" />, color: 'text-purple-600', category: 'E-commerce' },
  { id: 'paypal', name: 'PayPal', icon: <DollarSign className="w-5 h-5" />, color: 'text-blue-600', category: 'E-commerce' },
  
  // Cloud Storage
  { id: 'dropbox', name: 'Dropbox', icon: <Cloud className="w-5 h-5" />, color: 'text-blue-600', category: 'Cloud Storage' },
  { id: 'googledrive', name: 'Google Drive', icon: <Cloud className="w-5 h-5" />, color: 'text-green-500', category: 'Cloud Storage' },
  { id: 'onedrive', name: 'OneDrive', icon: <Cloud className="w-5 h-5" />, color: 'text-blue-500', category: 'Cloud Storage' },
  
  // CRM & Sales
  { id: 'salesforce', name: 'Salesforce', icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-600', category: 'CRM & Sales' },
  { id: 'hubspot', name: 'HubSpot', icon: <Target className="w-5 h-5" />, color: 'text-orange-500', category: 'CRM & Sales' },
  
  // Support
  { id: 'zendesk', name: 'Zendesk', icon: <MessageSquare className="w-5 h-5" />, color: 'text-green-600', category: 'Support' },
  { id: 'intercom', name: 'Intercom', icon: <MessageSquare className="w-5 h-5" />, color: 'text-blue-500', category: 'Support' },
  
  // Analytics
  { id: 'google', name: 'Google Analytics', icon: <BarChart3 className="w-5 h-5" />, color: 'text-blue-500', category: 'Analytics' },
  { id: 'mixpanel', name: 'Mixpanel', icon: <BarChart3 className="w-5 h-5" />, color: 'text-purple-500', category: 'Analytics' },
  
  // Automation
  // { id: 'zapier', name: 'Zapier', icon: <Zap className="w-5 h-5" />, color: 'text-orange-500', category: 'Automation' },
  // { id: 'make', name: 'Make', icon: <Settings className="w-5 h-5" />, color: 'text-purple-600', category: 'Automation' },
  // { id: 'ifttt', name: 'IFTTT', icon: <Link className="w-5 h-5" />, color: 'text-red-500', category: 'Automation' }
];

// Enhanced Workflow types
const workflowTypes = [
  { 
    id: 'social-media', 
    name: 'Social Media Automation', 
    description: 'Automate posting, engagement, and content distribution across social platforms',
    icon: <Instagram className="w-6 h-6" />,
    color: 'text-pink-500'
  },
  { 
    id: 'email-marketing', 
    name: 'Email Marketing', 
    description: 'Automated email campaigns, newsletters, and customer communication',
    icon: <Mail className="w-6 h-6" />,
    color: 'text-red-500'
  },
  { 
    id: 'content-creation', 
    name: 'Content Creation', 
    description: 'Generate, curate, and distribute content automatically',
    icon: <FileText className="w-6 h-6" />,
    color: 'text-blue-500'
  },
  { 
    id: 'data-processing', 
    name: 'Data Processing', 
    description: 'Process, analyze, and transform data from various sources',
    icon: <Database className="w-6 h-6" />,
    color: 'text-green-500'
  },
  { 
    id: 'notifications', 
    name: 'Notifications & Alerts', 
    description: 'Send alerts, updates, and notifications across multiple channels',
    icon: <Bell className="w-6 h-6" />,
    color: 'text-yellow-500'
  },
  { 
    id: 'customer-support', 
    name: 'Customer Support', 
    description: 'Automate customer service, ticket routing, and support workflows',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'text-purple-500'
  },
  { 
    id: 'sales-automation', 
    name: 'Sales Automation', 
    description: 'Automate lead generation, follow-ups, and sales processes',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-green-600'
  },
  { 
    id: 'workflow-integration', 
    name: 'Workflow Integration', 
    description: 'Connect and synchronize data between different applications',
    icon: <Link className="w-6 h-6" />,
    color: 'text-indigo-500'
  }
];

// ReactFlow types
interface WorkflowCanvasProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
}

// Custom Node Component
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

// Sidebar elements for drag and drop
const sidebarElements = [
  // AI Agents
  { id: 'gemini', name: 'Gemini Agent', icon: <Brain className="w-4 h-4" />, color: 'text-blue-300', category: 'AI Agents' },
  { id: 'gpt4', name: 'GPT-4 Agent', icon: <Bot className="w-4 h-4" />, color: 'text-green-300', category: 'AI Agents' },
  { id: 'claude', name: 'Claude Agent', icon: <Brain className="w-4 h-4" />, color: 'text-purple-300', category: 'AI Agents' },
  { id: 'dalle', name: 'DALL-E Agent', icon: <Image className="w-4 h-4" />, color: 'text-pink-300', category: 'AI Agents' },
  
  // External Platforms
  { id: 'twitter-api', name: 'Twitter API', icon: <Twitter className="w-4 h-4" />, color: 'text-blue-300', category: 'Platforms' },
  { id: 'linkedin-api', name: 'LinkedIn API', icon: <Linkedin className="w-4 h-4" />, color: 'text-blue-300', category: 'Platforms' },
  { id: 'instagram-api', name: 'Instagram API', icon: <Instagram className="w-4 h-4" />, color: 'text-pink-300', category: 'Platforms' },
  { id: 'email-service', name: 'Email Service', icon: <Mail className="w-4 h-4" />, color: 'text-red-300', category: 'Platforms' },
  
  // Data Sources
  { id: 'rss-feed', name: 'RSS Feed', icon: <Rss className="w-4 h-4" />, color: 'text-orange-300', category: 'Data Sources' },
  { id: 'webhook', name: 'Webhook', icon: <Zap className="w-4 h-4" />, color: 'text-yellow-300', category: 'Data Sources' },
  { id: 'database', name: 'Database', icon: <Database className="w-4 h-4" />, color: 'text-green-300', category: 'Data Sources' },
  { id: 'file-upload', name: 'File Upload', icon: <Upload className="w-4 h-4" />, color: 'text-blue-300', category: 'Data Sources' },
  
  // Processing Elements
  { id: 'text-processor', name: 'Text Processor', icon: <FileText className="w-4 h-4" />, color: 'text-gray-300', category: 'Processing' },
  { id: 'image-processor', name: 'Image Processor', icon: <Camera className="w-4 h-4" />, color: 'text-purple-300', category: 'Processing' },
  { id: 'data-transformer', name: 'Data Transformer', icon: <Settings className="w-4 h-4" />, color: 'text-indigo-300', category: 'Processing' },
  { id: 'condition-check', name: 'Condition Check', icon: <Target className="w-4 h-4" />, color: 'text-red-300', category: 'Processing' },
  
  // Timing & Control
  { id: 'delay', name: 'Delay', icon: <Timer className="w-4 h-4" />, color: 'text-yellow-300', category: 'Control' },
  { id: 'schedule', name: 'Schedule', icon: <Calendar className="w-4 h-4" />, color: 'text-green-300', category: 'Control' },
  { id: 'loop', name: 'Loop', icon: <RefreshCw className="w-4 h-4" />, color: 'text-blue-300', category: 'Control' },
  { id: 'merge', name: 'Merge', icon: <Link className="w-4 h-4" />, color: 'text-purple-300', category: 'Control' }
];

export default function CreateWorkflowPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: '',
    type: '',
    creationMethod: '', // 'manual' or 'ai'
    aiSummary: ''
  });

  // ReactFlow state
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ReactFlow handlers
  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setShowConfigPanel(true);
  }, []);

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    setShowConfigPanel(false);
  };

  const updateNode = (nodeId: string, newData: any) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
    ));
  };

  const closeConfigPanel = () => {
    setShowConfigPanel(false);
    setSelectedNode(null);
  };

  // WorkflowCanvas Component
  const WorkflowCanvas = ({ nodes, setNodes, edges, setEdges, onNodeClick }: WorkflowCanvasProps) => {
    const reactFlowInstance = useReactFlow();

    const onDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const element = sidebarElements.find(el => el.name === type);
      
      if (element) {
        const newNode: Node = {
          id: `dndnode_${+new Date()}`,
          type: 'custom',
          position,
          data: { 
            label: element.name, 
            icon: element.icon,
            color: element.color
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    }, [reactFlowInstance, setNodes]);

    // Local handlers for this component instance
    const localOnNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
    const localOnEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
    const localOnConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
      <div className="reactflow-wrapper flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={localOnConnect}
          onNodesChange={localOnNodesChange}
          onEdgesChange={localOnEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background gap={16} size={1} className="!bg-gray-950" />
          <MiniMap nodeColor="#3B82F6" maskColor="rgba(15, 23, 42, 0.7)" />
          <Controls className="[&_button]:bg-gray-800 [&_button]:border-gray-700 [&_button:hover]:bg-blue-600" />
        </ReactFlow>
      </div>
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to workflow editor
      router.push('/workflow/editor');
    }
  };

  const handleCreateManually = () => {
    // Redirect to workflow editor when manual creation is selected
    router.push('/workflow/editor');
  };

  const handleAIGeneration = () => {
    // Redirect to AI summary page when AI generation is selected
    router.push('/workflow/ai-summary');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/dashboard');
    }
  };

  // Group platforms by category
  const groupedPlatforms = platforms.reduce((acc, platform) => {
    if (!acc[platform.category]) {
      acc[platform.category] = [];
    }
    acc[platform.category].push(platform);
    return acc;
  }, {} as Record<string, typeof platforms>);

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Create Your Workflow</h2>
        <p className="text-gray-400 text-lg">Let's start with the basic information about your automation</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-gray-300 text-lg font-medium">Workflow Name</Label>
          <Input
            id="name"
            placeholder="e.g., LinkedIn Auto-Post, Email Newsletter, Data Sync..."
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 text-lg py-3"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-gray-300 text-lg font-medium">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe what this workflow does and its purpose..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div>
          <Label className="text-gray-300 text-lg font-medium mb-4 block">Select Platform</Label>
          <div className="space-y-4">
            {Object.entries(groupedPlatforms).map(([category, categoryPlatforms]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categoryPlatforms.map((platform) => (
                    <Card
                      key={platform.id}
                      className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        formData.platform === platform.id
                          ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/25'
                          : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                      onClick={() => handleInputChange('platform', platform.id)}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`p-2 rounded-lg ${platform.color} bg-gray-800/50`}>
                          {platform.icon}
                        </div>
                        <span className="text-white font-medium text-sm">{platform.name}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-gray-300 text-lg font-medium mb-4 block">Workflow Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workflowTypes.map((type) => (
              <Card
                key={type.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  formData.type === type.id
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
                onClick={() => handleInputChange('type', type.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${type.color} bg-gray-800/50`}>
                    {type.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wand2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Choose Creation Method</h2>
        <p className="text-gray-400 text-lg">How would you like to create your workflow?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manual Creation */}
        <Card
          className={`p-8 cursor-pointer transition-all duration-200 hover:scale-105 ${
            formData.creationMethod === 'manual'
              ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/25'
              : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
          }`}
          onClick={handleCreateManually}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Create Manually</h3>
            <p className="text-gray-400 leading-relaxed">
              Build your workflow step by step using our visual canvas. Drag and drop elements, 
              connect them, and customize every detail of your automation.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Visual Canvas</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Drag & Drop</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Full Control</span>
            </div>
          </div>
        </Card>

        {/* AI Generation */}
        <Card
          className={`p-8 cursor-pointer transition-all duration-200 hover:scale-105 ${
            formData.creationMethod === 'ai'
              ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/25'
              : 'bg-gray-800/50 border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
          }`}
          onClick={handleAIGeneration}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">AI-Generated</h3>
            <p className="text-gray-400 leading-relaxed">
              Describe what you want your workflow to do, and our AI will create it for you. 
              Just provide a summary and let the magic happen!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">AI Powered</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Quick Setup</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Smart</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (formData.creationMethod === 'ai') {
      return (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Describe Your Workflow</h2>
            <p className="text-gray-400 text-lg">Tell our AI what you want your workflow to do</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="aiSummary" className="text-gray-300 text-lg font-medium">Workflow Summary</Label>
              <Textarea
                id="aiSummary"
                placeholder="e.g., 'I want to automatically post my blog content to LinkedIn every Monday at 9 AM, and also send a summary email to my team with the post link and engagement metrics.'"
                value={formData.aiSummary}
                onChange={(e) => handleInputChange('aiSummary', e.target.value)}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                rows={6}
              />
              <p className="text-gray-500 text-sm mt-2">
                Be as specific as possible. Include timing, platforms, data sources, and any special requirements.
              </p>
            </div>

            <Card className="bg-blue-500/10 border-blue-500/30 p-6">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">AI Tips</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Mention specific platforms and services you want to connect</li>
                    <li>• Include timing and frequency requirements</li>
                    <li>• Specify data sources and destinations</li>
                    <li>• Mention any conditions or filters needed</li>
                  </ul>
                </div>
                </div>
              </Card>
          </div>
        </div>
      );
    }

    // Manual creation - ReactFlow Canvas
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Visual Workflow Builder</h2>
          <p className="text-gray-400 text-lg">Drag elements from the sidebar and connect them to build your workflow</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4" style={{ height: 'calc(100vh - 400px)' }}>
          {/* Interactive Sidebar */}
          <div className="lg:col-span-1 h-full">
            <Card className="bg-gray-800/50 border-gray-600 p-3 h-full flex flex-col">
              <h3 className="text-white font-semibold mb-3 text-sm flex-shrink-0">Available Elements</h3>
              
              <div className="flex-1 overflow-y-auto pr-2">
                {Object.entries(sidebarElements.reduce((acc, element) => {
                  if (!acc[element.category]) acc[element.category] = [];
                  acc[element.category].push(element);
                  return acc;
                }, {} as Record<string, typeof sidebarElements>)).map(([category, elements]) => (
                  <div key={category} className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">{category}</h4>
                    <div className="space-y-1">
                      {elements.map((element) => (
                        <div
                          key={element.id}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData('application/reactflow', element.name)}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700/50 cursor-grab active:cursor-grabbing border border-gray-600 hover:border-gray-500 transition-all"
                        >
                          <div className={element.color}>{element.icon}</div>
                          <span className="text-gray-300 text-xs font-medium truncate">{element.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ReactFlow Canvas */}
          <div className="lg:col-span-4 h-full">
            <Card className="bg-gray-800/50 border-gray-600 p-0 h-full relative overflow-hidden">
              <div className="p-3 border-b border-gray-600 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-sm">Workflow Canvas</h3>
                  <div className="flex items-center gap-2">
                    {selectedNode && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteNode(selectedNode)}
                        className="text-red-400 border-red-500 hover:bg-red-500/10 text-xs px-2 py-1"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="h-[calc(100%-50px)]">
                <ReactFlowProvider>
                  <WorkflowCanvas
                    nodes={nodes}
                    setNodes={setNodes}
                    edges={edges}
                    setEdges={setEdges}
                    onNodeClick={onNodeClick}
                  />
                </ReactFlowProvider>
              </div>
            </Card>
          </div>
        </div>

        {/* Node Configuration Panel */}
        {showConfigPanel && (
          <NodeConfigPanel
            node={nodes.find(n => n.id === selectedNode) || null}
            onClose={closeConfigPanel}
            onUpdateNode={updateNode}
          />
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Test & Apply</h2>
        <p className="text-gray-400 text-lg">Test your workflow and apply it to start automation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-600 p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Test Workflow</h3>
            <p className="text-gray-400">
              Run a test to make sure your workflow works correctly before applying it
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Run Test
            </Button>
          </div>
        </Card>

        <Card className="bg-gray-800/50 border-gray-600 p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Apply Workflow</h3>
            <p className="text-gray-400">
              Activate your workflow to start the automation process
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Rocket className="w-4 h-4 mr-2" />
              Apply & Start
            </Button>
          </div>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-gray-600 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Workflow Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Name:</span>
            <span className="text-white font-medium">{formData.name || 'Not specified'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Platform:</span>
            <span className="text-white font-medium">
              {platforms.find(p => p.id === formData.platform)?.name || 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white font-medium">
              {workflowTypes.find(t => t.id === formData.type)?.name || 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Creation Method:</span>
            <span className="text-white font-medium capitalize">
              {formData.creationMethod === 'manual' ? 'Manual Creation' : 'AI Generated'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );

  const getStepTitle = (step: number) => {
    const titles = ['Basic Info', 'Creation Method', 'Build/Describe', 'Test & Apply', 'Complete'];
    return titles[step - 1] || '';
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
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {step < currentStep ? <Check className="w-6 h-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-20 h-1 mx-3 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>Basic Info</span>
            <span>Method</span>
            <span>Build</span>
            <span>Test & Apply</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-gray-900/60 border-gray-700/50 p-6 min-h-[600px] flex flex-col">
          <div className="flex-1">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
          
          {/* Navigation - Only show for steps other than Step 3 */}
          {currentStep !== 3 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.platform || !formData.type)) ||
                  (currentStep === 2 && !formData.creationMethod) ||
                  (currentStep === 3 && formData.creationMethod === 'ai' && !formData.aiSummary)
                }
              >
                {currentStep >= 4 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </Card>

        {/* Navigation for Step 3 - Outside canvas area */}
        {currentStep === 3 && (
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              disabled={
                formData.creationMethod === 'ai' && !formData.aiSummary
              }
            >
              {currentStep >= 4 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
