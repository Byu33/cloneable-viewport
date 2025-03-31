
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, PlusCircle, CheckCircle, ChevronDown, ChevronUp, Calendar, User, Bell } from "lucide-react";
import TabBar from "@/components/TabBar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority?: string;
  priorityColor?: string;
  category?: string;
  categoryColor?: string;
  assignedBy?: string;
  assignees?: { name: string; image: string }[];
  completed: boolean;
  status: "todo" | "completed";
}

const ToDoPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Assigned Tasks");
  const [isToDoExpanded, setIsToDoExpanded] = useState(true);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Turn in Dues",
      dueDate: "Tomorrow",
      priority: "High Importance",
      priorityColor: "bg-purple-700 text-white",
      completed: false,
      status: "todo"
    },
    {
      id: 2,
      title: "Contact Venue",
      dueDate: "Tomorrow",
      assignedBy: "Me",
      priority: "Officer Task",
      priorityColor: "bg-purple-200 text-purple-700",
      category: "Risk",
      categoryColor: "bg-purple-200 text-purple-700",
      completed: false,
      status: "todo"
    },
    {
      id: 3,
      title: "Complete Important Form",
      dueDate: "Tomorrow",
      priority: "High Importance",
      priorityColor: "bg-purple-700 text-white",
      completed: false,
      status: "todo"
    },
    {
      id: 4,
      title: "Fill out Minutes",
      dueDate: "Tomorrow",
      priority: "Officer Task",
      priorityColor: "bg-purple-200 text-purple-700",
      completed: false,
      status: "todo"
    },
    {
      id: 5,
      title: "Chat with Candidates",
      dueDate: "Tomorrow",
      assignedBy: "Fatima",
      category: "Sisterhood",
      categoryColor: "bg-purple-200 text-purple-700",
      completed: false,
      status: "todo"
    },
    {
      id: 6,
      title: "Submit Risk Report",
      dueDate: "Yesterday",
      priority: "Officer Task",
      priorityColor: "bg-purple-200 text-purple-700",
      completed: true,
      status: "completed"
    },
    {
      id: 7,
      title: "Complete Bylaw Review",
      dueDate: "Last Week",
      category: "Historian",
      categoryColor: "bg-purple-200 text-purple-700",
      completed: true,
      status: "completed"
    }
  ]);

  const todoTasks = tasks
    .filter(task => task.status === "todo")
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedBy && task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.priority && task.priority.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
  const completedTasks = tasks
    .filter(task => task.status === "completed")
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedBy && task.assignedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.priority && task.priority.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  const handleTaskClick = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  const toggleTaskComplete = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            status: task.completed ? "todo" as const : "completed" as const
          } 
        : task
    );
    
    setTasks(updatedTasks);
    
    const task = tasks.find(t => t.id === taskId);
    
    if (task && !task.completed) {
      // Task is being marked as completed
      toast({
        title: "Task marked as done",
        description: "The task has been moved to Completed.",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setTasks(prevTasks => prevTasks.map(t => 
                t.id === taskId 
                  ? { ...t, completed: false, status: "todo" as const } 
                  : t
              ));
              toast({
                title: "Task restored",
                description: "The task has been moved back to To Do."
              });
            }}
          >
            Undo
          </Button>
        ),
      });
    }
  };

  const handleFilter = () => {
    // Filter functionality would be implemented here
    console.log("Opening filter options");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleCalendarClick = () => {
    navigate("/calendar");
  };
  
  const handleNotificationsClick = () => {
    navigate("/notifications");
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="px-6 py-6 bg-white flex justify-between items-center">
        <h1 className="text-2xl font-semibold">To Do</h1>
        <div className="flex gap-4">
          <button 
            className="p-1 bg-white rounded-full"
            onClick={handleNotificationsClick}
          >
            <Bell className="w-6 h-6" />
          </button>
          <button 
            className="p-1 bg-white rounded-full"
            onClick={handleCalendarClick}
          >
            <Calendar className="w-6 h-6" />
          </button>
          <button 
            className="p-1 bg-white rounded-full"
            onClick={handleProfileClick}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex border-b bg-white">
        {["Assigned Tasks", "Created Tasks"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center ${
              activeTab === tab
                ? "text-purple-900 font-medium border-b-2 border-purple-900"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="px-6 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {activeTab === "Assigned Tasks" ? (
        <div className="px-6 py-4 flex-1 overflow-auto pb-24">
          <Collapsible 
            open={isToDoExpanded} 
            onOpenChange={setIsToDoExpanded}
            className="mb-4"
          >
            <CollapsibleTrigger className="flex w-full justify-between items-center py-2 mb-2 text-left">
              <div className="flex items-center">
                <h2 className="text-xl font-medium">To Do</h2>
                <div className="ml-2 h-6 w-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm">
                  {todoTasks.length}
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="p-2 bg-gray-100 rounded-full mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilter();
                  }}
                >
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
                {isToDoExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="space-y-3">
                {todoTasks.map(task => (
                  <div 
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-sm"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-gray-600 text-sm">{task.dueDate}</p>
                        {task.assignedBy && (
                          <p className="text-gray-600 text-sm">Assigned by {task.assignedBy}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {task.priority && (
                          <span className={`${task.priorityColor} text-xs px-3 py-1 rounded-full font-medium`}>
                            {task.priority}
                          </span>
                        )}
                        {task.category && (
                          <span className={`${task.categoryColor} text-xs px-3 py-1 rounded-full font-medium`}>
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {task.id === 2 && (
                      <div className="flex flex-col mt-2">
                        <p className="text-sm text-gray-600 mb-1">29/50 people have completed this task</p>
                        <div className="flex -space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-white">
                              <AvatarImage src={`https://randomuser.me/api/portraits/thumb/men/${i + 1}.jpg`} />
                              <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {task.id !== 2 && (
                      <div className="flex justify-end mt-2">
                        <div 
                          className="h-5 w-5 border border-purple-300 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskComplete(task.id);
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
                
                {todoTasks.length === 0 && searchTerm && (
                  <div className="text-center py-6 text-gray-500">
                    No tasks found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible 
            open={isCompletedExpanded} 
            onOpenChange={setIsCompletedExpanded}
          >
            <CollapsibleTrigger className="flex w-full justify-between items-center py-2 mb-2 text-left">
              <div className="flex items-center">
                <h2 className="text-xl font-medium">Completed</h2>
                <div className="ml-2 h-6 w-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm">
                  {completedTasks.length}
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="p-2 bg-gray-100 rounded-full mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilter();
                  }}
                >
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
                {isCompletedExpanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <div 
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-sm opacity-70"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold line-through">{task.title}</h3>
                        <p className="text-gray-600 text-sm">{task.dueDate}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {task.priority && (
                          <span className={`${task.priorityColor} text-xs px-3 py-1 rounded-full font-medium`}>
                            {task.priority}
                          </span>
                        )}
                        {task.category && (
                          <span className={`${task.categoryColor} text-xs px-3 py-1 rounded-full font-medium`}>
                            {task.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                      <div 
                        className="h-5 w-5 bg-purple-100 rounded flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskComplete(task.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {completedTasks.length === 0 && searchTerm && (
                  <div className="text-center py-6 text-gray-500">
                    No completed tasks found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : (
        <div className="px-6 py-4 flex-1 overflow-auto pb-24">
          <div className="flex justify-between items-center mb-4">
            <Button 
              className="bg-purple-900 hover:bg-purple-800 flex items-center gap-2"
              onClick={handleCreateTask}
            >
              <PlusCircle className="h-4 w-4" />
              Create New Task
            </Button>
            
            <button 
              className="p-2 bg-gray-100 rounded-full"
              onClick={handleFilter}
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>No tasks created yet</p>
          </div>
        </div>
      )}

      <TabBar />
    </div>
  );
};

export default ToDoPage;
