
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Transaction, Goal, FinanceContextType } from '../types/finance';

// Sample data for initial state
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Monthly Salary',
    category: 'Salary',
    date: '2025-04-01',
    type: 'income'
  },
  {
    id: '2',
    amount: 800,
    description: 'Rent Payment',
    category: 'Housing',
    date: '2025-04-03',
    type: 'expense'
  },
  {
    id: '3',
    amount: 120,
    description: 'Grocery Shopping',
    category: 'Food',
    date: '2025-04-05',
    type: 'expense'
  },
  {
    id: '4',
    amount: 200,
    description: 'Freelance Project',
    category: 'Side Income',
    date: '2025-04-10',
    type: 'income'
  },
  {
    id: '5',
    amount: 50,
    description: 'Electric Bill',
    category: 'Utilities',
    date: '2025-04-15',
    type: 'expense'
  }
];

const sampleGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: '2025-12-31'
  },
  {
    id: '2',
    name: 'Vacation',
    targetAmount: 1500,
    currentAmount: 500,
    deadline: '2025-08-15'
  }
];

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [balance, setBalance] = useState<number>(0);

  // Calculate balance whenever transactions change
  useEffect(() => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'income'
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
    setBalance(newBalance);
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9)
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Add a new goal
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Math.random().toString(36).substring(2, 9)
    };
    setGoals([...goals, newGoal]);
  };

  // Update goal progress
  const updateGoalProgress = (id: string, amount: number) => {
    setGoals(
      goals.map(goal =>
        goal.id === id
          ? { ...goal, currentAmount: goal.currentAmount + amount }
          : goal
      )
    );
  };

  // Delete a goal
  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const value = {
    transactions,
    goals,
    balance,
    addTransaction,
    deleteTransaction,
    addGoal,
    updateGoalProgress,
    deleteGoal
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
