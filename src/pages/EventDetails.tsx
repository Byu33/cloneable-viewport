
import React from "react";
import { ArrowLeft, Share2, User, MapPin, X, MessageSquare, Edit } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";
import { toast } from "@/hooks/use-toast";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const isAlreadyAttending = location.search.includes("source=going");
  const isYourEvent = location.search.includes("source=your-events");
  
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

  const handleCancelAttendance = () => {
    toast({
      title: "Attendance Cancelled",
      description: "You are no longer attending this event",
    });
    navigate('/');
  };

  const handleSignUp = () => {
    navigate(`/signup/${id}`);
  };
  
  const handleViewAttendees = () => {
    navigate(`/event/${id}/attendees`);
  };
  
  const handleMessageAttendees = () => {
    // Handle messaging attendees
    console.log("Message attendees about event");
  };
  
  const handleEditEvent = () => {
    navigate(`/edit-event/${id}`);
  };
  
  const handleCancelEvent = () => {
    // Handle cancelling the event
    toast({
      title: "Event Cancelled",
      description: "The event has been cancelled",
    });
    navigate('/your-events');
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
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">{event.title}</h1>
              <p className="text-gray-700 mb-2">{formatDate(event.date)} {event.time}</p>
            </div>
            
            {event.tag && (
              <span className={`${event.tagColor || "bg-purple-200 text-purple-700"} text-xs px-3 py-1 rounded-full font-medium inline-block`}>
                {event.tag}
              </span>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 flex items-start mt-4">
            <div className="mr-3 mt-1">
              <MapPin className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Address</h3>
              <p className="text-gray-600">{event.address}</p>
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
          <div className="bg-white rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-3">Attendees</h2>
            <button 
              className="text-sm text-gray-600 mb-3 flex items-center"
              onClick={handleViewAttendees}
            >
              <span>{event.attendees.length} people are attending</span>
            </button>
            
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
            
            <Button 
              className="w-full bg-purple-700 hover:bg-purple-800 mt-4"
              onClick={handleMessageAttendees}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Message attendees about event
            </Button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-white shadow-lg">
        {isYourEvent ? (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 hover:text-purple-800 py-6 text-base"
              onClick={handleEditEvent}
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Event
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 py-6 text-base"
              onClick={handleCancelEvent}
            >
              <X className="w-5 h-5 mr-2" />
              Cancel Event
            </Button>
          </div>
        ) : isAlreadyAttending ? (
          <div className="space-y-2">
            <p className="text-center text-purple-600 font-medium text-base">
              <span className="font-bold">You are attending this event</span>
            </p>
            <Button 
              variant="outline" 
              className="w-full border-2 border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-600 py-6 text-base"
              onClick={handleCancelAttendance}
            >
              <X className="w-5 h-5 mr-2 text-gray-400" />
              Cancel Attendance
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-6"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        )}
      </div>

      <TabBar />
    </div>
  );
};

export default EventDetails;
