
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Bell, User, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Daily Standup Call",
      time: "5:00-6:00PM",
      location: "Everitt Labratory",
      tag: "Sisterhood",
      attendees: 7,
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Turn in Dues",
      dueDate: "Tomorrow",
      priority: "High Importance",
      priorityColor: "bg-purple-700 text-white",
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
    }
  ];

  const requirements = {
    completed: 1,
    total: 7,
    upcoming: [
      { id: 1, title: "1 Sisterhood Event", category: "Sisterhood" },
      { id: 2, title: "1 Professional Event", category: "Professional" }
    ]
  };

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const handleSeeAllEvents = () => {
    navigate("/");
  };

  const handleSeeAllTasks = () => {
    navigate("/todo");
  };

  const handleRequirementClick = (id: number, category?: string) => {
    if (category) {
      navigate(`/explore?category=${category.toLowerCase()}`);
    } else {
      navigate(`/requirements`);
    }
  };

  const handlePayNow = () => {
    navigate("/dues");
  };

  const handlePaymentPlan = () => {
    navigate("/payment-plan");
  };

  const handleCheckIn = (eventId: number) => {
    // Check-in logic
    console.log(`Checking in to event ${eventId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold">Home</h1>
        <div className="flex gap-4">
          <button className="p-1 bg-white rounded-full">
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleNotifications}>
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full">
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-20">
        {/* Upcoming Events */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <button 
              className="text-purple-700 font-medium text-sm"
              onClick={handleSeeAllEvents}
            >
              See All
            </button>
          </div>

          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm mb-2">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.time}</p>
                  <p className="text-gray-600 text-sm">{event.location}</p>
                </div>
                <span className="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  {event.tag}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <Button 
                  className="bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-1"
                  onClick={() => handleCheckIn(event.id)}
                >
                  Check In
                </Button>

                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600 mb-1">{event.attendees} people are attending</p>
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(5, event.attendees))].map((_, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-white">
                        <AvatarImage src={`https://randomuser.me/api/portraits/thumb/men/${i + 1}.jpg`} />
                        <AvatarFallback>{String.fromCharCode(65 + i)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming To Do */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Upcoming To Do</h2>
            <button 
              className="text-purple-700 font-medium text-sm"
              onClick={handleSeeAllTasks}
            >
              See All
            </button>
          </div>

          {upcomingTasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg p-4 shadow-sm mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.dueDate}</p>
                  {task.assignedBy && (
                    <p className="text-gray-600 text-sm">Assigned by {task.assignedBy}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`${task.priorityColor} text-xs px-3 py-1 rounded-full font-medium`}>
                    {task.priority}
                  </span>
                  {task.category && (
                    <span className={`${task.categoryColor} text-xs px-3 py-1 rounded-full font-medium`}>
                      {task.category}
                    </span>
                  )}
                </div>
              </div>
              {task.id === 2 && (
                <div className="mt-2 flex justify-end">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          
          <div className="relative flex justify-center items-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center">
              <div className="w-24 h-24 rounded-full bg-white flex flex-col justify-center items-center">
                <span className="text-xl font-bold">{requirements.completed}/{requirements.total}</span>
                <span className="text-sm text-gray-500">Completed</span>
              </div>
            </div>
            {/* Purple overlay for completed portion (1/7) */}
            <div 
              className="absolute top-0 left-0 w-32 h-32 rounded-full" 
              style={{ 
                background: `conic-gradient(#6d28d9 0% ${(requirements.completed / requirements.total) * 100}%, transparent ${(requirements.completed / requirements.total) * 100}% 100%)` 
              }}
            ></div>
          </div>

          <h3 className="font-medium mb-2">To Be Completed</h3>
          
          {requirements.upcoming.map((req, index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              onClick={() => handleRequirementClick(req.id, req.category)}
            >
              <span>{req.title}</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>

        {/* Dues */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">This Semester's Dues</h2>
          
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <p className="text-5xl font-bold mb-1">$300</p>
            <p className="text-gray-600 mb-4">Due by January 6</p>
            
            <Button 
              className="w-full bg-purple-900 hover:bg-purple-800 mb-2"
              onClick={handlePayNow}
            >
              Pay Now
            </Button>
            
            <button 
              className="text-purple-700 font-medium"
              onClick={handlePaymentPlan}
            >
              Payment Plan
            </button>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default HomePage;
