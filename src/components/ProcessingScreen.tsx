import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, RefreshCw, CheckCircle, AlertCircle, XCircle, Clock, FileText, Brain, Search, ShieldCheck, Eye } from 'lucide-react';
import { Invoice } from '../types/invoice';
import { mockProcessingSteps, getProcessingSteps } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

interface ProcessingScreenProps {
  invoice: Invoice | null;
  onBack: () => void;
  onSelectInvoice: (invoice: Invoice) => void;
  allInvoices: Invoice[];
}

export function ProcessingScreen({ invoice, onBack, onSelectInvoice, allInvoices }: ProcessingScreenProps) {
  // Show processing list if no invoice is selected
  if (!invoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1>Processing Status</h1>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Processing & Failed Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allInvoices.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No invoices are currently processing</p>
                  <Button className="mt-4" onClick={onBack}>
                    Back to Upload
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allInvoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {inv.invoiceNumber}
                          </div>
                        </TableCell>
                        <TableCell>{inv.vendor}</TableCell>
                        <TableCell>{inv.currency} {inv.amount.toLocaleString()}</TableCell>
                        <TableCell><StatusBadge status={inv.status} /></TableCell>
                        <TableCell>
                          {inv.confidenceScore && <ConfidenceBadge confidence={inv.confidenceScore} />}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => onSelectInvoice(inv)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const getStepIcon = (stepId: number) => {
    const icons = {
      1: FileText,
      2: Search,
      3: Brain,
      4: AlertCircle,
      5: ShieldCheck,
      6: CheckCircle
    };
    return icons[stepId as keyof typeof icons] || Clock;
  };

  const getStatusIcon = (status?: Invoice['status']) => {
    if (!status) return <Clock className="h-6 w-6 text-gray-500" />;
    switch (status) {
      case 'processed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'needs_review':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-blue-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };



  const getProgressPercentage = () => {
    if (!invoice) return 0;
    switch (invoice.status) {
      case 'processing':
        return 60;
      case 'needs_review':
        return 80;
      case 'processed':
        return 100;
      case 'failed':
        return 40;
      default:
        return 0;
    }
  };

  const steps = invoice ? getProcessingSteps(invoice.status) : mockProcessingSteps;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1>Processing Status: {invoice?.fileName || 'Unknown'}</h1>
        </div>
        <div className="flex items-center gap-4">
          {invoice && <StatusBadge status={invoice.status} className="text-lg px-4 py-2" />}
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-Run Extraction
          </Button>
        </div>
      </div>

      {/* Processing Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon(invoice?.status)}
            Processing Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Overall Progress</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-3" />
            </div>

            {/* Timeline Steps */}
            <div className="relative">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isCurrent = step.status === 'processing';
                const isCompleted = step.status === 'completed';
                const isPending = step.status === 'pending';
                const isFailed = step.status === 'failed';
                const StepIcon = getStepIcon(step.id);
                
                return (
                  <div key={step.id} className="relative flex items-start pb-8">
                    {/* Connector Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-5 top-10 w-0.5 h-12 ${
                          isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : isFailed ? 'bg-red-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                    
                    {/* Step Icon Container */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isCurrent
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : isFailed
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : isCurrent ? (
                        <StepIcon className="h-5 w-5 animate-pulse" />
                      ) : isFailed ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${isCompleted ? 'text-green-700' : isCurrent ? 'text-blue-700' : isFailed ? 'text-red-700' : 'text-gray-500'}`}>
                          {step.name}
                        </h4>
                        {step.duration && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                      {step.timestamp && (
                        <p className="text-xs text-gray-400 mt-1">
                          {isCompleted ? 'Completed' : isFailed ? 'Failed' : 'Started'} at {new Date(step.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                      {isFailed && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 text-sm text-red-600">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Processing failed - see details below
                          </div>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            Currently processing...
                          </div>
                          <Progress value={75} className="h-1 mt-2" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>File Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>File Name:</span>
              <span>{invoice?.fileName || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Upload Date:</span>
              <span>{invoice?.uploadDate || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>File Size:</span>
              <span>2.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span>Pages:</span>
              <span>3</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extraction Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Confidence Score:</span>
              <Badge variant={invoice?.confidenceScore && invoice.confidenceScore >= 90 ? 'default' : 'secondary'}>
                {invoice?.confidenceScore || 0}%
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Fields Extracted:</span>
              <span>{invoice?.invoiceData ? '12/15' : '0/15'}</span>
            </div>
            <div className="flex justify-between">
              <span>Line Items:</span>
              <span>{invoice?.invoiceData?.lineItems.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time:</span>
              <span>45 seconds</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Details (if failed) */}
      {invoice?.status === 'failed' && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Processing Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-red-600">
                Unable to extract invoice data. The PDF may be corrupted, password-protected, or contain unsupported formatting.
              </p>
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Error Details:</strong> OCR confidence too low (45%). Consider uploading a higher quality scan.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        {invoice?.status === 'needs_review' && (
          <Button>
            Continue to Review
          </Button>
        )}
        {invoice?.status === 'failed' && (
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Processing
          </Button>
        )}
        <Button variant="outline">
          Download Original PDF
        </Button>
      </div>
    </div>
  );
}