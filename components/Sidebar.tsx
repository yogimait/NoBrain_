import React from 'react';
import { Plug, Rows, Text, Bot, MessageSquare, Mail, Layers } from 'lucide-react';

interface SidebarProps {
  addNode: (nodeType: string) => void;
}

// Draggable Node component for the sidebar
const DraggableNode: React.FC<{ type: string; label: string; icon: React.ReactNode }> = ({ type, label, icon }) => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="flex items-center gap-3 p-3 bg-gray-800/70 rounded-lg cursor-grab active:cursor-grabbing border border-gray-700 hover:border-blue-500 transition-all duration-200 group"
      style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="p-2 bg-gray-700/50 rounded-md text-blue-400 group-hover:text-blue-300 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </div>
  );
};

export default function Sidebar({ addNode }: SidebarProps) {
  return (
    <aside className="w-72 bg-gray-900/60 backdrop-blur-sm p-4 border-r border-gray-800 flex flex-col space-y-6 overflow-y-auto pt-6">
      <h2 className="text-xl font-semibold text-blue-300 border-b border-gray-700 pb-3 mb-2">
        Nodes
      </h2>

      <div className="space-y-4">
        {/* Triggers */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Triggers</h3>
          <DraggableNode type="Web Scraper" label="Web Scraper" icon={<Plug size={18} />} />
        </div>
        
        {/* AI Agents */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-6 mb-3">AI Agents</h3>
          <DraggableNode type="AI Text Generator" label="AI Text Generator" icon={<Bot size={18} />} />
          <DraggableNode type="AI Summarizer" label="AI Summarizer" icon={<Rows size={18} />} />
          <DraggableNode type="Sentiment Analyzer" label="Sentiment Analyzer" icon={<Text size={18} />} />
          <DraggableNode type="Email Generator" label="Email Generator" icon={<Mail size={18} />} />
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-6 mb-3">Tools</h3>
          <DraggableNode type="Slack Message" label="Slack Message" icon={<MessageSquare size={18} />} />
          <DraggableNode type="Content Polisher" label="Content Polisher" icon={<Layers size={18} />} />
        </div>
      </div>
    </aside>
  );
}