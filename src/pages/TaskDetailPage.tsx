
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, AlertTriangle, Tag, Users, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock task data - in a real app, fetch from API or state
  const task = {
    id: Number(id),
    title: "Contact Venue",
    dueDate: "Tomorrow",
    startDate: "Today",
    assignedBy: "Me",
    priority: "Officer Task",
    priorityColor: "bg-purple-200 text-purple-700",
    category: "Risk",
    categoryColor: "bg-purple-200 text-purple-700",
    required: true,
    description: "Contact the venue to confirm the details for the upcoming event. Make sure to ask about capacity, AV equipment, and catering options.",
    completed: false,
    assignees: [
      { id: 1, name: "Sophia Chen", image: "https://randomuser.me/api/portraits/women/44.jpg" },
      { id: 2, name: "Emma Smith", image: "https://randomuser.me/api/portraits/women/45.jpg" },
      { id: 3, name: "Julia Davis", image: "https://randomuser.me/api/portraits/women/46.jpg" },
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleMarkComplete = () => {
    // Mark task as complete
    toast({
      title: "Task marked as done.",
      action: (
        <Button variant="outline" size="sm" onClick={() => console.log("Undo")}>
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

      <div className="px-6 py-4 flex-1 overflow-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
          
          {task.assignedBy && (
            <p className="text-gray-600 text-sm mb-4">Assigned by {task.assignedBy}</p>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-700 mr-3" />
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-gray-600">{task.startDate}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-purple-700 mr-3" />
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm text-gray-600">{task.dueDate}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-purple-700 mr-3" />
              <div>
                <p className="text-sm font-medium">Priority</p>
                <span className={`${task.priorityColor} text-xs px-3 py-1 rounded-full font-medium inline-block mt-1`}>
                  {task.priority}
                </span>
              </div>
            </div>
            
            {task.category && (
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-purple-700 mr-3" />
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <span className={`${task.categoryColor} text-xs px-3 py-1 rounded-full font-medium inline-block mt-1`}>
                    {task.category}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-700 mr-3" />
              <div>
                <p className="text-sm font-medium">Assigned Members</p>
                <div className="flex mt-1">
                  {task.assignees.map(assignee => (
                    <Avatar key={assignee.id} className="h-8 w-8 border-2 border-white -ml-1 first:ml-0">
                      <AvatarImage src={assignee.image} alt={assignee.name} />
                      <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
            
            {task.required && (
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-purple-700 mr-3" />
                <div>
                  <p className="text-sm font-medium">Required</p>
                  <p className="text-sm text-gray-600">Yes</p>
                </div>
              </div>
            )}
            
            {task.description && (
              <div className="flex items-start">
                <FileText className="h-5 w-5 text-purple-700 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {!task.completed && (
          <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
            <span className="font-medium">Mark as done</span>
            <Checkbox 
              className="h-5 w-5"
              onClick={handleMarkComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;
