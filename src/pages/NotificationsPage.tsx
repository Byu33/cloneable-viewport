
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  sender: {
    name: string;
    avatar?: string;
    initials: string;
  };
  date: string;
  content: string;
  tag?: string;
  tagColor?: string;
}

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications: Notification[] = [
    {
      id: 1,
      sender: {
        name: "Lily L",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        initials: "LL"
      },
      date: "Feb 2",
      content: "Baking Cake event has been changed to 1:30!",
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    },
    {
      id: 2,
      sender: {
        name: "Aparna B",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        initials: "AB"
      },
      date: "Feb 2",
      content: "@You when are we planning on setting up?",
      tag: "in Committee Chat"
    },
    {
      id: 3,
      sender: {
        name: "Melina A",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        initials: "MA"
      },
      date: "Feb 3",
      content: "Please sign up for the baking event if you're interested!",
      tag: "Sisterhood",
      tagColor: "bg-purple-200 text-purple-700"
    },
    {
      id: 4,
      sender: {
        name: "Celine B",
        avatar: "https://randomuser.me/api/portraits/women/34.jpg",
        initials: "CB"
      },
      date: "Feb 3",
      content: "Make sure to get dues in by the end of the week",
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    },
    {
      id: 5,
      sender: {
        name: "Automatic",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        initials: "A"
      },
      date: "Feb 3",
      content: "Your event \"Bake Sale\" is coming up in 1 hour",
      tag: "High Importance",
      tagColor: "bg-purple-700 text-white"
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateNotification = () => {
    // Handle creating a new notification
    console.log("Create new notification");
  };

  const handleDismissNotification = (id: number) => {
    // Handle dismissing a notification
    console.log("Dismiss notification", id);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="ml-2 h-6 w-6 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm">
          {notifications.length}
        </div>
      </header>

      <div className="px-6 py-4">
        <Button 
          variant="ghost" 
          className="flex items-center text-purple-700 mb-4 pl-0"
          onClick={handleCreateNotification}
        >
          <Plus className="w-5 h-5 mr-1" />
          Create Notification
        </Button>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-20">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="bg-white rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={notification.sender.avatar} alt={notification.sender.name} />
                  <AvatarFallback>{notification.sender.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{notification.sender.name}</p>
                    {notification.tag && (
                      <span className={`${notification.tagColor || "bg-gray-200"} text-xs px-3 py-1 rounded-full`}>
                        {notification.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{notification.date}</p>
                  <p className="mt-1">{notification.content}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDismissNotification(notification.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
