import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Calculator, Globe, Download } from 'lucide-react';

interface VATCalculation {
  netAmount: number;
  vatRate: number;
  vatAmount: number;
  grossAmount: number;
  country: string;
}

export default function VATCalculator() {
  const [calculation, setCalculation] = useState<VATCalculation>({
    netAmount: 0,
    vatRate: 20,
    vatAmount: 0,
    grossAmount: 0,
    country: 'UK'
  });
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');
  const [inputAmount, setInputAmount] = useState('');

  const vatRates = {
    UK: { standard: 20, reduced: 5, zero: 0 },
    US: { standard: 0, state: 8.5 }, // No federal VAT, state sales tax varies
    Germany: { standard: 19, reduced: 7 },
    France: { standard: 20, reduced: 10, super_reduced: 5.5 },
    Spain: { standard: 21, reduced: 10, super_reduced: 4 },
    Italy: { standard: 22, reduced: 10, super_reduced: 4 },
    Netherlands: { standard: 21, reduced: 9 },
    Canada: { gst: 5, hst: 13 }, // GST + provincial taxes
    Australia: { gst: 10 },
    Japan: { standard: 10, reduced: 8 }
  };

  const calculateVAT = () => {
    const amount = parseFloat(inputAmount) || 0;
    const rate = calculation.vatRate / 100;

    let result: VATCalculation;

    if (calculationType === 'add') {
      // Adding VAT to net amount
      const vatAmount = amount * rate;
      result = {
        netAmount: amount,
        vatRate: calculation.vatRate,
        vatAmount: vatAmount,
        grossAmount: amount + vatAmount,
        country: calculation.country
      };
    } else {
      // Removing VAT from gross amount
      const netAmount = amount / (1 + rate);
      const vatAmount = amount - netAmount;
      result = {
        netAmount: netAmount,
        vatRate: calculation.vatRate,
        vatAmount: vatAmount,
        grossAmount: amount,
        country: calculation.country
      };
    }

    setCalculation(result);
  };

  const handleCountryChange = (country: string) => {
    setCalculation(prev => ({
      ...prev,
      country,
      vatRate: (vatRates as any)[country]?.standard || 20
    }));
  };

  const exportCalculation = () => {
    const data = {
      calculation_type: calculationType,
      input_amount: inputAmount,
      ...calculation,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vat-calculation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">VAT Calculator</h1>
        <p className="text-gray-600 mt-2">Calculate VAT for different countries and rates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              VAT Calculation
            </CardTitle>
          </CardHeader>

          <div className="space-y-6">
            {/* Calculation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calculation Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="add"
                    checked={calculationType === 'add'}
                    onChange={(e) => setCalculationType(e.target.value as 'add')}
                    className="mr-2"
                  />
                  Add VAT to net amount
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="remove"
                    checked={calculationType === 'remove'}
                    onChange={(e) => setCalculationType(e.target.value as 'remove')}
                    className="mr-2"
                  />
                  Remove VAT from gross amount
                </label>
              </div>
            </div>

            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4 inline mr-1" />
                Country
              </label>
              <select
                value={calculation.country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(vatRates).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* VAT Rate */}
            <Input
              label="VAT Rate (%)"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={calculation.vatRate}
              onChange={(e) => setCalculation(prev => ({ ...prev, vatRate: parseFloat(e.target.value) || 0 }))}
            />

            {/* Amount Input */}
            <Input
              label={calculationType === 'add' ? 'Net Amount' : 'Gross Amount'}
              type="number"
              step="0.01"
              min="0"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="Enter amount"
            />

            <Button onClick={calculateVAT} className="w-full">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate VAT
            </Button>
          </div>
        </Card>

        {/* Calculation Results */}
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
          </CardHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Net Amount</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${calculation.netAmount.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-600">VAT Amount</p>
                <p className="text-2xl font-bold text-green-900">
                  ${calculation.vatAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-purple-600">Gross Amount</p>
              <p className="text-3xl font-bold text-purple-900">
                ${calculation.grossAmount.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium">{calculation.country}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">VAT Rate:</span>
                <span className="font-medium">{calculation.vatRate}%</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Calculation:</span>
                <span className="font-medium">
                  {calculationType === 'add' ? 'Added VAT' : 'Removed VAT'}
                </span>
              </div>
            </div>

            <Button onClick={exportCalculation} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Calculation
            </Button>
          </div>
        </Card>
      </div>

      {/* VAT Rates Reference */}
      <Card>
        <CardHeader>
          <CardTitle>VAT Rates Reference</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(vatRates).map(([country, rates]) => (
            <div key={country} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{country}</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(rates).map(([type, rate]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-gray-600 capitalize">
                      {type.replace('_', ' ')}:
                    </span>
                    <span className="font-medium">{rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Calculations */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Calculations</CardTitle>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[100, 500, 1000].map((amount) => (
            <div key={amount} className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Quick Calc: ${amount}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Net:</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT ({calculation.vatRate}%):</span>
                  <span className="font-medium">${(amount * calculation.vatRate / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span>Gross:</span>
                  <span className="font-bold">${(amount * (1 + calculation.vatRate / 100)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}