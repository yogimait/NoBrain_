// components/NodeConfigPanel.tsx
import { useEffect, useState } from 'react';
import { Node } from 'reactflow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface NodeConfigPanelProps {
  node: Node | null;
  onClose: () => void;
  // You would also pass a function here to update the global nodes state
  // onUpdateNode: (nodeId: string, newData: any) => void;
}

export default function NodeConfigPanel({ node, onClose }: NodeConfigPanelProps) {
  // Local state to manage form data
  const [label, setLabel] = useState(node?.data?.label || '');
  const [prompt, setPrompt] = useState(node?.data?.prompt || '');
  const [url, setUrl] = useState(node?.data?.url || '');

  // Update local state when a different node is selected
  useEffect(() => {
    if (node) {
      setLabel(node.data?.label || '');
      setPrompt(node.data?.prompt || '');
      setUrl(node.data?.url || '');
    }
  }, [node]);

  if (!node) {
    // This part is not visible when a node is selected, so no changes needed.
    return null;
  }

  const handleSaveChanges = () => {
    // Here you would call the onUpdateNode prop to save changes globally
    // For example:
    // onUpdateNode(node.id, { label, prompt, url });
    console.log('Saving changes:', { label, prompt, url });
    onClose(); // Close panel after saving
  };

  // Render specific input fields based on the node type (label)
  const renderNodeSpecificFields = () => {
    switch (node.data.label) {
      case 'Web Scraper':
        return (
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="url" className="text-gray-300">Target URL</Label>
            <Input
              id="url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-gray-800 border-gray-700 focus-visible:ring-blue-500"
            />
          </div>
        );
      case 'AI Summarizer':
      case 'AI Text Generator':
      case 'Content Polisher':
        return (
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="prompt" className="text-gray-300">Custom Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="e.g., Summarize this content in 3 bullet points."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-gray-800 border-gray-700 focus-visible:ring-blue-500"
              rows={5}
            />
          </div>
        );
      default:
        return <p className="text-sm text-gray-500">This node has no specific configuration.</p>;
    }
  };

  return (
    <aside className="w-80 bg-gray-900/60 backdrop-blur-sm border-l border-gray-800 p-6 flex flex-col gap-6 absolute top-0 right-0 h-full z-10 animate-in slide-in-from-right-8 duration-300">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-blue-300">
          Configure Node
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </Button>
      </div>
      
      <div className="flex flex-col gap-5 flex-grow">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="node-type" className="text-gray-300">Node Type</Label>
          <Input
            id="node-type"
            type="text"
            value={label}
            readOnly
            className="bg-gray-800 border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Render fields specific to the selected node */}
        {renderNodeSpecificFields()}
      </div>

      <Button
        onClick={handleSaveChanges}
        className="bg-blue-600 hover:bg-blue-700 w-full text-white font-semibold"
        style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' }}
      >
        Save Changes
      </Button>
    </aside>
  );
}