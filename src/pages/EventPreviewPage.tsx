import React from "react";
import { X, MapPin, Calendar, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const EventPreviewPage = () => {
  const navigate = useNavigate();
  
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
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 p-4 bg-gray-50 flex justify-end">
        <button onClick={() => navigate("/your-events")}>
          <X className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 px-6 py-8 overflow-auto pb-24">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{formatDate(event.date)} {event.time}</span>
            </div>

            {event.tag && (
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-gray-500" />
                <span className={`${event.tagColor} text-xs px-4 py-2 rounded-full font-medium`}>
                  {event.tag}
                </span>
              </div>
            )}
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-gray-800 font-medium">{event.location}</p>
                <p className="text-gray-600 text-sm">{event.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{event.description}</p>
        </div>

        <div className="mt-6">
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

        <div className="mt-6 mb-8">
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

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200 flex justify-between">
        <Button 
          variant="outline" 
          className="px-6"
          onClick={() => navigate("/create-event/logistics")}
        >
          Edit
        </Button>
        <Button 
          className="bg-purple-700 hover:bg-purple-800 text-white px-6"
          onClick={() => navigate("/your-events")}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default EventPreviewPage;
