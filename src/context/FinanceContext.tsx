
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Transaction, Goal, FinanceContextType } from '../types/finance';

// Storage keys for localStorage
const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_transactions',
  GOALS: 'finance_goals',
};

// Sample data for initial state - only used if no data exists in localStorage
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

// Helper function to load data from localStorage
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return defaultValue;
  }
};

// Helper function to save data to localStorage
const saveToStorage = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial data from localStorage or use sample data if not available
  const [transactions, setTransactions] = useState<Transaction[]>(() => 
    loadFromStorage(STORAGE_KEYS.TRANSACTIONS, sampleTransactions)
  );
  
  const [goals, setGoals] = useState<Goal[]>(() => 
    loadFromStorage(STORAGE_KEYS.GOALS, sampleGoals)
  );
  
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

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GOALS, goals);
  }, [goals]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9)
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  // Add a new goal (now with optional ID for edit functionality)
  const addGoal = (goal: Omit<Goal, 'id'> & { id?: string }) => {
    const goalWithId = goal.id 
      ? goal as Goal  // If ID is provided, use it (for edit functionality)
      : {
          ...goal,
          id: Math.random().toString(36).substring(2, 9) // Generate new ID for new goals
        };
        
    const updatedGoals = goal.id 
      ? [...goals.filter(g => g.id !== goal.id), goalWithId] // Replace existing goal if ID exists
      : [...goals, goalWithId]; // Add new goal if no ID
      
    setGoals(updatedGoals);
  };

  // Update goal progress
  const updateGoalProgress = (id: string, amount: number) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    );
    setGoals(updatedGoals);
  };

  // Delete a goal
  const deleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
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
