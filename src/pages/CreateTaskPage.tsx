
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import MemberSearchModal from "@/components/MemberSearchModal";

interface Member {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role?: string;
  selected?: boolean;
}

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [assignees, setAssignees] = useState<Member[]>([]);
  const [isMemberSearchOpen, setIsMemberSearchOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateTask = () => {
    if (!taskName) {
      toast({
        title: "Task name required",
        description: "Please enter a name for the task",
        variant: "destructive"
      });
      return;
    }

    // Logic to create task would go here
    console.log({
      taskName,
      taskDescription,
      dueDate,
      isRequired,
      assignees
    });

    toast({
      title: "Task created successfully",
      description: "The task has been added to your tasks",
    });

    navigate("/todo");
  };

  const handleAssigneeSelection = (selectedMembers: Member[]) => {
    setAssignees(selectedMembers);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Create Task</h1>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-24">
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <label className="block mb-1 text-lg font-medium">Task Name</label>
          <input
            type="text"
            placeholder="Enter task name"
            className="w-full p-3 rounded-md border border-gray-300 mb-4"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <label className="block mb-1 text-lg font-medium">Description</label>
          <textarea
            placeholder="Enter task description"
            className="w-full p-3 rounded-md border border-gray-300 mb-4 h-24"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <label className="block mb-1 text-lg font-medium">Due Date</label>
          <div className="relative mb-4">
            <div className="absolute right-3 top-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="w-full p-3 rounded-md border border-gray-300"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2 text-purple-700 border-purple-300 hover:bg-purple-50"
              onClick={() => setIsMemberSearchOpen(true)}
            >
              <Users className="h-5 w-5" />
              Add Assignees to the Task
            </Button>

            {assignees.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Assigned to:</p>
                <div className="flex flex-wrap gap-2">
                  {assignees.map(assignee => (
                    <div 
                      key={assignee.id} 
                      className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={assignee.avatar} alt={assignee.name} />
                        <AvatarFallback>{assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{assignee.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="required-task" className="text-base font-medium">Required Task</Label>
                <span className="text-xs text-gray-500">(for all users)</span>
              </div>
              <Switch
                id="required-task"
                checked={isRequired}
                onCheckedChange={setIsRequired}
              />
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-purple-700 hover:bg-purple-800 py-6 text-base"
          onClick={handleCreateTask}
        >
          Create Task
        </Button>
      </div>

      <MemberSearchModal 
        open={isMemberSearchOpen}
        onOpenChange={setIsMemberSearchOpen}
        onMembersSelected={handleAssigneeSelection}
        selectedMembers={assignees}
      />
    </div>
  );
};

export default CreateTaskPage;
