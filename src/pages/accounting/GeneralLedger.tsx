import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Search, Filter, Download } from 'lucide-react';

interface LedgerEntry {
  id: string;
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  reference: string;
}

export default function GeneralLedger() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetchLedgerEntries();
  }, []);

  const fetchLedgerEntries = async () => {
    try {
      // TODO: Replace with actual API call
      // const data = await apiService.getGeneralLedger();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockEntries: LedgerEntry[] = [
        {
          id: '1',
          date: '2025-01-20',
          account: 'Cash',
          description: 'Client payment received',
          debit: 5000,
          credit: 0,
          balance: 25000,
          reference: 'INV-001'
        },
        {
          id: '2',
          date: '2025-01-19',
          account: 'Office Rent',
          description: 'Monthly office rent',
          debit: 0,
          credit: 2500,
          balance: 20000,
          reference: 'EXP-001'
        },
        {
          id: '3',
          date: '2025-01-18',
          account: 'Software Licenses',
          description: 'Annual software subscription',
          debit: 0,
          credit: 1200,
          balance: 22500,
          reference: 'SUB-001'
        },
        {
          id: '4',
          date: '2025-01-17',
          account: 'Consulting Revenue',
          description: 'Consulting services rendered',
          debit: 3500,
          credit: 0,
          balance: 23700,
          reference: 'INV-002'
        }
      ];
      
      setEntries(mockEntries);
    } catch (error) {
      console.error('Failed to fetch ledger entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateRange = (!dateRange.start || entry.date >= dateRange.start) &&
                            (!dateRange.end || entry.date <= dateRange.end);
    
    return matchesSearch && matchesDateRange;
  });

  const totalDebits = filteredEntries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredits = filteredEntries.reduce((sum, entry) => sum + entry.credit, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">General Ledger</h1>
          <p className="text-gray-600 mt-2">View and manage all ledger entries</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search accounts, descriptions, or references..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Input
              type="date"
              placeholder="Start date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <Input
              type="date"
              placeholder="End date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Debits</p>
            <p className="text-2xl font-bold text-green-600">${totalDebits.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Total Credits</p>
            <p className="text-2xl font-bold text-red-600">${totalCredits.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">Net Balance</p>
            <p className={`text-2xl font-bold ${(totalDebits - totalCredits) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(totalDebits - totalCredits).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* Ledger Table */}
      <Card padding="none">
        <CardHeader>
          <CardTitle>Ledger Entries</CardTitle>
        </CardHeader>
        
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.account}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                      {entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                      {entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      ${entry.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}