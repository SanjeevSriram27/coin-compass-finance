
import React from 'react';
import NavBar from '@/components/NavBar';
import ExpenseChart from '@/components/ExpenseChart';
import { FinanceProvider } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart } from 'lucide-react';

const Reports = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Financial Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-finance-secondary" />
                    Expense Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ExpenseChart />
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-finance-secondary" />
                    Monthly Spending
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Monthly spending chart coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Reports;
