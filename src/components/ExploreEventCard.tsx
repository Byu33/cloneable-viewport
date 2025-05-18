
import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  const { month, day } = formatDate(date);

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm w-80 overflow-hidden font-figtree cursor-pointer border border-gray-100"
      onClick={handleClick}
    >
      <div className="relative">
        <AspectRatio ratio={16/9} className="bg-gray-100">
          <div className="absolute top-0 left-0 bg-brand-purple text-white px-4 py-2 rounded-br-xl font-medium flex flex-col items-center">
            <span className="text-xs">{month}</span>
            <span className="text-xl font-bold">{day}</span>
          </div>
          <div className="w-full h-full">
            {/* This would be an image in a real app */}
          </div>
        </AspectRatio>
      </div>
      <div className="p-4">
        <div className="mb-2">
          {tag && (
            <span className={`${tagColor || "bg-brand-lavender text-brand-purple"} text-xs px-3 py-1 rounded-full font-medium`}>
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg text-left mb-2">{title}</h3>
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2 shrink-0" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      {attendees && (
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {[...Array(Math.min(5, attendees))].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-brand-lavender border-2 border-white overflow-hidden"
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
