import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import GeneralLedger from './pages/accounting/GeneralLedger';
import CashFlow from './pages/finance/CashFlow';
import FundTransfers from './pages/finance/FundTransfers';
import VATCalculator from './pages/taxes/VATCalculator';

// Placeholder components for remaining pages
const AccountsPayable = () => <div className="p-6"><h1 className="text-2xl font-bold">Accounts Payable</h1><p>Coming soon...</p></div>;
const AccountsReceivable = () => <div className="p-6"><h1 className="text-2xl font-bold">Accounts Receivable</h1><p>Coming soon...</p></div>;
const JournalEntries = () => <div className="p-6"><h1 className="text-2xl font-bold">Journal Entries</h1><p>Coming soon...</p></div>;
const FinancialStatements = () => <div className="p-6"><h1 className="text-2xl font-bold">Financial Statements</h1><p>Coming soon...</p></div>;
const BudgetMonitoring = () => <div className="p-6"><h1 className="text-2xl font-bold">Budget Monitoring</h1><p>Coming soon...</p></div>;
const TransactionHistory = () => <div className="p-6"><h1 className="text-2xl font-bold">Transaction History</h1><p>Coming soon...</p></div>;
const Investments = () => <div className="p-6"><h1 className="text-2xl font-bold">Investments</h1><p>Coming soon...</p></div>;
const ExpenseForecast = () => <div className="p-6"><h1 className="text-2xl font-bold">Expense Forecast</h1><p>Coming soon...</p></div>;
const LoansCredit = () => <div className="p-6"><h1 className="text-2xl font-bold">Loans & Credit</h1><p>Coming soon...</p></div>;
const CapitalAllocation = () => <div className="p-6"><h1 className="text-2xl font-bold">Capital Allocation</h1><p>Coming soon...</p></div>;
const BudgetPlanning = () => <div className="p-6"><h1 className="text-2xl font-bold">Budget Planning</h1><p>Coming soon...</p></div>;
const TaxReports = () => <div className="p-6"><h1 className="text-2xl font-bold">Tax Reports</h1><p>Coming soon...</p></div>;
const QuarterlySummary = () => <div className="p-6"><h1 className="text-2xl font-bold">Quarterly Summary</h1><p>Coming soon...</p></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Accounting Routes */}
                    <Route path="/accounting/general-ledger" element={<GeneralLedger />} />
                    <Route path="/accounting/accounts-payable" element={<AccountsPayable />} />
                    <Route path="/accounting/accounts-receivable" element={<AccountsReceivable />} />
                    <Route path="/accounting/journal-entries" element={<JournalEntries />} />
                    
                    {/* Reports Routes */}
                    <Route path="/reports/financial-statements" element={<FinancialStatements />} />
                    <Route path="/reports/budget-monitoring" element={<BudgetMonitoring />} />
                    <Route path="/reports/transaction-history" element={<TransactionHistory />} />
                    
                    {/* Finance Routes */}
                    <Route path="/finance/cash-flow" element={<CashFlow />} />
                    <Route path="/finance/investments" element={<Investments />} />
                    <Route path="/finance/expense-forecast" element={<ExpenseForecast />} />
                    <Route path="/finance/loans-credit" element={<LoansCredit />} />
                    <Route path="/finance/capital-allocation" element={<CapitalAllocation />} />
                    <Route path="/finance/budget-planning" element={<BudgetPlanning />} />
                    <Route path="/finance/fund-transfers" element={<FundTransfers />} />
                    
                    {/* Tax Routes */}
                    <Route path="/taxes/vat-calculator" element={<VATCalculator />} />
                    <Route path="/taxes/tax-reports" element={<TaxReports />} />
                    <Route path="/taxes/quarterly-summary" element={<QuarterlySummary />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;