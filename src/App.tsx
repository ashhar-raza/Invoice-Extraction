import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from './components/ui/sidebar';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import {
  Upload,
  FileText,
  BarChart3,
  Settings,
  Clock,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { UploadScreen } from './components/UploadScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ConfigScreen } from './components/ConfigScreen';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ThemeProvider } from './contexts/ThemeContext';
import { mockInvoices } from './data/mockData';
import { Invoice, NavigationScreen } from './types/invoice';
import { BiggerScreen } from './components/BiggerScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<NavigationScreen>('upload');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { id: 'upload' as const, label: 'Upload', icon: Upload, description: 'Upload new invoices' },
    { id: 'review' as const, label: 'Review', icon: FileText, description: 'Review extracted data', badge: mockInvoices.filter(i => i.status === 'needs_review').length },
    { id: 'processing' as const, label: 'Processing', icon: Clock, description: 'Track processing status', badge: mockInvoices.filter(i => i.status === 'processing').length },
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3, description: 'View all invoices' },
    { id: 'config' as const, label: 'Configuration', icon: Settings, description: 'System settings' },
  ];

  const handleNavigation = (screen: NavigationScreen) => {
    setCurrentScreen(screen);
    if (screen === 'review' && !selectedInvoice) {
      const invoice = mockInvoices.find(i => i.status === 'needs_review');
      if (invoice) setSelectedInvoice(invoice);
    } else if (screen === 'processing' && !selectedInvoice) {
      const invoice = mockInvoices.find(i => i.status === 'processing');
      if (invoice) setSelectedInvoice(invoice);
    }
  };

  const handleSelectInvoice = (invoice: Invoice) => setSelectedInvoice(invoice);
  const handleBackToUpload = () => { setCurrentScreen('upload'); setSelectedInvoice(null); };

  const renderContent = () => {
    if (isMobile) return <BiggerScreen />;
    switch (currentScreen) {
      case 'upload':
        return <UploadScreen onSelectInvoice={handleSelectInvoice} onNavigate={handleNavigation} />;
      case 'review':
        return (
          <ReviewScreen
            invoice={selectedInvoice}
            onBack={handleBackToUpload}
            onSelectInvoice={handleSelectInvoice}
            allInvoices={mockInvoices.filter(i => i.status === 'needs_review' || i.status === 'processed')}
          />
        );
      case 'processing':
        return (
          <ProcessingScreen
            invoice={selectedInvoice}
            onBack={handleBackToUpload}
            onSelectInvoice={handleSelectInvoice}
            allInvoices={mockInvoices.filter(i => i.status === 'processing' || i.status === 'failed')}
          />
        );
      case 'dashboard':
        return <DashboardScreen onSelectInvoice={handleSelectInvoice} onNavigate={handleNavigation} />;
      case 'config':
        return <ConfigScreen />;
      default:
        return <UploadScreen onSelectInvoice={handleSelectInvoice} onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <Sidebar className={`sidebar-gradient transition-all duration-400 flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
            <div className="flex justify-start px-3 py-2 lg:flex">
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            <SidebarHeader className="border-b border-sidebar-border">
              <div className="flex items-center gap-3 px-3 py-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-purple-500 rounded-lg shadow-md">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                {isSidebarOpen && (
                  <div>
                    <h1 className="font-semibold text-sidebar-foreground gradient-text">InvoiceAI</h1>
                    <p className="text-sm text-sidebar-foreground/70">Smart Invoice Processing</p>
                  </div>
                )}
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                {navigation.map(item => {
                  const isActive = currentScreen === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.id)}
                        isActive={isActive}
                        className={`w-full justify-start transition-all duration-300 ${!isActive ? 'sidebar-hover' : ''}`}
                      >
                        <item.icon className="h-4 w-4" />
                        {isSidebarOpen && <span className="flex-1 font-medium ml-2">{item.label}</span>}
                        {item.badge && item.badge > 0 && isSidebarOpen && (
                          <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-emerald-500 to-purple-500 text-white font-medium">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>

            {isSidebarOpen && (
              <SidebarFooter className="border-t border-sidebar-border">
                <div className="flex items-center justify-between px-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-purple-500 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-medium text-white">AI</span>
                    </div>
                    <span className="text-sm text-sidebar-foreground/70">Professional v1.0</span>
                  </div>
                  <ThemeSwitcher />
                </div>
              </SidebarFooter>
            )}
          </Sidebar>

          {/* Main Content */}
          {/* Main Content */}
          <div
            className="flex-1 transition-all duration-300"
            style={{ marginLeft: isSidebarOpen ? 64 : -180 }} // 256px = w-64, 64px = w-16
          >
            <div className="flex h-full flex-col">
              {/* Mobile Header */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 lg:hidden bg-background">
                <div className="flex items-center gap-3">
                  <SidebarTrigger />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-foreground gradient-text">InvoiceAI</span>
                  </div>
                </div>
                <ThemeSwitcher />
              </div>

              <main className="flex-1 overflow-auto p-8 bg-background transition-all duration-300">
                {renderContent()}
              </main>
            </div>
          </div>

        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
