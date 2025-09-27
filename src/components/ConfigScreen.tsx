import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Settings, Save, RotateCcw, CheckCircle, XCircle, TestTube } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../contexts/ThemeContext';


export function ConfigScreen() {
  const { theme } = useTheme(); // get current theme from context

  const [apiConnectionStatus, setApiConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [config, setConfig] = useState({
    defaultCurrency: 'USD',
    defaultTaxRate: 10,
    autoProcessThreshold: 75,
    apiKey: '',
    model: 'gpt-4',
    maxTokens: 2000,
    webhookUrl: '',
    emailNotifications: true,
    exportDestination: 'local'
  });

  const handleTestConnection = async () => {
    setApiConnectionStatus('testing');
    setTimeout(() => {
      setApiConnectionStatus(config.apiKey ? 'connected' : 'disconnected');
    }, 2000);
  };

  const fieldMappings = [
    { systemField: 'Invoice Number', pdfLabel: 'Invoice #', mandatory: true },
    { systemField: 'Date', pdfLabel: 'Invoice Date', mandatory: true },
    { systemField: 'Vendor', pdfLabel: 'From', mandatory: true },
    { systemField: 'Total Amount', pdfLabel: 'Total', mandatory: true },
    { systemField: 'PO Number', pdfLabel: 'Purchase Order', mandatory: false },
    { systemField: 'Tax Amount', pdfLabel: 'Tax', mandatory: false },
  ];

  const getConnectionBadge = () => {
    switch (apiConnectionStatus) {
      case 'connected':
        return <Badge variant="default" className="text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'testing':
        return <Badge variant="outline"><TestTube className="h-3 w-3 mr-1 animate-spin" />Testing...</Badge>;
      case 'disconnected':
      default:
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Disconnected</Badge>;
    }
  };

  // Theme-based background and text classes
  const themeClasses = {
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-900 text-white',
    blue: 'bg-blue-50 text-blue-900',
    green: 'bg-green-50 text-green-900',
    purple: 'bg-purple-50 text-purple-900',
    orange: 'bg-orange-50 text-orange-900',
  };

  return (
    <div className={`space-y-6 p-6 min-h-screen ${themeClasses[theme]}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Settings className="h-6 w-6" />
          <h1>Configuration</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" /> Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" /> Save Configuration
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="extraction">Extraction Rules</TabsTrigger>
          <TabsTrigger value="llm">LLM Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <CardHeader><CardTitle>Default Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {/* Currency and Tax */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select 
                      value={config.defaultCurrency} 
                      onValueChange={(value: any) => setConfig((prev: any) => ({ ...prev, defaultCurrency: value }))}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={config.defaultTaxRate}
                      onChange={(e) => setConfig(prev => ({ ...prev, defaultTaxRate: parseInt(e.target.value) || 0 }))}
                      placeholder="10"
                    />
                  </div>
                </div>

                {/* Auto-Process Threshold */}
                <div className="space-y-4">
                  <Label>Auto-Process Threshold</Label>
                  <div className="px-3">
                    <Slider
                      value={[config.autoProcessThreshold]}
                      onValueChange={(value) => setConfig(prev => ({ ...prev, autoProcessThreshold: value[0] }))}
                      max={100} min={0} step={5} className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>0%</span>
                      <span className="font-medium">{config.autoProcessThreshold}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Invoices with confidence scores above this threshold will be automatically marked as processed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <CardHeader><CardTitle>Theme & Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Color Theme</Label>
                    <p className="text-sm text-gray-600 mt-1">Choose a color theme that matches your preference</p>
                  </div>
                  <ThemeSwitcher />
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-8 bg-primary rounded"></div>
                    <p className="text-xs text-center">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-secondary rounded"></div>
                    <p className="text-xs text-center">Secondary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-accent rounded"></div>
                    <p className="text-xs text-center">Accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded"></div>
                    <p className="text-xs text-center">Muted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* The other tabs (extraction, LLM, integrations) can also have theme applied to cards */}
      </Tabs>
    </div>
  );
}
