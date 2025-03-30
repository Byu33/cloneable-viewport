
import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, ChevronRight, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const EventAttendancePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCheckedInOpen, setIsCheckedInOpen] = useState(false);

  // Mock data for the event
  const event = {
    id: id || "1",
    title: "Daily Standup Call",
    date: new Date(2024, 1, 16),
    time: "5:00-6:00PM",
    location: "Everitt Laboratory",
    tag: "Sisterhood",
    tagColor: "bg-purple-200 text-purple-700",
  };

  // Mock data for checked-in users
  const checkedInUsers = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: 2, name: "Aparna P", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
    { id: 3, name: "Esther S", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 4, name: "Mooshoo C", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 5, name: "Lisa R", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
    { id: 6, name: "Jennifer K", avatar: "https://randomuser.me/api/portraits/women/76.jpg" },
    { id: 7, name: "Maya L", avatar: "https://randomuser.me/api/portraits/women/89.jpg" },
  ];

  // Mock data for signed-up users
  const signedUpUsers = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Leaving early" },
    { id: 2, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Arriving Late" },
    { id: 3, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Meal Preferences" },
    { id: 4, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "" },
    { id: 5, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", status: "Leaving early" },
  ];

  // Format date
  const formatDate = (date: Date) => {
    return `Feb ${date.getDate()}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 flex items-center bg-white border-b">
        <button className="mr-4" onClick={() => navigate("/your-events")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-grow overflow-auto">
        {/* Event Card */}
        <div className="m-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-semibold text-lg">{event.title}</h2>
              <p className="text-gray-600 text-sm">
                {formatDate(event.date)} {event.time}
              </p>
              <p className="text-gray-600 text-sm">{event.location}</p>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <span className={`${event.tagColor} text-xs px-3 py-1 rounded-full font-bold`}>
                {event.tag}
              </span>
              <button className="flex items-center text-purple-700 text-sm">
                <Edit className="w-4 h-4 mr-1" />
                Edit Event
              </button>
            </div>
          </div>
        </div>

        {/* Checked In Section */}
        <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm">
          <button 
            className="w-full p-4 flex justify-between items-center"
            onClick={() => setIsCheckedInOpen(!isCheckedInOpen)}
          >
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Checked In</h3>
              <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs font-semibold">
                {checkedInUsers.length}
              </span>
            </div>
            {isCheckedInOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {isCheckedInOpen && (
            <div className="px-4 pb-4">
              {checkedInUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-800">{user.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Signed Up Section */}
        <div className="mx-4 bg-white rounded-lg shadow-sm">
          <div className="p-4 flex justify-between items-center border-b">
            <div>
              <h3 className="text-lg font-medium">Signed Up</h3>
              <p className="text-sm text-gray-500">Check box if member is present</p>
            </div>
            <Button variant="outline" className="flex items-center gap-1 text-purple-700 border-purple-200">
              <Plus className="w-4 h-4" />
              Add Member
            </Button>
          </div>
          
          <div>
            {signedUpUsers.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Checkbox id={`user-${user.id}`} className="border-purple-300 data-[state=checked]:bg-purple-700" />
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <label htmlFor={`user-${user.id}`} className="text-gray-800">
                    {user.name}
                  </label>
                </div>
                
                <div className="flex items-center">
                  {user.status && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full mr-2">
                      {user.status}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAttendancePage;
