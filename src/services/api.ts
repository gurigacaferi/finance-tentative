// API service layer for modular backend integration

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('auth_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Dashboard endpoints
  async getDashboardData() {
    return this.request('/dashboard');
  }

  // Accounting endpoints
  async getGeneralLedger(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/accounting/general-ledger${query}`);
  }

  async getAccountsPayable(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/accounting/accounts-payable${query}`);
  }

  async getAccountsReceivable(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/accounting/accounts-receivable${query}`);
  }

  async getJournalEntries(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/accounting/journal-entries${query}`);
  }

  async createJournalEntry(data: any) {
    return this.request('/accounting/journal-entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateJournalEntry(id: string, data: any) {
    return this.request(`/accounting/journal-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteJournalEntry(id: string) {
    return this.request(`/accounting/journal-entries/${id}`, {
      method: 'DELETE',
    });
  }

  // Reports endpoints
  async getFinancialStatements(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/reports/financial-statements${query}`);
  }

  async getBudgetMonitoring(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/reports/budget-monitoring${query}`);
  }

  async getTransactionHistory(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/reports/transaction-history${query}`);
  }

  // Finance endpoints
  async getCashFlow(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/finance/cash-flow${query}`);
  }

  async getInvestments() {
    return this.request('/finance/investments');
  }

  async getExpenseForecast(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/finance/expense-forecast${query}`);
  }

  async getLoansCredit() {
    return this.request('/finance/loans-credit');
  }

  async getCapitalAllocation() {
    return this.request('/finance/capital-allocation');
  }

  async getBudgetPlanning() {
    return this.request('/finance/budget-planning');
  }

  async createFundTransfer(data: any) {
    return this.request('/finance/fund-transfers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Tax endpoints
  async calculateVAT(data: any) {
    return this.request('/taxes/vat-calculate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getTaxReports(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/taxes/reports${query}`);
  }

  async getQuarterlySummary(params?: any) {
    const query = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/taxes/quarterly-summary${query}`);
  }
}

export const apiService = new ApiService();

// Mock data for development
export const mockData = {
  dashboardData: {
    totalRevenue: 145000,
    totalExpenses: 89000,
    netIncome: 56000,
    cashFlow: 42000,
    accounts: {
      payable: 15000,
      receivable: 32000
    },
    recentTransactions: [
      { id: '1', date: '2025-01-20', description: 'Client Payment', amount: 5000, type: 'income' },
      { id: '2', date: '2025-01-19', description: 'Office Rent', amount: -2500, type: 'expense' },
      { id: '3', date: '2025-01-18', description: 'Software License', amount: -299, type: 'expense' },
      { id: '4', date: '2025-01-17', description: 'Consulting Fee', amount: 3500, type: 'income' },
    ]
  },
  investments: [
    { id: '1', name: 'Tech Growth Fund', value: 25000, return: 12.5, risk: 'Medium' },
    { id: '2', name: 'Bond Portfolio', value: 15000, return: 4.2, risk: 'Low' },
    { id: '3', name: 'Real Estate REIT', value: 18000, return: 8.7, risk: 'Medium' },
  ],
  transactions: Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    date: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
    description: ['Client Payment', 'Office Rent', 'Software License', 'Consulting Fee', 'Equipment Purchase'][Math.floor(Math.random() * 5)],
    amount: Math.floor(Math.random() * 10000) - 2000,
    category: ['Income', 'Expense', 'Transfer'][Math.floor(Math.random() * 3)],
    account: ['Main Account', 'Savings', 'Business'][Math.floor(Math.random() * 3)]
  }))
};