import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Save, ArrowLeft, Edit2, Check, X, FileText, Eye, AlertTriangle } from 'lucide-react';
import { Invoice } from '../types/invoice';
import { StatusBadge } from './StatusBadge';
import { ConfidenceBadge } from './ConfidenceBadge';

interface ReviewScreenProps {
  invoice: Invoice | null;
  onBack: () => void;
  onSelectInvoice: (invoice: Invoice) => void;
  allInvoices: Invoice[];
}

export function ReviewScreen({ invoice, onBack, onSelectInvoice, allInvoices }: ReviewScreenProps) {
  // Show invoice list if no invoice is selected
  if (!invoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1>Review Invoices</h1>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Invoices Requiring Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allInvoices.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No invoices require review at this time</p>
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
                              Review
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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingLineItem, setEditingLineItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || '',
    vendor: invoice?.vendor || '',
    date: invoice?.invoiceData?.date || '',
    poNumber: invoice?.invoiceData?.poNumber || '',
    currency: invoice?.currency || 'USD',
    taxRate: invoice?.invoiceData?.taxRate.toString() || '10',
  });

  const getConfidenceBadge = (confidence?: number) => {
    if (!confidence) return null;
    
    const variant = confidence >= 90 ? 'default' : confidence >= 70 ? 'secondary' : 'destructive';
    const color = confidence >= 90 ? 'text-green-600' : confidence >= 70 ? 'text-yellow-600' : 'text-red-600';
    
    return (
      <Badge variant={variant} className={`ml-2 ${color}`}>
        {confidence}%
      </Badge>
    );
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const variants = {
      processed: 'default',
      needs_review: 'secondary',
      failed: 'destructive',
      processing: 'outline'
    } as const;

    const labels = {
      processed: '✅ Processed',
      needs_review: '⚠️ Needs Review',
      failed: '❌ Failed',
      processing: '🔄 Processing'
    };

    return (
      <Badge variant={variants[status]} className="text-lg px-4 py-2">
        {labels[status]}
      </Badge>
    );
  };

  const handleFieldEdit = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setEditingField(null);
  };

  const renderEditableField = (label: string, field: keyof typeof formData, confidence?: number) => {
    const isEditing = editingField === field;
    
    return (
      <div className="space-y-2">
        <Label className="flex items-center">
          {label}
          {getConfidenceBadge(confidence)}
        </Label>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Input
                value={formData[field]}
                onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
                className="flex-1"
                autoFocus
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFieldEdit(field, formData[field])}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingField(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Input value={formData[field]} readOnly className="flex-1" />
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingField(field)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1>Review Invoice: {invoice.fileName}</h1>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(invoice.status)}
          <Button className="ml-4">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Invoice Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderEditableField('Invoice Number', 'invoiceNumber', 98)}
            {renderEditableField('Vendor', 'vendor', 95)}
            {renderEditableField('Invoice Date', 'date', 92)}
            {renderEditableField('PO Number', 'poNumber', 88)}
            {renderEditableField('Currency', 'currency', 99)}
            {renderEditableField('Tax Rate (%)', 'taxRate', 85)}
          </CardContent>
        </Card>

        {/* Right Panel - Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Amount Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{invoice.currency} {invoice.invoiceData?.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({invoice.invoiceData?.taxRate}%):</span>
              <span>{invoice.currency} {invoice.invoiceData?.taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Total Amount:</span>
              <span>{invoice.currency} {invoice.amount.toLocaleString()}</span>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Overall Confidence:</span>
                {getConfidenceBadge(invoice.confidenceScore)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-center">Tax %</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Confidence</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.invoiceData?.lineItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingLineItem === item.id ? (
                      <Input
                        defaultValue={item.description}
                        className="min-w-0"
                        autoFocus
                      />
                    ) : (
                      item.description
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingLineItem === item.id ? (
                      <Input
                        defaultValue={item.quantity.toString()}
                        className="w-16 text-center"
                      />
                    ) : (
                      item.quantity
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingLineItem === item.id ? (
                      <Input
                        defaultValue={item.unitPrice.toString()}
                        className="w-24 text-right"
                      />
                    ) : (
                      `$${item.unitPrice.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingLineItem === item.id ? (
                      <Input
                        defaultValue={item.taxRate.toString()}
                        className="w-16 text-center"
                      />
                    ) : (
                      `${item.taxRate}%`
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingLineItem === item.id ? (
                      <Input
                        defaultValue={item.discount.toString()}
                        className="w-20 text-right"
                      />
                    ) : (
                      `$${item.discount.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <strong>${item.amount.toFixed(2)}</strong>
                  </TableCell>
                  <TableCell className="text-center">
                    {getConfidenceBadge(item.confidence)}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingLineItem === item.id ? (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingLineItem(null)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingLineItem(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingLineItem(item.id)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}