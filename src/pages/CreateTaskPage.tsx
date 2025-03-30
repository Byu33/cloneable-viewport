
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, AlertTriangle, Tag, Users, FileText, ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface Member {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [category, setCategory] = useState("");
  const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for members
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Emily Johnson", image: "https://randomuser.me/api/portraits/women/1.jpg", selected: false },
    { id: 2, name: "Sophia Williams", image: "https://randomuser.me/api/portraits/women/2.jpg", selected: false },
    { id: 3, name: "Olivia Brown", image: "https://randomuser.me/api/portraits/women/3.jpg", selected: false },
    { id: 4, name: "Isabella Jones", image: "https://randomuser.me/api/portraits/women/4.jpg", selected: false },
    { id: 5, name: "Mia Garcia", image: "https://randomuser.me/api/portraits/women/5.jpg", selected: false },
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMemberSelection = (id: number) => {
    setMembers(members.map(member => 
      member.id === id 
        ? { ...member, selected: !member.selected } 
        : member
    ));
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
      category,
      assignees: members.filter(member => member.selected)
    };
    
    console.log("Created task:", task);
    
    toast({
      title: "Task created successfully",
    });
    
    navigate("/todo");
  };

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMembers = members.filter(member => member.selected);

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
              
              <Collapsible 
                open={isAssigneesOpen} 
                onOpenChange={setIsAssigneesOpen}
                className="border-t border-b py-3 -mx-6 px-6 my-4"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                  <div className="flex items-center text-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Add Assignees to the Task</span>
                  </div>
                  {isAssigneesOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      placeholder="Search members..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  {selectedMembers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Selected ({selectedMembers.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMembers.map(member => (
                          <div 
                            key={member.id}
                            className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                          >
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={member.image} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{member.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredMembers.map(member => (
                      <div 
                        key={member.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                        onClick={() => toggleMemberSelection(member.id)}
                      >
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={member.image} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                        <Checkbox checked={member.selected} />
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="border-t border-b py-3 -mx-6 px-6 my-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    <Label htmlFor="required">Required Task</Label>
                  </div>
                  <Switch 
                    id="required" 
                    checked={isRequired} 
                    onCheckedChange={setIsRequired} 
                  />
                </div>
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
