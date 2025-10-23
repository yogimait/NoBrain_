'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Rocket, Zap, Users, Shield, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-30"></div>
      
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-16 max-w-7xl relative z-10">
        <div className="flex items-center gap-3">
          <Rocket className="w-8 h-8 text-blue-400" />
          <span className="text-3xl font-bold tracking-wide text-blue-300">NoBrain</span>
        </div>
        <Button 
          variant="outline" 
          className="text-gray-200 border-gray-700 hover:border-blue-500 hover:text-blue-300 transition-all" 
          onClick={() => router.push('/auth/login')}
        >
          Get Started
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl relative z-10">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
            AI automation so simple, <br className="hidden md:block"/> it's a <span className="text-blue-400">No-Brainer.</span>
          </h1>
          <p className="text-lg mb-10 text-gray-300 max-w-md">
            Design and deploy multi-agent AI workflows without writing a single line of code. 
            Automate your LinkedIn posts, email campaigns, and more with intelligent workflows.
          </p>
          <div className="flex gap-4">
            <Button
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
              style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
              onClick={() => router.push('/auth/signup')}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="text-gray-200 px-8 py-3 rounded-xl font-semibold text-lg border-gray-700 hover:border-purple-500 hover:text-purple-300 transition"
              onClick={() => router.push('/auth/login')}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="relative flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <Card className="p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/50">
              <div className="text-center">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Smart Automation</h3>
                <p className="text-gray-400 text-sm">AI-powered workflows that adapt and learn</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/50">
              <div className="text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Multi-Platform</h3>
                <p className="text-gray-400 text-sm">Connect LinkedIn, Twitter, Email & more</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-700/50">
              <div className="text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm">Enterprise-grade security & monitoring</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border-yellow-700/50">
              <div className="text-center">
                <ArrowRight className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Easy Setup</h3>
                <p className="text-gray-400 text-sm">Drag & drop interface, no coding required</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Auto-redirect notice */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 text-sm">
          Redirecting to login page in a few seconds...
        </p>
      </div>
    </main>
  );
}