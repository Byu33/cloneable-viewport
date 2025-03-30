
import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Cake, Star, Users, Image, CheckCircle, DollarSign } from "lucide-react";
import TabBar from "@/components/TabBar";

const OtherPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <Cake className="h-6 w-6 text-purple-700" />,
      title: "Birthdays",
      description: "Wish other actives a happy birthday",
      path: "/birthdays"
    },
    {
      icon: <Star className="h-6 w-6 text-purple-700" />,
      title: "Sister Points",
      description: "Give candidates sister points!",
      path: "/sister-points"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-700" />,
      title: "Members",
      description: "View member directory",
      path: "/members"
    },
    {
      icon: <Image className="h-6 w-6 text-purple-700" />,
      title: "Gallery",
      description: "Image gallery across all events",
      path: "/gallery"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-700" />,
      title: "Requirements",
      description: "View your requirements for the semester",
      path: "/requirements"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-purple-700" />,
      title: "Dues",
      description: "View your dues for the semester",
      path: "/dues"
    }
  ];

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="px-6 py-6 bg-white">
        <h1 className="text-2xl font-semibold">Other</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto pb-20">
        <div 
          className="bg-white rounded-lg p-4 flex items-center justify-between mb-6 shadow-sm"
          onClick={handleProfileClick}
        >
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Bella Yu" />
              <AvatarFallback>BY</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Bella Yu</p>
              <p className="text-sm text-gray-500">View Profile</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm"
              onClick={() => handleMenuItemClick(item.path)}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-md flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-purple-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default OtherPage;
