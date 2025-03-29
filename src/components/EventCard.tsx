
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    time: string;
    location: string;
    tag?: string;
    tagColor?: string;
    attendees?: number;
    date: Date;
    status: "upcoming" | "past";
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, time, location, tag, tagColor, attendees, status } = event;

  // Format date for past events
  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {tag && (
          <span className={`${tagColor} text-xs px-3 py-1 rounded-full`}>
            {tag}
          </span>
        )}
      </div>
      
      {status === "past" && (
        <div className="text-sm text-gray-600 mb-2">
          {formatDate(event.date)} · {time}
        </div>
      )}
      
      {status === "upcoming" && (
        <div className="text-sm text-gray-600 mb-2">{time}</div>
      )}
      
      <div className="text-sm text-gray-600 mb-3">{location}</div>
      
      <div className="flex justify-between items-center">
        {status === "upcoming" ? (
          <>
            <Button className="bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded-md">
              Check In
            </Button>
            
            {attendees ? (
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 mb-1">
                  {attendees} people are attending
                </span>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(5, attendees))].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                    >
                      <Avatar className="w-full h-full">
                        <AvatarImage 
                          src={`https://randomuser.me/api/portraits/thumb/men/${i + 1}.jpg`} 
                          alt="Attendee"
                        />
                        <AvatarFallback>U{i+1}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Button variant="ghost" className="text-gray-400 text-sm">
                Absence Form
              </Button>
            )}
          </>
        ) : (
          <Button variant="secondary" className="text-sm">
            Feedback Form
          </Button>
        )}
      </div>
      
      <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-purple-100 opacity-50" />
    </div>
  );
};

export default EventCard;
