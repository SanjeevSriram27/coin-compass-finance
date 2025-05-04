
import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface GoalTrackerProps {
  standalone?: boolean;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ standalone = false }) => {
  const { goals, addGoal, updateGoalProgress, deleteGoal, balance } = useFinance();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [addFundAmount, setAddFundAmount] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      return; // Basic validation
    }
    
    addGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount || '0'),
      deadline: formData.deadline
    });
    
    // Reset form
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: ''
    });
    
    setOpen(false);
    toast({
      title: "Goal Created",
      description: `${formData.name} goal has been created successfully.`,
    });
  };

  const handleEditClick = (goal: any) => {
    setSelectedGoalId(goal.id);
    setFormData({
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline
    });
    setEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.deadline || !selectedGoalId) {
      return; // Basic validation
    }
    
    // Delete old goal and add updated one with same ID
    const updatedGoal = {
      id: selectedGoalId,
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      deadline: formData.deadline
    };
    
    deleteGoal(selectedGoalId);
    addGoal(updatedGoal);
    
    // Reset form and state
    setFormData({
      name: '',
      targetAmount: '',
      currentAmount: '',
      deadline: ''
    });
    setSelectedGoalId(null);
    setEditOpen(false);
    
    toast({
      title: "Goal Updated",
      description: `${formData.name} goal has been updated successfully.`,
    });
  };

  const handleAddFunds = (goalId: string) => {
    const amount = parseFloat(addFundAmount[goalId] || '0');
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if there's enough balance for this contribution
    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough funds. Current balance: $${balance.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }
    
    updateGoalProgress(goalId, amount);
    setAddFundAmount(prev => ({ ...prev, [goalId]: '' }));
    
    const goalName = goals.find(g => g.id === goalId)?.name || 'Goal';
    toast({
      title: "Funds Added",
      description: `$${amount} has been added to your ${goalName} and deducted from your balance.`,
    });
  };

  const handleAddFundChange = (goalId: string, value: string) => {
    setAddFundAmount(prev => ({ ...prev, [goalId]: value }));
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center">
          <Target className="mr-2 h-5 w-5 text-finance-secondary" />
          Financial Goals
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Vacation Fund"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount ($)</Label>
                <Input
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  placeholder="1000"
                  min="1"
                  step="1"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentAmount">Current Amount ($)</Label>
                <Input
                  id="currentAmount"
                  name="currentAmount"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="1"
                  value={formData.currentAmount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        
        {/* Edit Goal Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Goal Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  placeholder="Vacation Fund"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-targetAmount">Target Amount ($)</Label>
                <Input
                  id="edit-targetAmount"
                  name="targetAmount"
                  type="number"
                  placeholder="1000"
                  min="1"
                  step="1"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-currentAmount">Current Amount ($)</Label>
                <Input
                  id="edit-currentAmount"
                  name="currentAmount"
                  type="number"
                  placeholder="0"
                  min="0"
                  step="1"
                  value={formData.currentAmount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-deadline">Target Date</Label>
                <Input
                  id="edit-deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display current account balance if in standalone mode */}
        {standalone && (
          <div className="mb-6 p-3 bg-gray-50 rounded-md border">
            <h3 className="text-sm font-semibold text-gray-500">Available Balance</h3>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            <p className="text-xs text-gray-500">Add funds to goals from your main balance</p>
          </div>
        )}
        
        {goals.length > 0 ? (
          goals.map(goal => {
            const progressPercent = Math.min(
              Math.round((goal.currentAmount / goal.targetAmount) * 100),
              100
            );
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.name}</h4>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">
                      {daysRemaining} days left
                    </span>
                    {standalone && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditClick(goal)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>${goal.currentAmount} of ${goal.targetAmount}</span>
                  <span className="font-medium">{progressPercent}%</span>
                </div>
                
                <Progress 
                  value={progressPercent} 
                  className="h-2"
                  indicatorClassName={
                    progressPercent < 30
                      ? "bg-red-500"
                      : progressPercent < 70
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }
                />
                
                {standalone && (
                  <div className="flex justify-end mt-2">
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Add funds"
                        className="w-32"
                        min="1"
                        value={addFundAmount[goal.id] || ''}
                        onChange={(e) => handleAddFundChange(goal.id, e.target.value)}
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleAddFunds(goal.id)}
                        disabled={balance <= 0}
                      >
                        Add Funds
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No financial goals yet</p>
            <p className="text-sm">Create a goal to start tracking your progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTracker;
