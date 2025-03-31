
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Attendee {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role?: string;
}

const EventAttendeesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for attendees
  const attendees: Attendee[] = [
    {
      id: 1,
      name: "Esther Smith",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      initials: "ES",
      role: "Host"
    },
    {
      id: 2,
      name: "Aparna Patel",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      initials: "AP",
      role: "Host"
    },
    {
      id: 3,
      name: "Hannah B",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      initials: "HB"
    },
    {
      id: 4,
      name: "Mooshoo Craddock",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      initials: "MC"
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      initials: "ET"
    },
    {
      id: 6,
      name: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      initials: "SM"
    },
    {
      id: 7,
      name: "Isabella Wilson",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      initials: "IW"
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleMessageAll = () => {
    // Handle messaging all attendees
    console.log("Message all attendees");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Event Attendees</h1>
        <div className="ml-2 h-6 w-6 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm">
          {attendees.length}
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-20">
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="font-semibold text-lg mb-2">Event Hosts</h2>
          <div className="space-y-3">
            {attendees.filter(a => a.role === "Host").map((attendee) => (
              <div key={attendee.id} className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{attendee.name}</p>
                  <p className="text-sm text-purple-700">Host</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-2">Attendees</h2>
          <div className="space-y-3">
            {attendees.filter(a => a.role !== "Host").map((attendee) => (
              <div key={attendee.id} className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.initials}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{attendee.name}</p>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-purple-700 hover:bg-purple-800 mt-4 py-2"
          onClick={handleMessageAll}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Message all attendees
        </Button>
      </div>
    </div>
  );
};

export default EventAttendeesPage;
