
import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryTotal } from '../types/finance';

const COLORS = [
  '#1E88E5', // Blue
  '#43A047', // Green
  '#E53935', // Red
  '#FB8C00', // Orange
  '#8E24AA', // Purple
  '#00ACC1', // Teal
  '#FFB300', // Amber
  '#5C6BC0', // Indigo
  '#26A69A', // Green-Teal
  '#EC407A', // Pink
  '#7CB342', // Light Green
  '#29B6F6'  // Light Blue
];

const ExpenseChart: React.FC = () => {
  const { transactions } = useFinance();

  const expenseData = useMemo(() => {
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group by category and sum amounts
    const categoryMap = new Map<string, number>();
    
    expenses.forEach(expense => {
      const { category, amount } = expense;
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + amount);
    });
    
    // Convert to array for charting
    const result: CategoryTotal[] = Array.from(categoryMap).map(
      ([category, amount], index) => ({
        category,
        amount,
        color: COLORS[index % COLORS.length]
      })
    );
    
    // Sort by amount (highest first)
    return result.sort((a, b) => b.amount - a.amount);
  }, [transactions]);
  
  // Calculate total expenses
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.amount / totalExpenses) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-2 border shadow-md rounded-md">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm">${data.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-500">{percentage}% of expenses</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      {expenseData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="amount"
              nameKey="category"
              labelLine={false}
              paddingAngle={2}
            >
              {expenseData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value, entry: any) => {
                return <span className="text-xs">{value}</span>;
              }}
              wrapperStyle={{ fontSize: '12px', padding: '0 8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No expense data available
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
