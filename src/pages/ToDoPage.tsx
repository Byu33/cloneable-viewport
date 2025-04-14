
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Search, Bell, Filter, ChevronDown, ChevronUp, Plus, CheckSquare } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";

const ToDoPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assigned");
  const [isToBeCompletedOpen, setIsToBeCompletedOpen] = useState(true);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const [isCreatedToBeCompletedOpen, setIsCreatedToBeCompletedOpen] = useState(true);
  const [isCreatedCompletedOpen, setIsCreatedCompletedOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createdSearchTerm, setCreatedSearchTerm] = useState("");

  // Sample tasks
  const assignedTasks = [
    {
      id: 1,
      title: "Submit Chapter Dues for February",
      dueDate: "Feb 28",
      category: "Dues",
      categoryColor: "bg-blue-200 text-blue-700",
      isCompleted: false,
      assignee: "Hannah B",
      assigneeCount: 50,
      completedCount: 29,
      profiles: [
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
      ]
    },
    {
      id: 2,
      title: "Register for Sisterhood Event",
      dueDate: "Feb 20",
      category: "Sisterhood",
      categoryColor: "bg-purple-200 text-purple-700",
      isCompleted: false,
      assignee: "Aparna P",
      assigneeCount: 42,
      completedCount: 39,
      profiles: [
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
      ]
    },
    {
      id: 3,
      title: "Complete Fundraising Form",
      dueDate: "Feb 15",
      category: "Fundraising",
      categoryColor: "bg-green-200 text-green-700",
      isCompleted: true,
      assignee: "Esther S",
      assigneeCount: 32,
      completedCount: 32,
      profiles: [
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/women/65.jpg",
      ]
    }
  ];

  const createdTasks = [
    {
      id: 4,
      title: "Submit Chapter Report",
      dueDate: "Mar 5",
      category: "Admin",
      categoryColor: "bg-red-200 text-red-700",
      isCompleted: false,
      assigneeCount: 12,
      completedCount: 5,
      profiles: [
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
      ]
    },
    {
      id: 5,
      title: "Plan Next Fundraiser",
      dueDate: "Mar 10",
      category: "Fundraising",
      categoryColor: "bg-green-200 text-green-700",
      isCompleted: false,
      assigneeCount: 8,
      completedCount: 3,
      profiles: [
        "https://randomuser.me/api/portraits/women/65.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
      ]
    },
    {
      id: 6,
      title: "Order T-shirts",
      dueDate: "Feb 28",
      category: "Merchandise",
      categoryColor: "bg-yellow-200 text-yellow-700",
      isCompleted: true,
      assigneeCount: 4,
      completedCount: 4,
      profiles: [
        "https://randomuser.me/api/portraits/women/54.jpg",
      ]
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  const handleTaskClick = (id: number) => {
    navigate(`/task/${id}`);
  };

  const handleCalendarClick = () => {
    navigate("/calendar");
  };
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  
  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  const handleFilter = () => {
    console.log("Opening filter options");
    // Open filter modal or page
  };

  // Filter tasks based on search term
  const filteredAssignedTasks = assignedTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCreatedTasks = createdTasks.filter(task => 
    task.title.toLowerCase().includes(createdSearchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(createdSearchTerm.toLowerCase())
  );

  // Group tasks by completion status
  const toBeCompletedAssignedTasks = filteredAssignedTasks.filter(task => !task.isCompleted);
  const completedAssignedTasks = filteredAssignedTasks.filter(task => task.isCompleted);
  
  const toBeCompletedCreatedTasks = filteredCreatedTasks.filter(task => !task.isCompleted);
  const completedCreatedTasks = filteredCreatedTasks.filter(task => task.isCompleted);

  const renderTaskCard = (task: any) => (
    <div 
      key={task.id} 
      className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer" 
      onClick={() => handleTaskClick(task.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{task.title}</h3>
        <span className={`${task.categoryColor} text-xs px-2 py-1 rounded-full`}>
          {task.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Due: {task.dueDate}</p>
      
      {task.assigneeCount > 0 && (
        <>
          <p className="text-xs text-gray-500 mb-2">
            {task.completedCount}/{task.assigneeCount} people have completed this task
          </p>
          <div className="flex -space-x-2">
            {task.profiles.map((profile: string, index: number) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={profile} />
                <AvatarFallback>{index + 1}</AvatarFallback>
              </Avatar>
            ))}
            {task.assigneeCount > 3 && (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                +{task.assigneeCount - 3}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold font-big-shoulders">To Do</h1>
        <div className="flex gap-4">
          <button 
            className="p-1 bg-white rounded-full"
            onClick={handleNotificationsClick}
          >
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleCalendarClick}>
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleProfileClick}>
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      <Tabs defaultValue="assigned" value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 bg-white border-b">
          <TabsTrigger 
            value="assigned" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700 rounded-none py-3"
          >
            Assigned to You
          </TabsTrigger>
          <TabsTrigger 
            value="created" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700 rounded-none py-3"
          >
            Created by You
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assigned" className="flex-1 overflow-auto p-4 pb-24">
          {/* Search and Filter */}
          <div className="mb-4 relative flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="p-2 bg-gray-100 rounded-full"
              onClick={handleFilter}
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* To Be Completed Section */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsToBeCompletedOpen(!isToBeCompletedOpen)}
                  className="mr-2"
                >
                  {isToBeCompletedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                <h2 className="font-semibold">To Be Completed</h2>
                <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                  {toBeCompletedAssignedTasks.length}
                </span>
              </div>
              <button 
                className="p-2 rounded-full"
                onClick={handleFilter}
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {isToBeCompletedOpen && (
              <div className="p-4">
                {toBeCompletedAssignedTasks.length > 0 ? (
                  toBeCompletedAssignedTasks.map(renderTaskCard)
                ) : (
                  <p className="text-center text-gray-500 py-4">No tasks to complete</p>
                )}
              </div>
            )}
          </div>
          
          {/* Completed Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center px-4 py-3 border-b">
              <button 
                onClick={() => setIsCompletedOpen(!isCompletedOpen)}
                className="mr-2"
              >
                {isCompletedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <h2 className="font-semibold">Completed</h2>
              <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                {completedAssignedTasks.length}
              </span>
            </div>
            
            {isCompletedOpen && (
              <div className="p-4">
                {completedAssignedTasks.length > 0 ? (
                  completedAssignedTasks.map(renderTaskCard)
                ) : (
                  <p className="text-center text-gray-500 py-4">No completed tasks</p>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="created" className="flex-1 overflow-auto p-4 pb-24">
          {/* Search and Create */}
          <div className="flex justify-between items-center mb-4 gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
                value={createdSearchTerm}
                onChange={(e) => setCreatedSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="p-2 bg-gray-100 rounded-full"
              onClick={handleFilter}
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
            <Button 
              className="bg-purple-700 text-white whitespace-nowrap"
              onClick={handleCreateTask}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Task
            </Button>
          </div>
          
          {/* To Be Completed Section */}
          <div className="bg-white rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <div className="flex items-center">
                <button 
                  onClick={() => setIsCreatedToBeCompletedOpen(!isCreatedToBeCompletedOpen)}
                  className="mr-2"
                >
                  {isCreatedToBeCompletedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                <h2 className="font-semibold">To Be Completed</h2>
                <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                  {toBeCompletedCreatedTasks.length}
                </span>
              </div>
              <button 
                className="p-2 rounded-full"
                onClick={handleFilter}
              >
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {isCreatedToBeCompletedOpen && (
              <div className="p-4">
                {toBeCompletedCreatedTasks.length > 0 ? (
                  toBeCompletedCreatedTasks.map(renderTaskCard)
                ) : (
                  <p className="text-center text-gray-500 py-4">No tasks to complete</p>
                )}
              </div>
            )}
          </div>
          
          {/* Completed Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center px-4 py-3 border-b">
              <button 
                onClick={() => setIsCreatedCompletedOpen(!isCreatedCompletedOpen)}
                className="mr-2"
              >
                {isCreatedCompletedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <h2 className="font-semibold">Completed</h2>
              <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                {completedCreatedTasks.length}
              </span>
            </div>
            
            {isCreatedCompletedOpen && (
              <div className="p-4">
                {completedCreatedTasks.length > 0 ? (
                  completedCreatedTasks.map(renderTaskCard)
                ) : (
                  <p className="text-center text-gray-500 py-4">No completed tasks</p>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <TabBar />
    </div>
  );
};

export default ToDoPage;
