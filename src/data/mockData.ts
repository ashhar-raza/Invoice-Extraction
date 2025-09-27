import { Invoice } from '../types/invoice';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    fileName: 'invoice_microsoft_2024_Q1.pdf',
    invoiceNumber: 'MS-2024-001',
    vendor: 'Microsoft Corporation',
    uploadDate: '2024-01-15',
    amount: 24850.00,
    currency: 'USD',
    status: 'processed',
    confidenceScore: 96,
    invoiceData: {
      date: '2024-01-10',
      dueDate: '2024-02-10',
      poNumber: 'PO-2024-0089',
      taxAmount: 2485.00,
      taxRate: 10,
      subtotal: 22365.00,
      lineItems: [
        {
          id: 'li1',
          description: 'Microsoft 365 Business Premium - Annual Subscription',
          quantity: 150,
          unitPrice: 22.00,
          taxRate: 10,
          discount: 5,
          amount: 3135.00,
          confidence: 98
        },
        {
          id: 'li2',
          description: 'Azure Cloud Services - Enterprise Plan',
          quantity: 1,
          unitPrice: 18000.00,
          taxRate: 10,
          discount: 0,
          amount: 18000.00,
          confidence: 94
        },
        {
          id: 'li3',
          description: 'Visual Studio Professional Licenses',
          quantity: 25,
          unitPrice: 45.00,
          taxRate: 10,
          discount: 0,
          amount: 1125.00,
          confidence: 97
        },
        {
          id: 'li4',
          description: 'Office 365 E5 Security Add-on',
          quantity: 50,
          unitPrice: 12.00,
          taxRate: 10,
          discount: 10,
          amount: 540.00,
          confidence: 92
        }
      ]
    }
  },
  {
    id: '2',
    fileName: 'aws_billing_march_enterprise.pdf',
    invoiceNumber: 'AWS-2024-156',
    vendor: 'Amazon Web Services Inc.',
    uploadDate: '2024-03-05',
    amount: 18750.50,
    currency: 'USD',
    status: 'needs_review',
    confidenceScore: 78,
    invoiceData: {
      date: '2024-03-01',
      dueDate: '2024-03-31',
      poNumber: 'PO-2024-0156',
      taxAmount: 1875.05,
      taxRate: 10,
      subtotal: 16875.45,
      lineItems: [
        {
          id: 'li3',
          description: 'EC2 Instance Usage - c5.4xlarge',
          quantity: 720,
          unitPrice: 8.50,
          taxRate: 10,
          discount: 0,
          amount: 6120.00,
          confidence: 85
        },
        {
          id: 'li4',
          description: 'S3 Storage - Standard Tier',
          quantity: 5000,
          unitPrice: 0.023,
          taxRate: 10,
          discount: 0,
          amount: 115.00,
          confidence: 72
        },
        {
          id: 'li5',
          description: 'RDS Database - Multi-AZ PostgreSQL',
          quantity: 1,
          unitPrice: 4850.00,
          taxRate: 10,
          discount: 0,
          amount: 4850.00,
          confidence: 88
        },
        {
          id: 'li6',
          description: 'CloudFront CDN Data Transfer',
          quantity: 10000,
          unitPrice: 0.085,
          taxRate: 10,
          discount: 15,
          amount: 722.50,
          confidence: 76
        },
        {
          id: 'li7',
          description: 'Lambda Function Executions',
          quantity: 50000000,
          unitPrice: 0.0000002,
          taxRate: 10,
          discount: 0,
          amount: 10.00,
          confidence: 65
        }
      ]
    }
  },
  {
    id: '3',
    fileName: 'office_supplies_quarterly.pdf',
    invoiceNumber: 'STP-2024-0078',
    vendor: 'Staples Business Solutions',
    uploadDate: '2024-01-20',
    amount: 2845.99,
    currency: 'USD',
    status: 'processing',
    confidenceScore: 89,
    invoiceData: {
      date: '2024-01-18',
      dueDate: '2024-02-18',
      poNumber: 'PO-2024-0134',
      taxAmount: 258.72,
      taxRate: 9.1,
      subtotal: 2587.27,
      lineItems: [
        {
          id: 'li8',
          description: 'HP LaserJet Pro Printer M404dn',
          quantity: 3,
          unitPrice: 299.99,
          taxRate: 9.1,
          discount: 0,
          amount: 899.97,
          confidence: 95
        },
        {
          id: 'li9',
          description: 'Office Chair - Ergonomic Executive',
          quantity: 12,
          unitPrice: 89.50,
          taxRate: 9.1,
          discount: 10,
          amount: 967.80,
          confidence: 92
        },
        {
          id: 'li10',
          description: 'Paper - Letter Size 20lb (Case of 10)',
          quantity: 8,
          unitPrice: 52.99,
          taxRate: 9.1,
          discount: 0,
          amount: 423.92,
          confidence: 88
        }
      ]
    }
  },
  {
    id: '4',
    fileName: 'google_workspace_enterprise.pdf',
    invoiceNumber: 'G-2024-4892',
    vendor: 'Google LLC',
    uploadDate: '2024-02-10',
    amount: 1800.00,
    currency: 'USD',
    status: 'failed',
    confidenceScore: 45,
    invoiceData: {
      date: '2024-02-08',
      dueDate: '2024-03-08',
      taxAmount: 163.64,
      taxRate: 9.1,
      subtotal: 1636.36,
      lineItems: [
        {
          id: 'li11',
          description: 'Google Workspace Business Standard',
          quantity: 100,
          unitPrice: 12.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1200.00,
          confidence: 48
        },
        {
          id: 'li12',
          description: 'Google Cloud Platform Credits',
          quantity: 1,
          unitPrice: 436.36,
          taxRate: 9.1,
          discount: 0,
          amount: 436.36,
          confidence: 38
        }
      ]
    }
  },
  {
    id: '5',
    fileName: 'slack_enterprise_annual.pdf',
    invoiceNumber: 'SLACK-2024-001',
    vendor: 'Slack Technologies Inc.',
    uploadDate: '2024-01-08',
    amount: 15600.00,
    currency: 'USD',
    status: 'processed',
    confidenceScore: 94,
    invoiceData: {
      date: '2024-01-05',
      dueDate: '2024-02-05',
      poNumber: 'PO-2024-0012',
      taxAmount: 1418.18,
      taxRate: 9.1,
      subtotal: 14181.82,
      lineItems: [
        {
          id: 'li13',
          description: 'Slack Pro Plan - Annual Billing',
          quantity: 200,
          unitPrice: 71.00,
          taxRate: 9.1,
          discount: 15,
          amount: 12070.00,
          confidence: 96
        },
        {
          id: 'li14',
          description: 'Enterprise Key Management Add-on',
          quantity: 200,
          unitPrice: 15.00,
          taxRate: 9.1,
          discount: 0,
          amount: 3000.00,
          confidence: 91
        }
      ]
    }
  },
  {
    id: '6',
    fileName: 'adobe_creative_cloud_teams.pdf',
    invoiceNumber: 'ADBE-2024-0156',
    vendor: 'Adobe Inc.',
    uploadDate: '2024-02-15',
    amount: 8949.75,
    currency: 'USD',
    status: 'needs_review',
    confidenceScore: 82,
    invoiceData: {
      date: '2024-02-12',
      dueDate: '2024-03-12',
      poNumber: 'PO-2024-0089',
      taxAmount: 813.16,
      taxRate: 9.1,
      subtotal: 8136.59,
      lineItems: [
        {
          id: 'li15',
          description: 'Creative Cloud for Teams - Annual',
          quantity: 25,
          unitPrice: 79.99,
          taxRate: 9.1,
          discount: 0,
          amount: 1999.75,
          confidence: 89
        },
        {
          id: 'li16',
          description: 'Adobe Stock Standard Plan',
          quantity: 15,
          unitPrice: 29.99,
          taxRate: 9.1,
          discount: 0,
          amount: 449.85,
          confidence: 85
        },
        {
          id: 'li17',
          description: 'Acrobat Pro DC for Teams',
          quantity: 50,
          unitPrice: 22.99,
          taxRate: 9.1,
          discount: 0,
          amount: 1149.50,
          confidence: 78
        },
        {
          id: 'li18',
          description: 'Adobe Sign Transactions',
          quantity: 5000,
          unitPrice: 2.00,
          taxRate: 9.1,
          discount: 20,
          amount: 8000.00,
          confidence: 74
        }
      ]
    }
  },
  {
    id: '7',
    fileName: 'salesforce_enterprise_licensing.pdf',
    invoiceNumber: 'SFDC-2024-7891',
    vendor: 'Salesforce Inc.',
    uploadDate: '2024-03-01',
    amount: 45600.00,
    currency: 'USD',
    status: 'processing',
    confidenceScore: 91,
    invoiceData: {
      date: '2024-02-28',
      dueDate: '2024-03-30',
      poNumber: 'PO-2024-0234',
      taxAmount: 4145.45,
      taxRate: 9.1,
      subtotal: 41454.55,
      lineItems: [
        {
          id: 'li19',
          description: 'Salesforce Enterprise Edition',
          quantity: 150,
          unitPrice: 165.00,
          taxRate: 9.1,
          discount: 0,
          amount: 24750.00,
          confidence: 94
        },
        {
          id: 'li20',
          description: 'Marketing Cloud Professional',
          quantity: 50,
          unitPrice: 125.00,
          taxRate: 9.1,
          discount: 0,
          amount: 6250.00,
          confidence: 88
        },
        {
          id: 'li21',
          description: 'Service Cloud Enterprise',
          quantity: 75,
          unitPrice: 100.00,
          taxRate: 9.1,
          discount: 10,
          amount: 6750.00,
          confidence: 90
        },
        {
          id: 'li22',
          description: 'CPQ Advanced',
          quantity: 25,
          unitPrice: 75.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1875.00,
          confidence: 85
        }
      ]
    }
  },
  {
    id: '8',
    fileName: 'zoom_pro_annual_contract.pdf',
    invoiceNumber: 'ZM-2024-0445',
    vendor: 'Zoom Video Communications',
    uploadDate: '2024-01-25',
    amount: 7188.00,
    currency: 'USD',
    status: 'processed',
    confidenceScore: 97,
    invoiceData: {
      date: '2024-01-22',
      dueDate: '2024-02-22',
      poNumber: 'PO-2024-0098',
      taxAmount: 653.45,
      taxRate: 9.1,
      subtotal: 6534.55,
      lineItems: [
        {
          id: 'li23',
          description: 'Zoom Pro Plan - Annual',
          quantity: 200,
          unitPrice: 14.99,
          taxRate: 9.1,
          discount: 0,
          amount: 2998.00,
          confidence: 98
        },
        {
          id: 'li24',
          description: 'Zoom Phone Professional',
          quantity: 100,
          unitPrice: 20.00,
          taxRate: 9.1,
          discount: 0,
          amount: 2000.00,
          confidence: 96
        },
        {
          id: 'li25',
          description: 'Zoom Webinar 500 Capacity',
          quantity: 12,
          unitPrice: 79.00,
          taxRate: 9.1,
          discount: 0,
          amount: 948.00,
          confidence: 95
        },
        {
          id: 'li26',
          description: 'Cloud Storage 1TB Add-on',
          quantity: 50,
          unitPrice: 12.00,
          taxRate: 9.1,
          discount: 0,
          amount: 600.00,
          confidence: 94
        }
      ]
    }
  },
  {
    id: '9',
    fileName: 'mailchimp_premium_marketing.pdf',
    invoiceNumber: 'MC-2024-1256',
    vendor: 'The Rocket Science Group LLC',
    uploadDate: '2024-02-20',
    amount: 3288.00,
    currency: 'USD',
    status: 'needs_review',
    confidenceScore: 76,
    invoiceData: {
      date: '2024-02-18',
      dueDate: '2024-03-18',
      poNumber: 'PO-2024-0167',
      taxAmount: 299.09,
      taxRate: 9.1,
      subtotal: 2988.91,
      lineItems: [
        {
          id: 'li27',
          description: 'Mailchimp Premium Plan - Annual',
          quantity: 12,
          unitPrice: 199.00,
          taxRate: 9.1,
          discount: 0,
          amount: 2388.00,
          confidence: 81
        },
        {
          id: 'li28',
          description: 'Advanced Segmentation Add-on',
          quantity: 12,
          unitPrice: 50.00,
          taxRate: 9.1,
          discount: 0,
          amount: 600.00,
          confidence: 72
        }
      ]
    }
  },
  {
    id: '10',
    fileName: 'dropbox_business_advanced.pdf',
    invoiceNumber: 'DBX-2024-3344',
    vendor: 'Dropbox Inc.',
    uploadDate: '2024-03-10',
    amount: 4800.00,
    currency: 'USD',
    status: 'failed',
    confidenceScore: 52,
    invoiceData: {
      date: '2024-03-08',
      dueDate: '2024-04-08',
      taxAmount: 436.36,
      taxRate: 9.1,
      subtotal: 4363.64,
      lineItems: [
        {
          id: 'li29',
          description: 'Dropbox Business Advanced',
          quantity: 100,
          unitPrice: 24.00,
          taxRate: 9.1,
          discount: 0,
          amount: 2400.00,
          confidence: 58
        },
        {
          id: 'li30',
          description: 'DocSend Advanced Plan',
          quantity: 25,
          unitPrice: 10.00,
          taxRate: 9.1,
          discount: 0,
          amount: 250.00,
          confidence: 45
        },
        {
          id: 'li31',
          description: 'HelloSign Pro Signatures',
          quantity: 5000,
          unitPrice: 0.50,
          taxRate: 9.1,
          discount: 25,
          amount: 1875.00,
          confidence: 38
        }
      ]
    }
  },
  {
    id: '11',
    fileName: 'atlassian_suite_enterprise.pdf',
    invoiceNumber: 'TEAM-2024-0789',
    vendor: 'Atlassian Corporation',
    uploadDate: '2024-01-30',
    amount: 12960.00,
    currency: 'USD',
    status: 'processed',
    confidenceScore: 93,
    invoiceData: {
      date: '2024-01-28',
      dueDate: '2024-02-28',
      poNumber: 'PO-2024-0145',
      taxAmount: 1178.18,
      taxRate: 9.1,
      subtotal: 11781.82,
      lineItems: [
        {
          id: 'li32',
          description: 'Jira Software Premium - Annual',
          quantity: 150,
          unitPrice: 7.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1050.00,
          confidence: 96
        },
        {
          id: 'li33',
          description: 'Confluence Premium - Annual',
          quantity: 150,
          unitPrice: 5.50,
          taxRate: 9.1,
          discount: 0,
          amount: 825.00,
          confidence: 94
        },
        {
          id: 'li34',
          description: 'Bitbucket Premium - Annual',
          quantity: 100,
          unitPrice: 3.00,
          taxRate: 9.1,
          discount: 0,
          amount: 300.00,
          confidence: 92
        },
        {
          id: 'li35',
          description: 'Jira Service Management Premium',
          quantity: 75,
          unitPrice: 20.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1500.00,
          confidence: 90
        }
      ]
    }
  },
  {
    id: '12',
    fileName: 'hubspot_marketing_enterprise.pdf',
    invoiceNumber: 'HUBS-2024-5677',
    vendor: 'HubSpot Inc.',
    uploadDate: '2024-02-05',
    amount: 18000.00,
    currency: 'USD',
    status: 'processing',
    confidenceScore: 87,
    invoiceData: {
      date: '2024-02-03',
      dueDate: '2024-03-03',
      poNumber: 'PO-2024-0078',
      taxAmount: 1636.36,
      taxRate: 9.1,
      subtotal: 16363.64,
      lineItems: [
        {
          id: 'li36',
          description: 'Marketing Hub Enterprise - Annual',
          quantity: 1,
          unitPrice: 3600.00,
          taxRate: 9.1,
          discount: 0,
          amount: 3600.00,
          confidence: 91
        },
        {
          id: 'li37',
          description: 'Sales Hub Enterprise - Annual',
          quantity: 1,
          unitPrice: 1200.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1200.00,
          confidence: 89
        },
        {
          id: 'li38',
          description: 'Service Hub Enterprise - Annual',
          quantity: 1,
          unitPrice: 1200.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1200.00,
          confidence: 85
        },
        {
          id: 'li39',
          description: 'CMS Hub Enterprise - Annual',
          quantity: 1,
          unitPrice: 1200.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1200.00,
          confidence: 83
        }
      ]
    }
  },
  {
    id: '13',
    fileName: 'notion_team_workspace.pdf',
    invoiceNumber: 'NOT-2024-8899',
    vendor: 'Notion Labs Inc.',
    uploadDate: '2024-03-15',
    amount: 960.00,
    currency: 'USD',
    status: 'needs_review',
    confidenceScore: 81,
    invoiceData: {
      date: '2024-03-13',
      dueDate: '2024-04-13',
      poNumber: 'PO-2024-0198',
      taxAmount: 87.27,
      taxRate: 9.1,
      subtotal: 872.73,
      lineItems: [
        {
          id: 'li40',
          description: 'Notion Team Plan - Annual',
          quantity: 80,
          unitPrice: 8.00,
          taxRate: 9.1,
          discount: 0,
          amount: 640.00,
          confidence: 85
        },
        {
          id: 'li41',
          description: 'AI Add-on Credits',
          quantity: 40,
          unitPrice: 8.00,
          taxRate: 9.1,
          discount: 0,
          amount: 320.00,
          confidence: 76
        }
      ]
    }
  },
  {
    id: '14',
    fileName: 'figma_professional_team.pdf',
    invoiceNumber: 'FIG-2024-2233',
    vendor: 'Figma Inc.',
    uploadDate: '2024-01-12',
    amount: 1800.00,
    currency: 'USD',
    status: 'processed',
    confidenceScore: 95,
    invoiceData: {
      date: '2024-01-10',
      dueDate: '2024-02-10',
      poNumber: 'PO-2024-0034',
      taxAmount: 163.64,
      taxRate: 9.1,
      subtotal: 1636.36,
      lineItems: [
        {
          id: 'li42',
          description: 'Figma Professional Plan - Annual',
          quantity: 25,
          unitPrice: 12.00,
          taxRate: 9.1,
          discount: 0,
          amount: 300.00,
          confidence: 97
        },
        {
          id: 'li43',
          description: 'FigJam Professional Plan - Annual',
          quantity: 25,
          unitPrice: 3.00,
          taxRate: 9.1,
          discount: 0,
          amount: 75.00,
          confidence: 96
        },
        {
          id: 'li44',
          description: 'Figma Organization Setup Fee',
          quantity: 1,
          unitPrice: 1200.00,
          taxRate: 9.1,
          discount: 0,
          amount: 1200.00,
          confidence: 93
        }
      ]
    }
  },
  {
    id: '15',
    fileName: 'vercel_pro_team_hosting.pdf',
    invoiceNumber: 'VCL-2024-1122',
    vendor: 'Vercel Inc.',
    uploadDate: '2024-02-28',
    amount: 2400.00,
    currency: 'USD',
    status: 'processing',
    confidenceScore: 88,
    invoiceData: {
      date: '2024-02-26',
      dueDate: '2024-03-26',
      poNumber: 'PO-2024-0187',
      taxAmount: 218.18,
      taxRate: 9.1,
      subtotal: 2181.82,
      lineItems: [
        {
          id: 'li45',
          description: 'Vercel Pro Team Plan - Annual',
          quantity: 1,
          unitPrice: 2000.00,
          taxRate: 9.1,
          discount: 0,
          amount: 2000.00,
          confidence: 91
        },
        {
          id: 'li46',
          description: 'Edge Config Add-on',
          quantity: 1,
          unitPrice: 200.00,
          taxRate: 9.1,
          discount: 0,
          amount: 200.00,
          confidence: 85
        }
      ]
    }
  }
];

// Additional mock data for enhanced statistics
export const mockStats = {
  totalInvoices: mockInvoices.length,
  totalAmount: mockInvoices.reduce((sum, inv) => sum + inv.amount, 0),
  averageProcessingTime: '2.3 hours',
  successRate: 85.2,
  monthlyGrowth: 12.5,
  topVendors: [
    { name: 'Salesforce Inc.', amount: 45600.00, count: 1 },
    { name: 'Microsoft Corporation', amount: 24850.00, count: 1 },
    { name: 'Amazon Web Services Inc.', amount: 18750.50, count: 1 },
    { name: 'HubSpot Inc.', amount: 18000.00, count: 1 },
    { name: 'Slack Technologies Inc.', amount: 15600.00, count: 1 }
  ],
  recentActivity: [
    { action: 'Invoice processed', invoice: 'MS-2024-001', time: '5 minutes ago' },
    { action: 'Review required', invoice: 'AWS-2024-156', time: '12 minutes ago' },
    { action: 'Processing started', invoice: 'VCL-2024-1122', time: '25 minutes ago' },
    { action: 'Invoice uploaded', invoice: 'NOT-2024-8899', time: '1 hour ago' },
    { action: 'Processing failed', invoice: 'DBX-2024-3344', time: '2 hours ago' }
  ]
};

// Different processing states for different invoice types
export const getProcessingSteps = (invoiceStatus: string) => {
  const baseSteps = [
    {
      id: 1,
      name: 'Upload Complete',
      description: 'Invoice file received and validated',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:30:00Z',
      duration: '0.5s'
    },
    {
      id: 2,
      name: 'OCR Processing',
      description: 'Extracting text from PDF using advanced OCR',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:30:15Z',
      duration: '15.2s'
    },
    {
      id: 3,
      name: 'AI Analysis',
      description: 'Identifying invoice structure and key data points',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:31:45Z',
      duration: '32.1s'
    },
    {
      id: 4,
      name: 'Data Extraction',
      description: 'Extracting vendor, amounts, line items, and metadata',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:32:17Z',
      duration: '25.8s'
    },
    {
      id: 5,
      name: 'Validation',
      description: 'Validating extracted data against business rules',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:32:43Z',
      duration: '12.3s'
    },
    {
      id: 6,
      name: 'Quality Check',
      description: 'Final confidence scoring and quality assessment',
      status: 'completed' as const,
      timestamp: '2024-03-15T10:32:55Z',
      duration: '8.7s'
    }
  ];

  switch (invoiceStatus) {
    case 'processing':
      return baseSteps.map((step, index) => ({
        ...step,
        status: index < 4 ? 'completed' as const : index === 4 ? 'processing' as const : 'pending' as const,
        timestamp: index < 4 ? step.timestamp : index === 4 ? '2024-03-15T10:32:17Z' : null,
        duration: index < 4 ? step.duration : index === 4 ? null : null
      }));
    
    case 'failed':
      return baseSteps.map((step, index) => ({
        ...step,
        status: index < 2 ? 'completed' as const : index === 2 ? 'failed' as const : 'pending' as const,
        timestamp: index < 2 ? step.timestamp : index === 2 ? '2024-03-15T10:31:45Z' : null,
        duration: index < 2 ? step.duration : index === 2 ? 'Failed after 5.2s' : null,
        description: index === 2 ? 'Failed to identify invoice structure - low quality PDF' : step.description
      }));
    
    case 'needs_review':
      return baseSteps.map((step, index) => ({
        ...step,
        status: index < 5 ? 'completed' as const : index === 5 ? 'processing' as const : 'pending' as const,
        timestamp: index < 5 ? step.timestamp : index === 5 ? '2024-03-15T10:32:43Z' : null,
        duration: index < 5 ? step.duration : index === 5 ? null : null
      }));
    
    default:
      return baseSteps;
  }
};

export const mockProcessingSteps = getProcessingSteps('processing');