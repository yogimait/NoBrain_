'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Play, 
  Rocket, 
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Settings,
  Eye,
  BarChart3,
  Activity
} from 'lucide-react';

export default function TestApplyPage() {
  const router = useRouter();
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [applyStatus, setApplyStatus] = useState<'idle' | 'applying' | 'success' | 'error'>('idle');
  const [testResults, setTestResults] = useState<any>(null);

  const runTest = async () => {
    setTestStatus('testing');
    
    // Simulate test execution
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      setTestStatus(isSuccess ? 'success' : 'error');
      
      if (isSuccess) {
        setTestResults({
          totalSteps: 4,
          passedSteps: 4,
          failedSteps: 0,
          executionTime: '2.3s',
          details: [
            { step: 'Web Scraper', status: 'success', message: 'Successfully scraped data from target URL' },
            { step: 'AI Summarizer', status: 'success', message: 'Content summarized successfully' },
            { step: 'Email Service', status: 'success', message: 'Email sent to recipient' },
            { step: 'Slack Message', status: 'success', message: 'Message posted to channel' }
          ]
        });
      } else {
        setTestResults({
          totalSteps: 4,
          passedSteps: 2,
          failedSteps: 2,
          executionTime: '1.8s',
          details: [
            { step: 'Web Scraper', status: 'success', message: 'Successfully scraped data from target URL' },
            { step: 'AI Summarizer', status: 'success', message: 'Content summarized successfully' },
            { step: 'Email Service', status: 'error', message: 'SMTP connection failed' },
            { step: 'Slack Message', status: 'error', message: 'Invalid webhook URL' }
          ]
        });
      }
    }, 3000);
  };

  const applyWorkflow = async () => {
    setApplyStatus('applying');
    
    // Simulate workflow application
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate for demo
      setApplyStatus(isSuccess ? 'success' : 'error');
      
      if (isSuccess) {
        setTimeout(() => {
          router.push('/workflow/complete');
        }, 1500);
      }
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
      case 'applying':
        return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
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
                onClick={() => router.push('/workflow/credentials')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Test & Apply Workflow</h1>
          <p className="text-gray-400 text-lg">Test your workflow and apply it to start automation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Workflow */}
          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Play className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Test Workflow</h2>
                <p className="text-gray-400">Run a test to verify your workflow works correctly</p>
              </div>
              {getStatusIcon(testStatus)}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Test Status</span>
                <span className={`font-medium ${
                  testStatus === 'success' ? 'text-green-400' : 
                  testStatus === 'error' ? 'text-red-400' : 
                  testStatus === 'testing' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {testStatus === 'idle' ? 'Not tested' :
                   testStatus === 'testing' ? 'Testing...' :
                   testStatus === 'success' ? 'Passed' : 'Failed'}
                </span>
              </div>
              
              {testResults && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Execution Time</span>
                    <span className="text-blue-400 font-medium">{testResults.executionTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300">Steps Passed</span>
                    <span className="text-green-400 font-medium">{testResults.passedSteps}/{testResults.totalSteps}</span>
                  </div>
                </div>
              )}
            </div>

            <Button
              onClick={runTest}
              disabled={testStatus === 'testing'}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {testStatus === 'testing' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Test
                </>
              )}
            </Button>
          </Card>

          {/* Apply Workflow */}
          <Card className="bg-gray-900/60 border-gray-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Rocket className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Apply Workflow</h2>
                <p className="text-gray-400">Activate your workflow to start automation</p>
              </div>
              {getStatusIcon(applyStatus)}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Workflow Status</span>
                <span className={`font-medium ${
                  applyStatus === 'success' ? 'text-green-400' : 
                  applyStatus === 'error' ? 'text-red-400' : 
                  applyStatus === 'applying' ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {applyStatus === 'idle' ? 'Not applied' :
                   applyStatus === 'applying' ? 'Applying...' :
                   applyStatus === 'success' ? 'Active' : 'Failed'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Schedule</span>
                <span className="text-blue-400 font-medium">Every Monday 9:00 AM</span>
              </div>
            </div>

            <Button
              onClick={applyWorkflow}
              disabled={applyStatus === 'applying' || testStatus !== 'success'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {applyStatus === 'applying' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Applying...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4 mr-2" />
                  Apply & Start
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Test Results Details */}
        {testResults && (
          <Card className="bg-gray-900/60 border-gray-700/50 p-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Test Results</h3>
            </div>

            <div className="space-y-3">
              {testResults.details.map((detail: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  {getStepStatusIcon(detail.status)}
                  <div className="flex-1">
                    <div className="font-medium text-white">{detail.step}</div>
                    <div className={`text-sm ${
                      detail.status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {detail.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Workflow Summary */}
        <Card className="bg-gray-900/60 border-gray-700/50 p-6 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Workflow Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">4 Steps</h4>
              <p className="text-gray-400 text-sm">Total workflow steps</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">2.3s</h4>
              <p className="text-gray-400 text-sm">Average execution time</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-1">Weekly</h4>
              <p className="text-gray-400 text-sm">Execution frequency</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
