
import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Transaction } from '../types/finance';
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TransactionListProps {
  showAll?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ showAll = false }) => {
  const { transactions, deleteTransaction } = useFinance();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const displayedTransactions = showAll 
    ? transactions 
    : transactions.slice(0, 5);

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">{showAll ? 'All Transactions' : 'Recent Transactions'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((transaction) => (
                  <TransactionRow 
                    key={transaction.id} 
                    transaction={transaction} 
                    onDelete={deleteTransaction} 
                    formatDate={formatDate} 
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No transactions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {!showAll && transactions.length > 5 && (
          <div className="flex justify-center mt-4">
            <Button variant="link" asChild>
              <Link to="/transactions">View All Transactions</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface TransactionRowProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  onDelete,
  formatDate
}) => {
  const isIncome = transaction.type === 'income';
  
  return (
    <TableRow className="group">
      <TableCell className="font-medium">
        {formatDate(transaction.date)}
      </TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell className={`text-right font-medium ${isIncome ? 'text-finance-primary' : 'text-finance-expense'}`}>
        <div className="flex items-center justify-end">
          {isIncome ? (
            <ArrowUpRight size={16} className="mr-1" />
          ) : (
            <ArrowDownRight size={16} className="mr-1" />
          )}
          ${transaction.amount.toFixed(2)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(transaction.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

// Add the missing import
import { Link } from 'react-router-dom';

export default TransactionList;
