
import React, { useState } from "react";
import { X, CalendarIcon, MapPin, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";

// Define categories with unique identifiers and color variations
const categories = [
  { id: "social", name: "Social", color: "bg-blue-500 text-white" },
  { id: "professional", name: "Professional", color: "bg-green-500 text-white" },
  { id: "networking", name: "Networking", color: "bg-purple-500 text-white" },
  { id: "workshop", name: "Workshop", color: "bg-orange-500 text-white" },
  { id: "conference", name: "Conference", color: "bg-red-500 text-white" },
];

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [restrictAttendance, setRestrictAttendance] = useState(false);
  const [attendeeGroups, setAttendeeGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample individual members list
  const individualMembers = [
    { id: "1", name: "Emma Johnson" },
    { id: "2", name: "Olivia Davis" },
    { id: "3", name: "Sophia Martinez" },
    { id: "4", name: "Ava Wilson" },
    { id: "5", name: "Isabella Thompson" },
  ];
  
  // Define group options for search
  const groups = [
    { id: "members", name: "All Members", key: "allMembers" },
    { id: "candidates", name: "All Candidates", key: "allCandidates" },
    { id: "officers", name: "All Officers", key: "allOfficers" },
  ];
  
  // Filter members and groups based on search query
  const filteredMembers = individualMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const handleNextClick = () => {
    navigate("/create-event/details");
  };

  const toggleMemberSelection = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleGroupChange = (group: keyof typeof attendeeGroups) => {
    setAttendeeGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Handle group selection from search results
  const handleGroupSelect = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && group.key) {
      handleGroupChange(group.key as keyof typeof attendeeGroups);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm text-gray-600">Page 1 of 3</h1>
          <button onClick={() => navigate(-1)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <Progress value={33.33} className="w-full" />
      </header>

      <div className="flex-1 px-6 py-4 overflow-auto pb-24">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create a New Event</h1>
        
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title of Event
            </label>
            <Input
              id="title"
              placeholder="Enter event title"
              className="bg-gray-50"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-gray-50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? (
                      format(date, "MM/dd/yyyy")
                    ) : (
                      <span className="text-gray-400">__/__/____</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Start Time</label>
              <Input
                type="time"
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">End Time</label>
              <Input
                type="time"
                className="bg-gray-50"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-gray-700 font-medium">
              Location
            </label>
            <div className="relative">
              <Input
                id="location"
                placeholder="Enter location"
                className="bg-gray-50 pr-10"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="block text-gray-700 font-medium">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category.name
                      ? category.color
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Who Can Attend - Toggle and Card with Search */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">
                Restrict who can attend?
              </label>
              <Switch 
                checked={restrictAttendance} 
                onCheckedChange={setRestrictAttendance} 
              />
            </div>
            
            {restrictAttendance && (
              <Card className="w-full bg-white border border-gray-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Search at the top */}
                    <Command className="rounded-lg border shadow-sm">
                      <CommandInput 
                        placeholder="Search groups or members..." 
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        {/* No results message */}
                        {filteredGroups.length === 0 && filteredMembers.length === 0 && (
                          <CommandEmpty>No results found.</CommandEmpty>
                        )}
                        
                        {/* Groups section - always shown with checkboxes */}
                        {filteredGroups.length > 0 && (
                          <CommandGroup heading="Groups">
                            {filteredGroups.map(group => (
                              <CommandItem 
                                key={group.id} 
                                onSelect={() => handleGroupSelect(group.id)}
                                className="flex items-center gap-2"
                              >
                                <Checkbox 
                                  id={`group-${group.id}`}
                                  checked={attendeeGroups[group.key as keyof typeof attendeeGroups]}
                                  onCheckedChange={() => handleGroupSelect(group.id)}
                                  className="mr-2"
                                />
                                <label htmlFor={`group-${group.id}`} className="flex-1 cursor-pointer">
                                  {group.name}
                                </label>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                        
                        {/* Members section */}
                        {filteredMembers.length > 0 && (
                          <CommandGroup heading="Members">
                            {filteredMembers.map(member => (
                              <CommandItem 
                                key={member.id} 
                                onSelect={() => toggleMemberSelection(member.id)}
                                className="flex items-center gap-2"
                              >
                                <Checkbox 
                                  id={`member-${member.id}`}
                                  checked={selectedMembers.includes(member.id)}
                                  onCheckedChange={() => toggleMemberSelection(member.id)}
                                  className="mr-2"
                                />
                                <label htmlFor={`member-${member.id}`} className="flex-1 cursor-pointer">
                                  {member.name}
                                </label>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                    
                    {/* Group options section when not searching */}
                    {!searchQuery && (
                      <div className="space-y-3 pt-2">
                        <h3 className="text-sm font-medium text-gray-700">Quick Select Groups</h3>
                        <div className="space-y-2">
                          {groups.map(group => (
                            <div key={group.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`quick-${group.id}`} 
                                checked={attendeeGroups[group.key as keyof typeof attendeeGroups]}
                                onCheckedChange={() => handleGroupChange(group.key as keyof typeof attendeeGroups)}
                              />
                              <label
                                htmlFor={`quick-${group.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {group.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Reminder about selected members - only show if there are selections */}
                    {selectedMembers.length > 0 && (
                      <div className="pt-2 text-sm text-gray-500">
                        {selectedMembers.length} individual member{selectedMembers.length !== 1 ? 's' : ''} selected
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Add Event Hosts */}
          <button className="flex items-center text-purple-700 font-medium mt-4">
            <Plus className="h-5 w-5 mr-2" />
            Add Event Hosts
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
        <Button 
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-6"
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateEventPage;
