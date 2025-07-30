import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

interface CashFlowData {
  period: string;
  inflow: number;
  outflow: number;
  netFlow: number;
  cumulativeFlow: number;
}

export default function CashFlow() {
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    fetchCashFlowData();
  }, [selectedPeriod]);

  const fetchCashFlowData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockData: CashFlowData[] = [
        { period: 'Jan 2025', inflow: 45000, outflow: 32000, netFlow: 13000, cumulativeFlow: 13000 },
        { period: 'Feb 2025', inflow: 52000, outflow: 38000, netFlow: 14000, cumulativeFlow: 27000 },
        { period: 'Mar 2025', inflow: 48000, outflow: 35000, netFlow: 13000, cumulativeFlow: 40000 },
        { period: 'Apr 2025', inflow: 58000, outflow: 42000, netFlow: 16000, cumulativeFlow: 56000 },
        { period: 'May 2025', inflow: 62000, outflow: 45000, netFlow: 17000, cumulativeFlow: 73000 },
        { period: 'Jun 2025', inflow: 55000, outflow: 41000, netFlow: 14000, cumulativeFlow: 87000 }
      ];
      
      setCashFlowData(mockData);
    } catch (error) {
      console.error('Failed to fetch cash flow data:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentMonth = cashFlowData[cashFlowData.length - 1];
  const totalInflow = cashFlowData.reduce((sum, item) => sum + item.inflow, 0);
  const totalOutflow = cashFlowData.reduce((sum, item) => sum + item.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cash Flow Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your cash inflows and outflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Custom Period
          </Button>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inflow</p>
              <p className="text-2xl font-bold text-green-600">${totalInflow.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Outflow</p>
              <p className="text-2xl font-bold text-red-600">${totalOutflow.toLocaleString()}</p>
              <p className="text-sm text-red-600 mt-1">+5.2% from last period</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Cash Flow</p>
              <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(netCashFlow).toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 mt-1">+18.3% from last period</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Balance</p>
              <p className="text-2xl font-bold text-blue-600">
                ${currentMonth?.cumulativeFlow.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-gray-500 mt-1">As of today</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Trend</CardTitle>
        </CardHeader>
        
        {loading ? (
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="h-64 flex items-end justify-between space-x-2 p-4">
            {cashFlowData.map((item, index) => {
              const maxValue = Math.max(...cashFlowData.map(d => Math.max(d.inflow, d.outflow)));
              const inflowHeight = (item.inflow / maxValue) * 200;
              const outflowHeight = (item.outflow / maxValue) * 200;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="flex items-end space-x-1 w-full max-w-16">
                    <div 
                      className="bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600 flex-1 min-w-6"
                      style={{ height: `${inflowHeight}px` }}
                      title={`Inflow: $${item.inflow.toLocaleString()}`}
                    ></div>
                    <div 
                      className="bg-red-500 rounded-t transition-all duration-500 hover:bg-red-600 flex-1 min-w-6"
                      style={{ height: `${outflowHeight}px` }}
                      title={`Outflow: $${item.outflow.toLocaleString()}`}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center font-medium">{item.period}</p>
                  <p className={`text-xs font-bold ${item.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.netFlow >= 0 ? '+' : ''}${item.netFlow.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="flex justify-center space-x-8 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Cash Inflow</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Cash Outflow</span>
          </div>
        </div>
      </Card>

      {/* Detailed Cash Flow Table */}
      <Card padding="none">
        <CardHeader>
          <CardTitle>Cash Flow Details</CardTitle>
        </CardHeader>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Inflow</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Outflow</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Flow</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cashFlowData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-green-600">
                    +${item.inflow.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                    -${item.outflow.toLocaleString()}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    item.netFlow >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.netFlow >= 0 ? '+' : ''}${item.netFlow.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-blue-600">
                    ${item.cumulativeFlow.toLocaleString()}
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