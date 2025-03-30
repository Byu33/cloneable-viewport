
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Bell, User } from "lucide-react";
import TabBar from "@/components/TabBar";

const ChatPage = () => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    navigate("/notifications");
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <h1 className="text-2xl font-semibold">Chat</h1>
        <div className="flex gap-4">
          <button className="p-1 bg-white rounded-full" onClick={handleCalendar}>
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleNotifications}>
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-1 bg-white rounded-full" onClick={handleProfile}>
            <User className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 flex items-center justify-center">
        <p className="text-gray-500">Chat functionality coming soon!</p>
      </div>

      <TabBar />
    </div>
  );
};

export default ChatPage;
