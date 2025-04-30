
import React from 'react';
import NavBar from '@/components/NavBar';
import { FinanceProvider } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <FinanceProvider>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Navigation */}
        <NavBar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 lg:ml-64">
          <div className="space-y-6 max-w-3xl">
            <h2 className="text-3xl font-bold">Settings</h2>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Input id="currency" placeholder="USD" />
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <Switch id="darkMode" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <Switch id="notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="analytics">Share Analytics</Label>
                      <Switch id="analytics" />
                    </div>
                    <Button className="mt-4">Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNotifs">Email Notifications</Label>
                      <Switch id="emailNotifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pushNotifs">Push Notifications</Label>
                      <Switch id="pushNotifs" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="budgetAlerts">Budget Alerts</Label>
                      <Switch id="budgetAlerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="goalReminders">Goal Reminders</Label>
                      <Switch id="goalReminders" defaultChecked />
                    </div>
                    <Button className="mt-4">Update Notifications</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Settings;
