
import React from "react";
import { ArrowLeft, Share2, User, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const event = {
    id: 1,
    title: "Daily Standup Call",
    date: new Date("2024-02-16"),
    time: "5:00-6:00PM",
    location: "Everitt Laboratory",
    address: "1016 E Green St, Champaign IL",
    tag: "Sisterhood",
    tagColor: "bg-purple-200 text-purple-700",
    description: "Lorem Ipsum Blah por qua a fish jumped over the ocean and swam back to shore. Please join our event for a day of fun and games.",
    hosts: [
      { id: 1, name: "Aparna Patel", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
      { id: 2, name: "Mooshoo Craddock", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
    ],
    attendees: [
      { id: 1, name: "Esther Smith", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      { id: 2, name: "Aparna Patel", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
      { id: 3, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
      { id: 4, name: "Mooshoo Craddock", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
    ]
  };

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-4 py-3 bg-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="p-1 rounded-full">
          <Share2 className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-grow overflow-auto pb-24">
        <div className="px-6 py-8">
          <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h1>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold">{formatDate(event.date)}</span> {event.time}
                </p>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
              {event.tag && (
                <span className={`${event.tagColor} text-xs px-3 py-1 rounded-full font-bold`}>
                  {event.tag}
                </span>
              )}
            </div>
            <div className="border border-gray-200 rounded-lg p-4 flex items-start mt-2">
              <div className="mr-3 mt-1">
                <MapPin className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Address</h3>
                <p className="text-gray-600">{event.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{event.description}</p>
        </div>

        <div className="px-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Event Hosts</h2>
          <div className="space-y-3">
            {event.hosts.map(host => (
              <div key={host.id} className="flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={host.avatar} alt={host.name} />
                  <AvatarFallback>{host.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-gray-800">{host.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 mb-6">
          <div className="bg-purple-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-3">Attendees</h2>
            <p className="text-sm text-gray-600 mb-3">{event.attendees.length} people are attending</p>
            
            <div className="space-y-3">
              {event.attendees.map(attendee => (
                <div key={attendee.id} className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    <AvatarFallback>{attendee.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-800">{attendee.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white shadow-lg">
        <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-6">
          Sign Up
        </Button>
      </div>

      <TabBar />
    </div>
  );
};

export default EventDetails;
