'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Key, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
  Database,
  Zap,
  Upload,
  Rss
} from 'lucide-react';

// Platform configurations
const platformConfigs = {
  'Twitter API': {
    icon: <Twitter className="w-6 h-6" />,
    color: 'text-blue-400',
    fields: [
      { name: 'apiKey', label: 'API Key', type: 'password', placeholder: 'Enter your Twitter API key' },
      { name: 'apiSecret', label: 'API Secret', type: 'password', placeholder: 'Enter your Twitter API secret' },
      { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Enter your access token' },
      { name: 'accessTokenSecret', label: 'Access Token Secret', type: 'password', placeholder: 'Enter your access token secret' }
    ]
  },
  'LinkedIn API': {
    icon: <Linkedin className="w-6 h-6" />,
    color: 'text-blue-600',
    fields: [
      { name: 'clientId', label: 'Client ID', type: 'text', placeholder: 'Enter your LinkedIn Client ID' },
      { name: 'clientSecret', label: 'Client Secret', type: 'password', placeholder: 'Enter your LinkedIn Client Secret' },
      { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Enter your access token' }
    ]
  },
  'Instagram API': {
    icon: <Instagram className="w-6 h-6" />,
    color: 'text-pink-500',
    fields: [
      { name: 'appId', label: 'App ID', type: 'text', placeholder: 'Enter your Instagram App ID' },
      { name: 'appSecret', label: 'App Secret', type: 'password', placeholder: 'Enter your Instagram App Secret' },
      { name: 'accessToken', label: 'Access Token', type: 'password', placeholder: 'Enter your access token' }
    ]
  },
  'Email Service': {
    icon: <Mail className="w-6 h-6" />,
    color: 'text-red-500',
    fields: [
      { name: 'smtpHost', label: 'SMTP Host', type: 'text', placeholder: 'smtp.gmail.com' },
      { name: 'smtpPort', label: 'SMTP Port', type: 'number', placeholder: '587' },
      { name: 'username', label: 'Username', type: 'email', placeholder: 'your-email@gmail.com' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your email password' }
    ]
  },
  'Slack Message': {
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'text-purple-500',
    fields: [
      { name: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'https://hooks.slack.com/services/...' },
      { name: 'botToken', label: 'Bot Token', type: 'password', placeholder: 'xoxb-your-bot-token' }
    ]
  },
  'Database': {
    icon: <Database className="w-6 h-6" />,
    color: 'text-green-500',
    fields: [
      { name: 'host', label: 'Host', type: 'text', placeholder: 'localhost' },
      { name: 'port', label: 'Port', type: 'number', placeholder: '5432' },
      { name: 'database', label: 'Database Name', type: 'text', placeholder: 'your_database' },
      { name: 'username', label: 'Username', type: 'text', placeholder: 'your_username' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' }
    ]
  },
  'Webhook': {
    icon: <Zap className="w-6 h-6" />,
    color: 'text-yellow-500',
    fields: [
      { name: 'webhookUrl', label: 'Webhook URL', type: 'url', placeholder: 'https://your-webhook-url.com' },
      { name: 'secretKey', label: 'Secret Key', type: 'password', placeholder: 'Enter your webhook secret' }
    ]
  },
  'RSS Feed': {
    icon: <Rss className="w-6 h-6" />,
    color: 'text-orange-500',
    fields: [
      { name: 'feedUrl', label: 'RSS Feed URL', type: 'url', placeholder: 'https://example.com/feed.xml' },
      { name: 'updateInterval', label: 'Update Interval (minutes)', type: 'number', placeholder: '30' }
    ]
  }
};

export default function CredentialsPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [validationStatus, setValidationStatus] = useState<Record<string, 'idle' | 'validating' | 'success' | 'error'>>({});

  // Mock platform selection - in real app, this would come from previous step
  const selectedPlatform = 'Twitter API';
  const platformConfig = platformConfigs[selectedPlatform as keyof typeof platformConfigs];

  const handleInputChange = (fieldName: string, value: string) => {
    setCredentials(prev => ({ ...prev, [fieldName]: value }));
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPasswords(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const validateCredentials = async (platform: string) => {
    setValidationStatus(prev => ({ ...prev, [platform]: 'validating' }));
    
    // Simulate API validation
    setTimeout(() => {
      const isValid = Math.random() > 0.3; // 70% success rate for demo
      setValidationStatus(prev => ({ 
        ...prev, 
        [platform]: isValid ? 'success' : 'error' 
      }));
    }, 2000);
  };

  const isFormValid = () => {
    return platformConfig.fields.every(field => credentials[field.name]?.trim());
  };

  const getValidationIcon = (status: string) => {
    switch (status) {
      case 'validating':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
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
                onClick={() => router.push('/workflow/editor')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push('/workflow/test-apply')}
                disabled={!isFormValid()}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Configure Platform Credentials</h1>
          <p className="text-gray-400 text-lg">Add your API credentials to connect with external platforms</p>
        </div>

        <Card className="bg-gray-900/60 border-gray-700/50 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-lg bg-gray-800/50 ${platformConfig.color}`}>
              {platformConfig.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{selectedPlatform}</h2>
              <p className="text-gray-400">Configure your {selectedPlatform} credentials</p>
            </div>
            <div className="ml-auto">
              {getValidationIcon(validationStatus[selectedPlatform])}
            </div>
          </div>

          <div className="space-y-6">
            {platformConfig.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-gray-300 font-medium">
                  {field.label}
                </Label>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={field.type === 'password' && !showPasswords[field.name] ? 'password' : field.type === 'password' ? 'text' : field.type}
                    placeholder={field.placeholder}
                    value={credentials[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pr-10"
                  />
                  {field.type === 'password' && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => togglePasswordVisibility(field.name)}
                    >
                      {showPasswords[field.name] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => validateCredentials(selectedPlatform)}
              disabled={validationStatus[selectedPlatform] === 'validating'}
              className="text-gray-300 border-gray-600 hover:border-blue-500 hover:text-blue-300"
            >
              {validationStatus[selectedPlatform] === 'validating' ? 'Validating...' : 'Test Connection'}
            </Button>
            
            <div className="text-sm text-gray-400">
              {validationStatus[selectedPlatform] === 'success' && (
                <span className="text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Connection successful!
                </span>
              )}
              {validationStatus[selectedPlatform] === 'error' && (
                <span className="text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Connection failed. Please check your credentials.
                </span>
              )}
            </div>
          </div>
        </Card>

        <Card className="bg-blue-500/10 border-blue-500/30 p-6 mt-6">
          <div className="flex items-start space-x-3">
            <Key className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Security Note</h4>
              <p className="text-gray-300 text-sm">
                Your credentials are encrypted and stored securely. We never share your API keys with third parties.
                You can revoke access at any time from your platform's developer settings.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
