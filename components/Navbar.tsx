'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Rocket, Play } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gray-900/60 backdrop-blur-sm border-b border-gray-800">
      {/* Left: Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer" 
        onClick={() => router.push('/')} // Should ideally reload to reset to landing
      >
        <Rocket className="w-7 h-7 text-blue-400" />
        <span className="text-2xl font-bold tracking-wide text-blue-300">NoBrain</span>
      </div>

      {/* Center: Actions (can be expanded later) */}
      <div>
         {/* For future buttons like "Save", "Templates", etc. */}
      </div>

      {/* Right: Primary Action */}
      <div className="flex items-center gap-3">
        <Button
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.7))' }}
            // Add your execution logic here
            onClick={() => console.log("Run Workflow")}
          >
            <Play size={20} />
        </Button>
      </div>
    </header>
  );
}