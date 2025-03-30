
import React, { useState, useEffect } from "react";
import { X, CalendarIcon, MapPin, Plus, Upload, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Define categories with unique identifiers and color variations
const categories = [
  { id: "social", name: "Social", color: "bg-purple-600 text-white" },
  { id: "professional", name: "Professional", color: "bg-purple-600 text-white" },
  { id: "fundraising", name: "Fundraising", color: "bg-purple-600 text-white" },
  { id: "risk", name: "Risk", color: "bg-purple-600 text-white" },
  { id: "sisterhood", name: "Sisterhood", color: "bg-purple-600 text-white" },
];

const EditEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // Details Tab State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [restrictAttendance, setRestrictAttendance] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [attendeeGroups, setAttendeeGroups] = useState({
    allMembers: false,
    allCandidates: false,
    allOfficers: false,
  });
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Content Tab State
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Logistics Tab State
  const [budget, setBudget] = useState("");
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [limitAttendees, setLimitAttendees] = useState(false);
  const [attendeeLimit, setAttendeeLimit] = useState("");
  
  // Edit-specific state
  const [notifyAttendees, setNotifyAttendees] = useState(false);
  
  // Mock data for this example
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
  
  // Filtered data for searches
  const filteredMembers = individualMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Mock event data - would be fetched from API in real implementation
  useEffect(() => {
    // Simulate fetching event data
    const fetchEvent = () => {
      // Mock data for example
      setTimeout(() => {
        setTitle("Chapter Meeting");
        setDate(new Date(2024, 1, 16));
        setStartTime("17:00");
        setEndTime("18:00");
        setLocation("Everitt Laboratory");
        setSelectedCategories(["Sisterhood"]);
        setDescription("Monthly chapter meeting to discuss upcoming events and chapter business.");
        setBudget("200");
        // Set other fields as needed
      }, 500);
    };
    
    fetchEvent();
  }, [id]);
  
  // Event handlers
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
  
  const handleSave = () => {
    // In a real app, you would save the data to your backend here
    
    // Show success message
    toast.success("Event updated successfully");
    
    // Navigate back to your events page
    navigate("/your-events");
  };
  
  const handleCancel = () => {
    // Show confirmation dialog in real implementation
    // For now, just navigate back
    if (confirm("Are you sure you want to cancel this event? This cannot be undone.")) {
      toast.error("Event cancelled");
      navigate("/your-events");
    }
  };
  
  // Render member item with Avatar
  const renderMemberItem = (
    member: typeof individualMembers[0], 
    toggleMemberSelection: (id: string) => void, 
    selectedMembers: string[]
  ) => (
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
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleNext = () => {
    if (activeTab === "details") {
      setActiveTab("content");
    } else if (activeTab === "content") {
      setActiveTab("logistics");
    }
  };
  
  const handlePrevious = () => {
    if (activeTab === "content") {
      setActiveTab("details");
    } else if (activeTab === "logistics") {
      setActiveTab("content");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Event</h1>
          <button onClick={() => navigate("/your-events")}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Notification checkbox */}
        <div className="flex items-center mb-4">
          <Checkbox 
            id="notify-attendees" 
            checked={notifyAttendees} 
            onCheckedChange={(checked) => setNotifyAttendees(checked as boolean)}
            className="mr-2 h-4 w-4"
          />
          <label htmlFor="notify-attendees" className="text-sm text-gray-700">
            Notify attendees about changes
          </label>
        </div>
      </header>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
        <TabsList className="border-b grid grid-cols-3 rounded-none bg-white w-full">
          <TabsTrigger 
            value="details" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="content" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700"
          >
            Content
          </TabsTrigger>
          <TabsTrigger 
            value="logistics" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700"
          >
            Logistics
          </TabsTrigger>
        </TabsList>
        
        {/* Details Tab */}
        <TabsContent value="details" className="flex-1 overflow-auto">
          <div className="px-6 py-4 pb-24">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-gray-700 font-medium">End Time</label>
                  <Input
                    type="time"
                    className="bg-gray-50"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                        selectedCategories.includes(category.name)
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
              
              {/* Restrict who can attend */}
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
            </div>
          </div>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="flex-1 overflow-auto">
          <div className="px-6 py-4 pb-24">
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Image (optional)
                </label>
                <div 
                  className={`border border-dashed rounded-md p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer ${
                    previewUrl ? 'border-transparent' : 'border-gray-300'
                  }`}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Event preview" 
                      className="max-h-40 object-contain"
                    />
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                        <Upload className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-purple-600 text-center">File accepted: png, jpg</p>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-gray-700 font-medium">
                  Description (optional)
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your event"
                  className="bg-gray-50 min-h-[160px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Logistics Tab */}
        <TabsContent value="logistics" className="flex-1 overflow-auto">
          <div className="px-6 py-4 pb-24">
            <div className="space-y-6">
              {/* Budget */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Budget</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <Input
                    type="number"
                    placeholder=""
                    className="bg-gray-50 pl-8"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>

              {/* Logistics */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Logistics</h2>
                <div className="space-y-3">
                  <div className="flex flex-col space-y-3 rounded-md bg-gray-50 p-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="limit-attendees" 
                        className="mt-1" 
                        checked={limitAttendees}
                        onCheckedChange={(checked) => setLimitAttendees(checked === true)}
                      />
                      <label
                        htmlFor="limit-attendees"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Would you like to limit the number of attendees?
                      </label>
                    </div>
                    
                    {limitAttendees && (
                      <div className="ml-6 mt-2">
                        <label htmlFor="attendee-limit" className="text-sm mb-1 block">
                          Maximum number of attendees:
                        </label>
                        <Input
                          id="attendee-limit"
                          type="number"
                          className="bg-white w-full md:w-1/3"
                          placeholder="Enter a number"
                          value={attendeeLimit}
                          onChange={(e) => setAttendeeLimit(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                    <Checkbox id="automatic-reminders" className="mt-1" />
                    <label
                      htmlFor="automatic-reminders"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Do you want automatic reminders sent to attendees?
                    </label>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                    <Checkbox id="allow-plus-ones" className="mt-1" />
                    <label
                      htmlFor="allow-plus-ones"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Should guests be allowed to bring +1s?
                    </label>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                    <Checkbox id="food-allergies" className="mt-1" />
                    <label
                      htmlFor="food-allergies"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Would you like to ask attendees about food allergies or meal preferences?
                    </label>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                    <Checkbox id="waiting-list" className="mt-1" />
                    <label
                      htmlFor="waiting-list"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Do you want to allow a waiting list if the event is full?
                    </label>
                  </div>

                  {/* Custom Questions */}
                  {customQuestions.map((question, index) => (
                    <div key={index} className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                      <Checkbox id={`custom-question-${index}`} className="mt-1" />
                      <label
                        htmlFor={`custom-question-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {question}
                      </label>
                    </div>
                  ))}

                  {/* Add a Question */}
                  {showAddQuestion ? (
                    <div className="mt-2 space-y-2">
                      <Input
                        type="text"
                        placeholder="Type your question here"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="w-full"
                      />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setShowAddQuestion(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => {
                          if (newQuestion.trim()) {
                            setCustomQuestions([...customQuestions, newQuestion]);
                            setNewQuestion("");
                            setShowAddQuestion(false);
                          }
                        }}>
                          Add
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="flex items-center text-purple-700 font-medium mt-4"
                      onClick={() => setShowAddQuestion(true)}
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add a question for participants
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white flex justify-between items-center">
        {activeTab !== "details" && (
          <Button variant="outline" className="px-4" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        
        {activeTab === "details" && (
          <div></div> // Empty div to maintain flex spacing
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={handleCancel}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Cancel Event
          </Button>
          
          {activeTab !== "logistics" ? (
            <Button 
              className="bg-purple-700 hover:bg-purple-800 text-white px-6"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button 
              className="bg-purple-700 hover:bg-purple-800 text-white px-6"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
