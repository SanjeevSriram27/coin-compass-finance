
import React from 'react';
import NavBar from '@/components/NavBar';
import GoalTracker from '@/components/GoalTracker';
import { FinanceProvider } from '@/context/FinanceContext';

const Goals = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Financial Goals</h2>
            <div className="max-w-3xl">
              <GoalTracker standalone={true} />
            </div>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Goals;
