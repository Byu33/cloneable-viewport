
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    title: string;
    date: Date;
    time: string;
    location: string;
    tag?: string;
    tagColor?: string;
  };
}

const CheckInDialog = ({ open, onOpenChange, event }: CheckInDialogProps) => {
  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold">Check In</h2>
            <DialogClose className="rounded-full p-1 focus:outline-none">
              <X className="h-6 w-6" />
            </DialogClose>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-600">
                  {formatDate(event.date)} {event.time}
                </p>
                <p className="text-gray-600">{event.location}</p>
              </div>
              {event.tag && (
                <span className={`${event.tagColor} text-xs px-3 py-1 rounded-full font-bold`}>
                  {event.tag}
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col items-start">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md mb-4">
              Success!
            </div>

            <p className="text-lg">
              We see that you are close to{" "}
              <span className="text-purple-600 font-medium">{event.location}</span>. We hope you
              have fun and enjoy the event!
            </p>
          </div>

          <div className="mt-6 w-full h-60 rounded-xl overflow-hidden">
            <img 
              src="/lovable-uploads/683a31e9-6e4e-4122-bfc5-d3fbfa8b8718.png" 
              alt="Map showing location" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInDialog;
