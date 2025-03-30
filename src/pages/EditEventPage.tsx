
import React, { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EditEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [notifyAttendees, setNotifyAttendees] = useState(false);

  // Mock event data - in a real app, you would fetch this based on the ID
  const eventData = {
    id: id || "1",
    title: "Chapter Meeting",
    date: "2024-02-16",
    startTime: "5:00PM",
    endTime: "6:00PM",
    location: "Everitt Laboratory",
    category: "Sisterhood",
  };

  const [formData, setFormData] = useState(eventData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real app, you would update the event in your backend
    toast({
      title: "Event Updated",
      description: "Your event changes have been saved.",
    });
    navigate("/your-events");
  };

  const handleCancel = () => {
    // In a real app, you would delete or update the event status in your backend
    toast({
      title: "Event Cancelled",
      description: notifyAttendees 
        ? "The event has been cancelled and attendees have been notified."
        : "The event has been cancelled.",
    });
    navigate("/your-events");
  };

  const categories = [
    { id: 1, name: "Sisterhood", selected: true, color: "bg-purple-700 text-white" },
    { id: 2, name: "Professional", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 3, name: "Fundraising", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 4, name: "EOH", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 5, name: "Risk", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 6, name: "Historian", selected: false, color: "bg-gray-200 text-gray-800" },
    // Added some duplicates to match the design
    { id: 7, name: "Risk", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 8, name: "Risk", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 9, name: "Professional", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 10, name: "Fundraising", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 11, name: "EOH", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 12, name: "Risk", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 13, name: "Historian", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 14, name: "Historian", selected: false, color: "bg-gray-200 text-gray-800" },
    { id: 15, name: "Historian", selected: false, color: "bg-gray-200 text-gray-800" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-4 flex items-center bg-white border-b">
        <button className="mr-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Edit Event</h1>
      </header>

      <div className="flex-1 pb-20">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Checkbox 
              id="notify-attendees"
              checked={notifyAttendees}
              onCheckedChange={(checked) => setNotifyAttendees(!!checked)}
              className="border-purple-300 data-[state=checked]:bg-purple-700"
            />
            <label htmlFor="notify-attendees" className="ml-2 text-sm font-medium text-purple-700">
              Notify Attendees about Changes
            </label>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700 rounded-none">
                Details
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700 rounded-none">
                Content
              </TabsTrigger>
              <TabsTrigger value="logistics" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:text-purple-700 rounded-none">
                Logistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title of Event
                </label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Date
                  </label>
                  <div className="relative">
                    <Input 
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-gray-100"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </label>
                  <Input 
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input 
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="bg-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input 
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        category.name === formData.category ? category.color : "bg-gray-200 text-gray-800"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, category: category.name }))}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Event Description
                  </label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Add a description of your event..."
                    className="bg-gray-100 min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logistics">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="additionalInfo" className="text-sm font-medium">
                    Additional Information
                  </label>
                  <Textarea 
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Add any logistics information..."
                    className="bg-gray-100 min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-600 border-red-200">
                  Cancel Event
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to cancel this event?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The event will be removed from the calendar and all attendees will be notified.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-2">
                  <label htmlFor="cancel-reason" className="text-sm font-medium">
                    Reason (optional)
                  </label>
                  <Textarea
                    id="cancel-reason"
                    placeholder="Let attendees know why this event is being cancelled..."
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Nevermind</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleCancel}
                  >
                    Yes, Cancel Event
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button 
              className="bg-purple-700 hover:bg-purple-800 text-white"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
