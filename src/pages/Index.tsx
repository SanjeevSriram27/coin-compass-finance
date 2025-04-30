
import React from 'react';
import NavBar from '@/components/NavBar';
import Dashboard from '@/components/Dashboard';
import { FinanceProvider } from '@/context/FinanceContext';

const Index = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64">
          <Dashboard />
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
