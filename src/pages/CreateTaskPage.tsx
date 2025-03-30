
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown, ChevronUp, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const priorityOptions = [
  { value: "high", label: "High Importance", color: "bg-purple-700 text-white" },
  { value: "officer", label: "Officer Task", color: "bg-purple-200 text-purple-700" },
  { value: "medium", label: "Medium Importance", color: "bg-blue-200 text-blue-700" },
  { value: "low", label: "Low Importance", color: "bg-gray-200 text-gray-700" }
];

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [taskTitle, setTaskTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<typeof priorityOptions[0] | null>(null);
  const [isRequired, setIsRequired] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock members data
  const members = [
    { id: "1", name: "Alice Johnson", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: "2", name: "Bob Smith", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: "3", name: "Carol White", image: "https://randomuser.me/api/portraits/women/17.jpg" },
    { id: "4", name: "David Brown", image: "https://randomuser.me/api/portraits/men/76.jpg" },
    { id: "5", name: "Emma Davis", image: "https://randomuser.me/api/portraits/women/23.jpg" }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  const toggleAssignee = (id: string) => {
    if (selectedAssignees.includes(id)) {
      setSelectedAssignees(selectedAssignees.filter(assigneeId => assigneeId !== id));
    } else {
      setSelectedAssignees([...selectedAssignees, id]);
    }
  };

  const handleCreateTask = () => {
    if (!taskTitle) {
      toast({
        title: "Error",
        description: "Please provide a task title",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would save the task to your backend
    toast({
      title: "Task created successfully",
      description: "Your new task has been created."
    });

    // Navigate back to the todo page
    setTimeout(() => {
      navigate("/todo");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Create New Task</h1>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-20">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-medium block mb-2">Task Title</Label>
            <Input 
              id="title"
              placeholder="Enter task title" 
              className="w-full bg-white"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="startDate" className="text-base font-medium block mb-2">Start Date</Label>
            <div className="relative">
              <Input 
                id="startDate"
                type="date" 
                className="w-full bg-white"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate" className="text-base font-medium block mb-2">Due Date</Label>
            <div className="relative">
              <Input 
                id="dueDate"
                type="date" 
                className="w-full bg-white"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <Collapsible 
            open={isPriorityOpen} 
            onOpenChange={setIsPriorityOpen}
            className="bg-white rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex w-full justify-between items-center p-4 text-left">
              <span className="font-medium">Priority</span>
              {isPriorityOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t">
              <div className="space-y-2">
                {priorityOptions.map((option) => (
                  <div 
                    key={option.value}
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedPriority?.value === option.value ? "bg-purple-50" : "bg-gray-50"
                    }`}
                    onClick={() => setSelectedPriority(option)}
                  >
                    <span>{option.label}</span>
                    <span className={`px-3 py-1 rounded-full text-xs ${option.color}`}>
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div>
            <Label htmlFor="description" className="text-base font-medium block mb-2">Description</Label>
            <Textarea 
              id="description"
              placeholder="Add task details here..." 
              className="w-full min-h-[120px] bg-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <Collapsible 
            open={isAssigneesOpen} 
            onOpenChange={setIsAssigneesOpen}
            className="bg-white rounded-lg overflow-hidden"
          >
            <CollapsibleTrigger className="flex w-full justify-between items-center p-4 text-left">
              <div className="flex items-center">
                <span className="font-medium">+ Add Assignees to the Task</span>
              </div>
              {isAssigneesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t">
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search members..."
                  className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                {filteredMembers.map((member) => (
                  <div 
                    key={member.id}
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedAssignees.includes(member.id) ? "bg-purple-50" : "bg-gray-50"
                    }`}
                    onClick={() => toggleAssignee(member.id)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                    <div className="h-5 w-5 border border-purple-300 rounded flex items-center justify-center">
                      {selectedAssignees.includes(member.id) && (
                        <div className="h-3 w-3 bg-purple-700 rounded-sm"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <Label htmlFor="required" className="font-medium cursor-pointer">
              + Required Task
            </Label>
            <Switch 
              id="required" 
              checked={isRequired} 
              onCheckedChange={setIsRequired} 
              className="data-[state=checked]:bg-purple-700"
            />
          </div>

          <Button 
            className="w-full bg-purple-900 hover:bg-purple-800 py-6"
            onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
