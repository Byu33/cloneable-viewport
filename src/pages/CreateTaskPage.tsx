
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, AlertTriangle, Tag, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [category, setCategory] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }
    
    if (!dueDate) {
      toast({
        title: "Due date required",
        description: "Please enter a due date",
        variant: "destructive"
      });
      return;
    }
    
    // Create task
    const task = {
      title,
      startDate,
      dueDate,
      priority,
      description,
      isRequired,
      category
    };
    
    console.log("Created task:", task);
    
    toast({
      title: "Task created",
      description: "Your task has been created successfully"
    });
    
    navigate("/todo");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Create Task</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto pb-20">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </div>
              
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sisterhood">Sisterhood</SelectItem>
                    <SelectItem value="risk">Risk</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="required">Required Task</Label>
                <Switch 
                  id="required" 
                  checked={isRequired} 
                  onCheckedChange={setIsRequired} 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-purple-900 hover:bg-purple-800"
          >
            Create Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
