
import React from "react";
import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    time: string;
    location: string;
    attendees?: number;
    tag?: string;
    tagColor?: string;
    date: Date;
    status: "upcoming" | "past";
  };
  onCheckIn?: () => void;
}

const EventCard = ({ event, onCheckIn }: EventCardProps) => {
  const isUpcoming = event.status === "upcoming";
  const isChapterMeeting = event.title === "Chapter Meeting";
  
  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-gray-600 text-sm">
            {`${formatDate(event.date)} ${event.time}`}
          </p>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
        {event.tag && (
          <span className={`${event.tagColor || "bg-purple-200 text-purple-700"} text-xs px-3 py-1 rounded-full font-bold`}>
            {event.tag}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          {isUpcoming && onCheckIn && (
            <>
              <Button 
                className="bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded-md"
                onClick={onCheckIn}
              >
                Check In
              </Button>
              
              {isChapterMeeting && (
                <Button variant="ghost" className="text-purple-700 text-sm ml-2">
                  Absence Form
                </Button>
              )}
            </>
          )}
        </div>
        
        {event.attendees ? (
          <div className="flex flex-col items-end ml-auto">
            <span className="text-sm text-gray-600 mb-1">
              {event.attendees} {event.attendees === 1 ? "person" : "people"} going
            </span>
            <div className="flex -space-x-2">
              {[...Array(Math.min(3, event.attendees))].map((_, i) => (
                <Avatar key={i} className="h-7 w-7 border-2 border-white">
                  <AvatarFallback className="bg-gray-200 text-xs">
                    {String.fromCharCode(65 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        ) : (
          <div />
        )}
        
        {!isUpcoming && (
          <Button 
            variant="outline" 
            className="text-gray-500 border-gray-300"
          >
            Past
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
