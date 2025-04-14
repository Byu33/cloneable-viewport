
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Tag, Users, CheckSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  description?: string;
  required?: boolean;
  status: "todo" | "completed";
}

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  // This would typically come from a context or API call
  // For demonstration, we're using a mock task
  const task: Task = {
    id: Number(id),
    title: "Turn in Dues",
    dueDate: "Tomorrow",
    priority: "High Importance",
    priorityColor: "bg-purple-700 text-white",
    category: "Finance",
    categoryColor: "bg-purple-200 text-purple-700",
    assignedBy: "Chapter President",
    description: "Please submit your dues for the semester by the deadline. Late submissions will incur a fee.",
    completed: false,
    required: true,
    status: "todo",
    assignees: [
      { name: "Alice Johnson", image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Bob Smith", image: "https://randomuser.me/api/portraits/men/32.jpg" },
      { name: "Carol White", image: "https://randomuser.me/api/portraits/women/17.jpg" }
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleTaskComplete = () => {
    // In a real app, you would update the task state to the backend
    // For now, we'll just show a toast notification and navigate back
    toast({
      title: "Task marked as done",
      description: "The task has been moved to Completed.",
      action: (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
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
        <h1 className="text-2xl font-semibold">Task Details</h1>
      </header>

      <div className="flex-1 overflow-auto p-6 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
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
            {task.required && (
              <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                Required
              </span>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-gray-700">Due: {task.dueDate}</p>
            </div>
            
            {task.assignedBy && (
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-500 mr-2" />
                <p className="text-gray-700">Assigned by: {task.assignedBy}</p>
              </div>
            )}
          </div>

          {task.description && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{task.description}</p>
            </div>
          )}

          {task.assignees && task.assignees.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Assigned To</h3>
              <div className="space-y-2">
                {task.assignees.map((assignee, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={assignee.image} alt={assignee.name} />
                      <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{assignee.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!task.completed && (
            <div className="mt-6">
              <Button 
                className="w-full bg-purple-900 hover:bg-purple-800"
                onClick={handleTaskComplete}
              >
                Mark as Complete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
