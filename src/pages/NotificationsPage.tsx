
import React from "react";
import { ArrowLeft, X, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  user: {
    name: string;
    image: string;
  };
  date: string;
  message: string;
  tag?: string;
  tagColor?: string;
  context?: string;
}

const NotificationsPage = () => {
  const navigate = useNavigate();

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      user: {
        name: "Lily L",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      date: "Feb 2",
      message: "Baking Cake event has been changed to 1:30!",
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    },
    {
      id: 2,
      user: {
        name: "Aparna B",
        image: "https://randomuser.me/api/portraits/women/43.jpg"
      },
      date: "Feb 2",
      message: "@You when are we planning on setting up?",
      context: "in Committee Chat"
    },
    {
      id: 3,
      user: {
        name: "Melina A",
        image: "https://randomuser.me/api/portraits/women/42.jpg"
      },
      date: "Feb 3",
      message: "Please sign up for the baking event if you're interested!",
      tag: "Sisterhood",
      tagColor: "bg-purple-200 text-purple-700"
    },
    {
      id: 4,
      user: {
        name: "Celine B",
        image: "https://randomuser.me/api/portraits/women/41.jpg"
      },
      date: "Feb 3",
      message: "Make sure to get dues in by the end of the week",
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    },
    {
      id: 5,
      user: {
        name: "Automatic",
        image: "https://randomuser.me/api/portraits/women/40.jpg"
      },
      date: "Feb 3",
      message: 'Your event "Bake Sale" is coming up in 1 hour',
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateNotification = () => {
    // Navigate to create notification page or open modal
    console.log("Create notification");
  };

  const handleDismissNotification = (id: number) => {
    console.log(`Dismiss notification ${id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-3">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Notifications</h1>
            <div className="ml-2 h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              {notifications.length}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-2 flex-1 overflow-auto">
        <Button 
          variant="ghost"
          className="flex items-center text-purple-700 mb-4 pl-0"
          onClick={handleCreateNotification}
        >
          <Plus className="h-5 w-5 mr-1" />
          Create Notification
        </Button>

        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className="bg-white rounded-lg p-4 shadow-sm relative"
          >
            <div className="flex justify-between">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={notification.user.image} />
                  <AvatarFallback>
                    {notification.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold">{notification.user.name}</span>
                    {notification.context && (
                      <span className="ml-2 text-purple-700 text-sm">
                        in {notification.context}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                  <p className="mt-1">{notification.message}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {notification.tag && (
                  <span className={`${notification.tagColor} text-xs px-3 py-1 rounded-full font-medium mb-2`}>
                    {notification.tag}
                  </span>
                )}
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => handleDismissNotification(notification.id)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
