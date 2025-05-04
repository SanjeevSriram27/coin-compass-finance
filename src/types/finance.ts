
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface FinanceContextType {
  transactions: Transaction[];
  goals: Goal[];
  balance: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'> & { id?: string }) => void;
  updateGoalProgress: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
}

export interface CategoryTotal {
  category: string;
  amount: number;
  color: string;
}
