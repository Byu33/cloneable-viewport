
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface ExploreEventCardProps {
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

const ExploreEventCard: React.FC<ExploreEventCardProps> = ({ event }) => {
  const { id, title, time, location, tag, tagColor, attendees, date } = event;
  const navigate = useNavigate();

  // Format date
  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm w-80 overflow-hidden font-figtree cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">
              {formatDate(date)} {time}
            </p>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          {tag && (
            <span className={`${tagColor || "bg-purple-200 text-purple-700"} text-xs px-3 py-1 rounded-full font-bold`}>
              {tag}
            </span>
          )}
        </div>
      </div>
      
      {attendees && (
        <div className="bg-gray-50 p-4">
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {[...Array(Math.min(5, attendees))].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {attendees} people are attending
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreEventCard;
