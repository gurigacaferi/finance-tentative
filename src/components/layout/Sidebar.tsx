import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Banknote, 
  Receipt,
  ChevronDown,
  Menu,
  X,
  Calculator,
  FileText,
  TrendingUp,
  CreditCard,
  Building2,
  ArrowLeftRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Accounting',
    path: '/accounting',
    icon: BookOpen,
    children: [
      { name: 'General Ledger', path: '/accounting/general-ledger', icon: FileText },
      { name: 'Accounts Payable', path: '/accounting/accounts-payable', icon: Receipt },
      { name: 'Accounts Receivable', path: '/accounting/accounts-receivable', icon: Banknote },
      { name: 'Journal Entries', path: '/accounting/journal-entries', icon: BookOpen }
    ]
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: BarChart3,
    children: [
      { name: 'Financial Statements', path: '/reports/financial-statements', icon: FileText },
      { name: 'Budget Monitoring', path: '/reports/budget-monitoring', icon: TrendingUp },
      { name: 'Transaction History', path: '/reports/transaction-history', icon: ArrowLeftRight }
    ]
  },
  {
    name: 'Finance',
    path: '/finance',
    icon: Banknote,
    children: [
      { name: 'Cash Flow', path: '/finance/cash-flow', icon: TrendingUp },
      { name: 'Investments', path: '/finance/investments', icon: BarChart3 },
      { name: 'Expense Forecast', path: '/finance/expense-forecast', icon: Calculator },
      { name: 'Loans & Credit', path: '/finance/loans-credit', icon: CreditCard },
      { name: 'Capital Allocation', path: '/finance/capital-allocation', icon: Building2 },
      { name: 'Budget Planning', path: '/finance/budget-planning', icon: FileText },
      { name: 'Fund Transfers', path: '/finance/fund-transfers', icon: ArrowLeftRight }
    ]
  },
  {
    name: 'Taxes',
    path: '/taxes',
    icon: Receipt,
    children: [
      { name: 'VAT Calculator', path: '/taxes/vat-calculator', icon: Calculator },
      { name: 'Tax Reports', path: '/taxes/tax-reports', icon: FileText },
      { name: 'Quarterly Summary', path: '/taxes/quarterly-summary', icon: BarChart3 }
    ]
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const NavItem: React.FC<{ item: NavItem; level?: number }> = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const Icon = item.icon;

    return (
      <div className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium rounded-md
              transition-colors duration-200
              ${level === 0 ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-50 ml-4'}
            `}
          >
            <div className="flex items-center">
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </div>
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        ) : (
          <NavLink
            to={item.path}
            className={({ isActive }) => `
              flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
              ${level === 0 ? '' : 'ml-4'}
              ${isActive 
                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            <Icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => (
              <NavItem key={child.name} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Banknote className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">FinanceApp</h1>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4 pb-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};