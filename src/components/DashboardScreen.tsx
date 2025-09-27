import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Search, Filter, Download, Calendar as CalendarIcon, Eye, FileText, BarChart3, TrendingUp, DollarSign, Clock, Activity } from 'lucide-react';
import { mockInvoices, mockStats } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';
import { Invoice } from '../types/invoice';
import { format } from 'date-fns';

interface DashboardScreenProps {
  onSelectInvoice: (invoice: Invoice) => void;
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onSelectInvoice, onNavigate }: DashboardScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesVendor = vendorFilter === 'all' || invoice.vendor === vendorFilter;
    
    return matchesSearch && matchesStatus && matchesVendor;
  });

  const handleViewInvoice = (invoice: Invoice) => {
    onSelectInvoice(invoice);
    if (invoice.status === 'needs_review' || invoice.status === 'processed') {
      onNavigate('review');
    } else {
      onNavigate('processing');
    }
  };

  const getTotalStats = () => {
    const processed = mockInvoices.filter(i => i.status === 'processed').length;
    const needsReview = mockInvoices.filter(i => i.status === 'needs_review').length;
    const failed = mockInvoices.filter(i => i.status === 'failed').length;
    const totalAmount = mockInvoices
      .filter(i => i.status === 'processed')
      .reduce((sum, i) => sum + i.amount, 0);

    return { processed, needsReview, failed, totalAmount };
  };

  const stats = getTotalStats();
  const uniqueVendors = [...new Set(mockInvoices.map(i => i.vendor))];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Invoices</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalInvoices}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  +{mockStats.monthlyGrowth}% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Value</p>
                <p className="text-2xl font-bold text-foreground">${mockStats.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  +$25.2K this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Avg Processing Time</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.averageProcessingTime}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  -0.8min improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-shadow border-0 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.successRate}%</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-semibold">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% this month
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Vendors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle className="gradient-text-secondary flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.invoice}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow border-0">
          <CardHeader>
            <CardTitle className="gradient-text-secondary flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.topVendors.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.count} invoice{vendor.count > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground">${vendor.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle className="gradient-text">Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices, vendors, or invoice numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="needs_review">Needs Review</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Vendor Filter */}
            <Select value={vendorFilter} onValueChange={setVendorFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vendors</SelectItem>
                {uniqueVendors.map(vendor => (
                  <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover open={showCalendar} onOpenChange={setShowCalendar}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-48">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {dateRange.from ? format(dateRange.from, 'MMM dd') : 'Select dates'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange(range || {})}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>

            {/* Export */}
            <Button className="btn-gradient-secondary w-full md:w-auto font-semibold">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Results Table */}
          <div className="rounded-lg border card-shadow bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium text-foreground">Invoice #</TableHead>
                  <TableHead className="font-medium text-foreground">Vendor</TableHead>
                  <TableHead className="font-medium text-foreground">Upload Date</TableHead>
                  <TableHead className="text-right font-medium text-foreground">Amount</TableHead>
                  <TableHead className="font-medium text-foreground">Status</TableHead>
                  <TableHead className="font-medium text-foreground">Confidence</TableHead>
                  <TableHead className="text-center font-medium text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No invoices found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <TableRow 
                      key={invoice.id} 
                      className={`hover:bg-muted/20 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{invoice.invoiceNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{invoice.vendor}</TableCell>
                      <TableCell className="text-muted-foreground">{invoice.uploadDate}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </TableCell>
                      <TableCell><StatusBadge status={invoice.status} /></TableCell>
                      <TableCell>
                        {invoice.confidenceScore && (
                          <ConfidenceBadge confidence={invoice.confidenceScore} />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewInvoice(invoice)}
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-muted transition-colors">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredInvoices.length} of {mockInvoices.length} invoices
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}