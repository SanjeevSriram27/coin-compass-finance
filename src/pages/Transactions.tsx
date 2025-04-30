
import React from 'react';
import NavBar from '@/components/NavBar';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import { FinanceProvider } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const Transactions = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-3xl font-bold">Transactions</h2>
              <TransactionForm />
            </div>
            
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-xl font-bold flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-finance-secondary" />
                  All Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList showAll={true} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Transactions;
