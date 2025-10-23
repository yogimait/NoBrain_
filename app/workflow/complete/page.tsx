'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  CheckCircle, 
  Rocket, 
  Zap, 
  Calendar,
  BarChart3,
  Settings,
  ArrowRight,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';

export default function CompletionPage() {
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 500);
  }, []);

  const workflowStats = {
    name: 'LinkedIn Auto-Post Workflow',
    steps: 4,
    executionTime: '2.3s',
    frequency: 'Weekly',
    nextRun: 'Monday, 9:00 AM',
    status: 'Active'
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
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          showAnimation ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            🎉 You just created a <span className="text-blue-400">No-Brainer</span>!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your workflow is now live and running automatically. Sit back and let the magic happen!
          </p>
        </div>

        {/* Workflow Details */}
        <Card className="bg-gray-900/60 border-gray-700/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{workflowStats.name}</h2>
              <p className="text-gray-400">Your workflow is now active and running</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium text-sm">Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{workflowStats.steps} Steps</h3>
              <p className="text-gray-400 text-sm">Workflow complexity</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{workflowStats.executionTime}</h3>
              <p className="text-gray-400 text-sm">Execution time</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">{workflowStats.frequency}</h3>
              <p className="text-gray-400 text-sm">Run frequency</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Next Run</h3>
              <p className="text-gray-400 text-sm">{workflowStats.nextRun}</p>
            </div>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="bg-blue-500/10 border-blue-500/30 p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Rocket className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">What happens next?</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Your workflow will run automatically according to the schedule</li>
                <li>• You'll receive notifications when the workflow completes</li>
                <li>• Monitor performance and logs from your dashboard</li>
                <li>• You can pause, edit, or delete the workflow anytime</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push('/workflow/create')}
            className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300 px-8 py-3 text-lg font-semibold"
          >
            Create Another Workflow
          </Button>
        </div>

        {/* Fun Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">
              You've saved approximately <span className="text-blue-400 font-semibold">2 hours per week</span> with this automation!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
