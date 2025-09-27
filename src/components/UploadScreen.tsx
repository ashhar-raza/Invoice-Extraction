import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Upload, FileText, Eye, Download, Trash2 } from 'lucide-react';
import { mockInvoices } from '../data/mockData';
import { Invoice } from '../types/invoice';
import { StatusBadge } from './StatusBadge';

interface UploadScreenProps {
  onSelectInvoice: (invoice: Invoice) => void;
  onNavigate: (screen: string) => void;
}

export function UploadScreen({ onSelectInvoice, onNavigate }: UploadScreenProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedInvoices, setUploadedInvoices] = useState<Invoice[]>(mockInvoices);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type === "application/pdf");
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === "application/pdf");
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUploadFiles = () => {
    const newInvoices: Invoice[] = files.map(file => ({
      id: Date.now() + Math.random(), // simple unique id
      fileName: file.name,
      uploadDate: new Date().toLocaleDateString(),
      vendor: "Unknown",
      amount: 0,
      currency: "USD",
      status: "processing"
    }));

    setUploadedInvoices(prev => [...newInvoices, ...prev]);
    setFiles([]); // clear selected files
  };

  const handleViewInvoice = (invoice: Invoice) => {
    onSelectInvoice(invoice);
    if (invoice.status === 'needs_review' || invoice.status === 'processed') {
      onNavigate('review');
    } else if (invoice.status === 'processing' || invoice.status === 'failed') {
      onNavigate('processing');
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Card */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle className="gradient-text">Upload Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`upload-area rounded-xl p-12 text-center transition-all duration-300 ${dragActive ? 'scale-[1.02] shadow-2xl' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center transition-all shadow-lg ${dragActive ? 'scale-110 shadow-xl' : ''}`}>
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Drop your PDF invoices here</h3>
            <p className="text-muted-foreground mb-6 font-medium">or click below to browse and select files</p>
            <div>
              <Button className="btn-gradient-primary relative font-semibold px-8 py-3">
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                Choose Files
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Supports batch upload • PDF files only • Max 50MB per file</p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-foreground">Ready to Upload ({files.length} files):</h4>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{file.name}</span>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className="w-full btn-gradient-primary font-semibold py-3"
                onClick={handleUploadFiles}
              >
                Upload {files.length} File{files.length > 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Uploads */}
      <Card className="card-shadow border-0">
        <CardHeader>
          <CardTitle className="gradient-text">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border card-shadow bg-card">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-medium text-foreground">File Name</TableHead>
                  <TableHead className="font-medium text-foreground">Upload Date</TableHead>
                  <TableHead className="font-medium text-foreground">Vendor</TableHead>
                  <TableHead className="font-medium text-foreground">Amount</TableHead>
                  <TableHead className="font-medium text-foreground">Status</TableHead>
                  <TableHead className="font-medium text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedInvoices.map((invoice, index) => (
                  <TableRow
                    key={invoice.id}
                    className={`hover:bg-accent/30 transition-all duration-200 ${index % 2 === 0 ? 'table-row-odd' : 'table-row-even'}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{invoice.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.uploadDate}</TableCell>
                    <TableCell className="font-medium text-foreground">{invoice.vendor}</TableCell>
                    <TableCell className="font-medium text-foreground">{invoice.currency} {invoice.amount.toLocaleString()}</TableCell>
                    <TableCell><StatusBadge status={invoice.status} /></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewInvoice(invoice)} className="btn-hover-primary transition-all duration-200 border-primary/20">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:text-white transition-all duration-200 border-primary/20">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
