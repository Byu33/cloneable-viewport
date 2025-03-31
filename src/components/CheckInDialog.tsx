
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
      <DialogContent className="p-0 overflow-auto max-w-md max-h-[90vh]">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold">Check In</h2>
            <DialogClose className="rounded-full focus:outline-none">
              <X className="h-6 w-6" />
            </DialogClose>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-600">
                  {`${formatDate(event.date)} ${event.time}`}
                </p>
                <p className="text-gray-600">{event.location}</p>
              </div>
              {event.tag && (
                <span className={`${event.tagColor || "bg-purple-200 text-purple-700"} text-xs px-3 py-1 rounded-full font-bold`}>
                  {event.tag}
                </span>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md inline-block mb-4">
              Success!
            </div>

            <p className="text-base mb-2">
              We see that you are close to{" "}
              <span className="text-purple-700 font-medium">{event.location}</span>.
            </p>
            <p className="text-base">
              We hope you have fun and enjoy the event!
            </p>
          </div>

          <div className="w-full h-60 rounded-xl overflow-hidden mt-4">
            <img 
              src="/lovable-uploads/d20c356f-dd9f-4875-948a-59e12462ea56.png" 
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
