
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const TaskFilterPage = () => {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplyFilters = () => {
    // In a real app, you would pass these filters to the tasks page
    const filters = {
      priority,
      category,
      dueDate,
      assignee
    };
    
    console.log("Applied filters:", filters);
    
    toast({
      title: "Filters applied",
      description: "Your to-do list has been filtered"
    });
    
    navigate("/todo");
  };

  const handleClearFilters = () => {
    setPriority("");
    setCategory("");
    setDueDate("");
    setAssignee("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Filter Tasks</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-4">Priority</h2>
          <RadioGroup value={priority} onValueChange={setPriority}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-4">Category</h2>
          <RadioGroup value={category} onValueChange={setCategory}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="sisterhood" id="sisterhood" />
              <Label htmlFor="sisterhood">Sisterhood</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="risk" id="risk" />
              <Label htmlFor="risk">Risk</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="professional" id="professional" />
              <Label htmlFor="professional">Professional</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="academic" id="academic" />
              <Label htmlFor="academic">Academic</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-4">Due Date</h2>
          <RadioGroup value={dueDate} onValueChange={setDueDate}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="tomorrow" id="tomorrow" />
              <Label htmlFor="tomorrow">Tomorrow</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="thisWeek" id="thisWeek" />
              <Label htmlFor="thisWeek">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="thisMonth" id="thisMonth" />
              <Label htmlFor="thisMonth">This Month</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-lg font-medium mb-4">Assignee</h2>
          <RadioGroup value={assignee} onValueChange={setAssignee}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="me" id="me" />
              <Label htmlFor="me">Assigned to Me</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="others" id="others" />
              <Label htmlFor="others">Assigned to Others</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex gap-3 mb-4">
          <Button 
            className="flex-1 bg-purple-900 hover:bg-purple-800"
            onClick={handleApplyFilters}
          >
            <Check className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilterPage;
