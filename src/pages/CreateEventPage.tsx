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
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [isRequired, setIsRequired] = useState(false);
  const [attendeeGroups, setAttendeeGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [requiredForGroups, setRequiredForGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [requiredForMembers, setRequiredForMembers] = useState<string[]>([]);
  const [requiredSearchQuery, setRequiredSearchQuery] = useState("");
  
  // Update the individual members list with avatar URLs
  const individualMembers = [
    { id: "1", name: "Emma Johnson", avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    { id: "2", name: "Olivia Davis", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
    { id: "3", name: "Sophia Martinez", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { id: "4", name: "Ava Wilson", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { id: "5", name: "Isabella Thompson", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
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
  
  // Filter for required members search
  const filteredRequiredMembers = individualMembers.filter(member =>
    member.name.toLowerCase().includes(requiredSearchQuery.toLowerCase())
  );
  
  const filteredRequiredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(requiredSearchQuery.toLowerCase())
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
  
  // Functions for required attendees
  const toggleRequiredMemberSelection = (id: string) => {
    setRequiredForMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleRequiredGroupChange = (group: keyof typeof requiredForGroups) => {
    setRequiredForGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handleRequiredGroupSelect = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && group.key) {
      handleRequiredGroupChange(group.key as keyof typeof requiredForGroups);
    }
  };

  // Modify the rendering of members to include Avatar
  const renderMemberItem = (member: typeof individualMembers[0], toggleMemberSelection: (id: string) => void, selectedMembers: string[]) => (
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
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage src={member.avatarUrl} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <label htmlFor={`member-${member.id}`} className="flex-1 cursor-pointer">
        {member.name}
      </label>
    </CommandItem>
  );

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

          {/* Is this event required? */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium">
              Is this Event Required?
            </label>
            <Switch 
              checked={isRequired} 
              onCheckedChange={setIsRequired} 
            />
          </div>
          
          {isRequired && (
            <Command className="rounded-lg border shadow-sm bg-white">
              <CommandInput 
                placeholder="Search groups or members who must attend..." 
                value={requiredSearchQuery}
                onValueChange={setRequiredSearchQuery}
              />
              <CommandList>
                {/* No results message */}
                {filteredRequiredGroups.length === 0 && filteredRequiredMembers.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                
                {/* Groups section */}
                {filteredRequiredGroups.length > 0 && (
                  <CommandGroup heading="Required for Groups">
                    {filteredRequiredGroups.map(group => (
                      <CommandItem 
                        key={group.id} 
                        onSelect={() => handleRequiredGroupSelect(group.id)}
                        className="flex items-center gap-2"
                      >
                        <Checkbox 
                          id={`required-group-${group.id}`}
                          checked={requiredForGroups[group.key as keyof typeof requiredForGroups]}
                          onCheckedChange={() => handleRequiredGroupSelect(group.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`required-group-${group.id}`} className="flex-1 cursor-pointer">
                          {group.name}
                        </label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                
                {/* Members section */}
                {filteredRequiredMembers.length > 0 && (
                  <CommandGroup heading="Required for Members">
                    {filteredRequiredMembers.map(member => 
                      renderMemberItem(member, toggleRequiredMemberSelection, requiredForMembers)
                    )}
                  </CommandGroup>
                )}
              </CommandList>
              
              {/* Selected members counter */}
              {requiredForMembers.length > 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-t">
                  {requiredForMembers.length} individual member{requiredForMembers.length !== 1 ? 's' : ''} required to attend
                </div>
              )}
            </Command>
          )}

          {/* Who Can Attend - Toggle and Direct Search Interface */}
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
            <Command className="rounded-lg border shadow-sm bg-white">
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
                
                {/* Groups section */}
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
                    {filteredMembers.map(member => 
                      renderMemberItem(member, toggleMemberSelection, selectedMembers)
                    )}
                  </CommandGroup>
                )}
              </CommandList>
              
              {/* Selected members counter */}
              {selectedMembers.length > 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-t">
                  {selectedMembers.length} individual member{selectedMembers.length !== 1 ? 's' : ''} selected
                </div>
              )}
            </Command>
          )}

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
