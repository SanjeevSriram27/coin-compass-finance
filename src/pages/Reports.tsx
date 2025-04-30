
import React from 'react';
import NavBar from '@/components/NavBar';
import ExpenseChart from '@/components/ExpenseChart';
import { FinanceProvider } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useFinance } from '@/context/FinanceContext';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const Reports = () => {
  const { transactions } = useFinance();

  // Group transactions by month for the bar chart
  const monthlyData = React.useMemo(() => {
    const months = new Array(12).fill(0).map((_, idx) => ({
      month: monthNames[idx],
      expenses: 0,
    }));

    // Only use transactions from the current year
    const currentYear = new Date().getFullYear();
    const expenses = transactions.filter(t => 
      t.type === 'expense' && new Date(t.date).getFullYear() === currentYear
    );

    expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth();
      months[month].expenses += expense.amount;
    });

    return months;
  }, [transactions]);

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
              <Card className="animate-fade-in h-[400px]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-finance-secondary" />
                    Expense Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[320px] flex items-center justify-center">
                  <div className="w-full h-full">
                    <ExpenseChart />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in h-[400px]">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-finance-secondary" />
                    Monthly Spending
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[320px]">
                  {monthlyData.some(data => data.expenses > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis 
                          tickFormatter={(value) => `$${value}`} 
                          width={50}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${value}`, 'Expenses']}
                          labelFormatter={(label) => `Month: ${label}`}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '8px'
                          }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="expenses" 
                          name="Expenses" 
                          fill="#1565C0" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No monthly spending data available
                    </div>
                  )}
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
