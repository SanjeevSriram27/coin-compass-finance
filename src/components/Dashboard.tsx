
import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import GoalTracker from './GoalTracker';
import ExpenseChart from './ExpenseChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  const { transactions, balance } = useFinance();
  
  // Calculate total income and expense
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
    
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);

  // Calculate savings rate (if income > 0)
  const savingsRate = income > 0 
    ? ((income - expenses) / income * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Financial Dashboard</h2>
        <TransactionForm />
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Current Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<DollarSign />}
          description="Total net worth"
          colorClass="from-blue-600 to-blue-800"
        />
        <SummaryCard
          title="Total Income"
          value={`$${income.toFixed(2)}`}
          icon={<TrendingUp />}
          description="All time earnings"
          colorClass="from-green-600 to-green-800"
        />
        <SummaryCard
          title="Total Expenses"
          value={`$${expenses.toFixed(2)}`}
          icon={<TrendingDown />}
          description="All time spending"
          colorClass="from-red-600 to-red-800"
        />
        <SummaryCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon={<ArrowUpRight />}
          description="Of your income"
          colorClass="from-purple-600 to-purple-800"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
        <div>
          <GoalTracker />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart />
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Financial Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                  <span className="text-sm font-medium">1</span>
                </div>
                <p>Save at least 20% of your income for long-term goals.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                  <span className="text-sm font-medium">2</span>
                </div>
                <p>Track your expenses regularly to identify spending patterns.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                  <span className="text-sm font-medium">3</span>
                </div>
                <p>Build an emergency fund covering 3-6 months of expenses.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">
                  <span className="text-sm font-medium">4</span>
                </div>
                <p>Review your subscriptions monthly to avoid unnecessary expenses.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const SummaryCard = ({ title, value, description, icon, colorClass }: SummaryCardProps) => {
  return (
    <Card className="overflow-hidden animate-slide-up">
      <div className={`bg-gradient-to-r ${colorClass} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm opacity-90">{title}</h3>
          <div className="p-2 bg-white/20 rounded-full">
            {icon}
          </div>
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <p className="text-sm mt-1 opacity-80">{description}</p>
      </div>
    </Card>
  );
};

export default Dashboard;
