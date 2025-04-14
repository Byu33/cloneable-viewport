
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface EventFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: EventFilters) => void;
}

export interface EventFilters {
  eventTypes: string[];
  attendeeStatus: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  tags: string[];
}

const EventFilterSheet = ({ open, onOpenChange, onApplyFilters }: EventFilterSheetProps) => {
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [attendeeStatus, setAttendeeStatus] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Define filter options
  const eventTypeOptions = [
    { id: "sisterhood", label: "Sisterhood" },
    { id: "professional", label: "Professional" },
    { id: "fundraising", label: "Fundraising" },
    { id: "eoh", label: "EOH" },
    { id: "risk", label: "Risk" },
    { id: "historian", label: "Historian" },
  ];

  const tagOptions = [
    { id: "required", label: "Required" },
    { id: "optional", label: "Optional" },
    { id: "social", label: "Social" },
    { id: "academic", label: "Academic" },
  ];

  const attendeeStatusOptions = [
    { id: "signed-up", label: "Signed Up" },
    { id: "not-signed-up", label: "Not Signed Up" },
    { id: "attending", label: "Attending" },
  ];

  const handleEventTypeChange = (type: string) => {
    setEventTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleTagChange = (tag: string) => {
    setTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleAttendeeStatusChange = (status: string) => {
    setAttendeeStatus(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const handleReset = () => {
    setEventTypes([]);
    setTags([]);
    setAttendeeStatus([]);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleApply = () => {
    onApplyFilters({
      eventTypes,
      tags,
      attendeeStatus,
      startDate,
      endDate,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[90%] sm:max-w-md overflow-y-auto">
        <SheetHeader className="flex justify-between items-center border-b pb-4">
          <SheetTitle className="text-xl font-semibold">Filter Events</SheetTitle>
          <SheetClose className="rounded-full focus:outline-none">
            <X className="h-5 w-5" />
          </SheetClose>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Event Type Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Event Type</h3>
            <div className="space-y-2">
              {eventTypeOptions.map(type => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`event-type-${type.id}`} 
                    checked={eventTypes.includes(type.id)}
                    onCheckedChange={() => handleEventTypeChange(type.id)}
                    className="border-purple-300 data-[state=checked]:bg-purple-700" 
                  />
                  <label 
                    htmlFor={`event-type-${type.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Date Range</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Start Date</p>
                <div className="border rounded-md p-2 bg-gray-50">
                  {startDate ? (
                    <p className="text-sm">{format(startDate, 'MMMM d, yyyy')}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Select a start date</p>
                  )}
                </div>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="mt-2 rounded-md pointer-events-auto"
                />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">End Date</p>
                <div className="border rounded-md p-2 bg-gray-50">
                  {endDate ? (
                    <p className="text-sm">{format(endDate, 'MMMM d, yyyy')}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Select an end date</p>
                  )}
                </div>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="mt-2 rounded-md pointer-events-auto"
                  disabled={(date) => startDate ? date < startDate : false}
                />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Tags</h3>
            <div className="space-y-2">
              {tagOptions.map(tag => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`tag-${tag.id}`} 
                    checked={tags.includes(tag.id)}
                    onCheckedChange={() => handleTagChange(tag.id)}
                    className="border-purple-300 data-[state=checked]:bg-purple-700" 
                  />
                  <label 
                    htmlFor={`tag-${tag.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tag.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Attendee Status Section */}
          <div>
            <h3 className="text-lg font-medium mb-3">Attendee Status</h3>
            <div className="space-y-2">
              {attendeeStatusOptions.map(status => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status.id}`} 
                    checked={attendeeStatus.includes(status.id)}
                    onCheckedChange={() => handleAttendeeStatusChange(status.id)}
                    className="border-purple-300 data-[state=checked]:bg-purple-700" 
                  />
                  <label 
                    htmlFor={`status-${status.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4 border-t pt-4">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Reset
          </Button>
          <Button className="flex-1 bg-purple-700 hover:bg-purple-800 text-white" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EventFilterSheet;
