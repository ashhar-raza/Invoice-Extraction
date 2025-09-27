export interface Invoice {
  id: string;
  fileName: string;
  invoiceNumber: string;
  vendor: string;
  uploadDate: string;
  amount: number;
  currency: string;
  status: 'processed' | 'needs_review' | 'failed' | 'processing';
  confidenceScore?: number;
  invoiceData?: {
    date: string;
    poNumber?: string;
    taxAmount: number;
    taxRate: number;
    subtotal: number;
    lineItems: LineItem[];
  };
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  amount: number;
  confidence?: number;
}

export type NavigationScreen = 'upload' | 'review' | 'processing' | 'dashboard' | 'config';