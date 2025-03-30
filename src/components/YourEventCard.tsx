
import React from "react";
import { MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Event } from "@/utils/eventStorage";

interface YourEventCardProps {
  event: Event;
  index: number;
}

const YourEventCard = ({ event, index }: YourEventCardProps) => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleAttendance = (eventId: number) => {
    navigate(`/event-attendance/${eventId}`);
  };

  const handleEditEvent = (eventId: number) => {
    navigate(`/edit-event/${eventId}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm relative">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#1A1F2C]">{event.title}</h3>
          <p className="text-gray-600">
            <span className="font-bold">{formatDate(event.date)}</span> {event.time}
          </p>
          <p className="text-gray-600 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {event.location}
          </p>
          
          <div className="flex flex-col mt-3">
            {index === 1 ? (
              <>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(5, event.attendees || 0))].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
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
                <span className="text-sm text-[#1A1F2C] mt-1">
                  {event.attendees || 0} people have signed up
                </span>
              </>
            ) : (
              <>
                <span className="text-sm text-[#1A1F2C] mb-1">
                  {event.attendees || 0} people have signed up
                </span>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(5, event.attendees || 0))].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
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
              </>
            )}
          </div>
          
          {index === 0 ? (
            <div className="flex gap-2 mt-3">
              <Button 
                className="bg-purple-900 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded-md"
                onClick={() => handleAttendance(event.id)}
              >
                Attendance
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-700 text-sm"
                onClick={() => handleEditEvent(event.id)}
              >
                Edit Event
              </Button>
            </div>
          ) : (
            <div className="mt-3">
              <Button 
                variant="ghost" 
                className="text-purple-700 text-sm px-0 py-2"
                onClick={() => handleEditEvent(event.id)}
              >
                Edit Event
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          {event.tag && (
            <span className={`${event.tagColor} text-xs px-3 py-1 rounded-full font-bold text-[13px]`}>
              {event.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourEventCard;
