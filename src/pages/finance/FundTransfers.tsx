import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowLeftRight, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TransferHistory {
  id: string;
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
}

export default function FundTransfers() {
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: '',
    transferDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [transferHistory] = useState<TransferHistory[]>([
    {
      id: '1',
      date: '2025-01-20',
      fromAccount: 'Main Checking',
      toAccount: 'Savings Account',
      amount: 5000,
      status: 'completed',
      reference: 'TXN-001'
    },
    {
      id: '2',
      date: '2025-01-19',
      fromAccount: 'Business Account',
      toAccount: 'Main Checking',
      amount: 2500,
      status: 'pending',
      reference: 'TXN-002'
    },
    {
      id: '3',
      date: '2025-01-18',
      fromAccount: 'Savings Account',
      toAccount: 'Investment Account',
      amount: 10000,
      status: 'completed',
      reference: 'TXN-003'
    }
  ]);

  const accounts = [
    { id: 'main', name: 'Main Checking', balance: 25000 },
    { id: 'savings', name: 'Savings Account', balance: 45000 },
    { id: 'business', name: 'Business Account', balance: 18000 },
    { id: 'investment', name: 'Investment Account', balance: 72000 }
  ];

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await apiService.createFundTransfer(transferData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setTransferData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: '',
        transferDate: new Date().toISOString().split('T')[0]
      });
      
      alert('Transfer initiated successfully!');
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fund Transfers</h1>
        <p className="text-gray-600 mt-2">Transfer funds between accounts instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowLeftRight className="w-5 h-5 mr-2" />
              New Transfer
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleTransfer} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Account
                </label>
                <select
                  value={transferData.fromAccount}
                  onChange={(e) => setTransferData(prev => ({ ...prev, fromAccount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.name}>
                      {account.name} - ${account.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Account
                </label>
                <select
                  value={transferData.toAccount}
                  onChange={(e) => setTransferData(prev => ({ ...prev, toAccount: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select account</option>
                  {accounts
                    .filter(account => account.name !== transferData.fromAccount)
                    .map((account) => (
                      <option key={account.id} value={account.name}>
                        {account.name} - ${account.balance.toLocaleString()}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Amount"
                type="number"
                step="0.01"
                min="0"
                value={transferData.amount}
                onChange={(e) => setTransferData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                required
              />

              <Input
                label="Transfer Date"
                type="date"
                value={transferData.transferDate}
                onChange={(e) => setTransferData(prev => ({ ...prev, transferDate: e.target.value }))}
                required
              />
            </div>

            <Input
              label="Description (Optional)"
              value={transferData.description}
              onChange={(e) => setTransferData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a note for this transfer"
            />

            {/* Transfer Preview */}
            {transferData.fromAccount && transferData.toAccount && transferData.amount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Transfer Preview</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-800">{transferData.fromAccount}</span>
                  <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">{transferData.toAccount}</span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-lg font-bold text-blue-900">
                    ${parseFloat(transferData.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Initiate Transfer
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setTransferData({
                  fromAccount: '',
                  toAccount: '',
                  amount: '',
                  description: '',
                  transferDate: new Date().toISOString().split('T')[0]
                })}
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        {/* Account Balances */}
        <Card>
          <CardHeader>
            <CardTitle>Account Balances</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{account.name}</p>
                  <p className="text-sm text-gray-500">Available Balance</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${account.balance.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Transfer History */}
      <Card padding="none">
        <CardHeader>
          <CardTitle>Recent Transfers</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From → To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transferHistory.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transfer.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>{transfer.fromAccount}</span>
                      <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                      <span>{transfer.toAccount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${transfer.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                      {getStatusIcon(transfer.status)}
                      <span className="ml-1 capitalize">{transfer.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transfer.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}