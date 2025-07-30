import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../components/ui/Card';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockData } from '../services/api';

interface DashboardStats {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  cashFlow: number;
  accounts: {
    payable: number;
    receivable: number;
  };
  recentTransactions: Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API call
        // const data = await apiService.getDashboardData();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockData.dashboardData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            ${value.toLocaleString()}
          </p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              {trendValue}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${
          trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`} />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your financial performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          trend="up"
          trendValue="12.5"
        />
        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={CreditCard}
          trend="down"
          trendValue="3.2"
        />
        <StatCard
          title="Net Income"
          value={stats.netIncome}
          icon={TrendingUp}
          trend="up"
          trendValue="8.1"
        />
        <StatCard
          title="Cash Flow"
          value={stats.cashFlow}
          icon={TrendingDown}
          trend="up"
          trendValue="15.3"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {stats.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">Accounts Receivable</p>
                <p className="text-xl font-bold text-blue-600">${stats.accounts.receivable.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            
            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">Accounts Payable</p>
                <p className="text-xl font-bold text-orange-600">${stats.accounts.payable.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Net Position</span>
                <span className="text-sm font-bold text-green-600">
                  +${(stats.accounts.receivable - stats.accounts.payable).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <DollarSign className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <p className="font-medium">New Invoice</p>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CreditCard className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <p className="font-medium">Record Expense</p>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <p className="font-medium">View Reports</p>
          </button>
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingDown className="w-8 h-8 mx-auto text-orange-600 mb-2" />
            <p className="font-medium">Fund Transfer</p>
          </button>
        </div>
      </Card>
    </div>
  );
}