
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, ArrowLeft, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Alert, AlertTitle } from "@/components/ui/alert";

const CheckIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { event } = location.state || { 
    event: {
      title: "Chapter Meeting", 
      time: "5:00-6:00PM", 
      date: new Date(), 
      location: "Everitt Labratory",
      tag: "Sisterhood",
      tagColor: "bg-purple-200 text-purple-700"
    } 
  };
  
  const [checkInStatus, setCheckInStatus] = useState<"checking" | "success" | "error">("checking");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Simulate geolocation check (in a real app, you would use the browser's geolocation API)
  useEffect(() => {
    const checkLocation = setTimeout(() => {
      // In a real app, you would compare the user's location with the event location
      // For this demo, we'll just simulate success after 2 seconds
      setCheckInStatus("success");
      setShowSuccessDialog(true);
    }, 2000);
    
    return () => clearTimeout(checkLocation);
  }, []);
  
  const handleTryAgain = () => {
    setCheckInStatus("checking");
    // Simulate checking again
    setTimeout(() => {
      setCheckInStatus("success");
      setShowSuccessDialog(true);
    }, 2000);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (date: Date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const renderEventInfo = () => (
    <div className="w-full bg-white rounded-xl p-4 flex justify-between items-center mb-6">
      <div>
        <h3 className="text-lg font-semibold text-[#1A1F2C]">{event.title}</h3>
        <p className="text-gray-600">
          <span className="font-bold">{formatDate(event.date)}</span> {event.time}
        </p>
        <p className="text-gray-600">{event.location}</p>
      </div>
      
      {event.tag && (
        <span className={`${event.tagColor} text-xs px-3 py-1 rounded-full`}>
          {event.tag}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="flex items-center">
          <button onClick={handleGoBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-[#1A1F2C]" />
          </button>
          <h1 className="text-2xl font-semibold font-big-shoulders">Check In</h1>
        </div>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4">
        {renderEventInfo()}
        
        {checkInStatus === "checking" && (
          <>
            <Button 
              variant="secondary"
              className="bg-pink-100 hover:bg-pink-200 text-pink-700 mb-6"
              onClick={handleTryAgain}
            >
              Try Again
            </Button>
            
            <p className="text-lg font-medium mb-2">
              Please walk within a 1000ft distance to{" "}
              <span className="text-purple-700">Everitt Labratory</span>.
            </p>
            <p className="text-lg font-medium mb-6">We hope to see you there</p>
            
            <div className="relative rounded-xl overflow-hidden mb-6">
              <img 
                src="/lovable-uploads/6ca75f3f-5507-4757-97e5-f3c4ca45f584.png" 
                alt="Map showing location" 
                className="w-full h-60 object-cover"
              />
            </div>
            
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleTryAgain}
            >
              <RotateCw className="w-4 h-4" /> Refresh
            </Button>
          </>
        )}
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0 h-[90vh] max-h-[600px]">
          <div className="flex flex-col h-full">
            <header className="flex justify-between items-center px-6 py-4">
              <h1 className="text-2xl font-semibold font-big-shoulders">Check In</h1>
              <button onClick={() => navigate(-1)}>
                <X className="w-6 h-6 text-[#1A1F2C]" />
              </button>
            </header>
            
            <div className="flex-1 overflow-auto px-6 py-4">
              {renderEventInfo()}
              
              <Alert className="bg-green-100 border-green-200 mb-6">
                <AlertTitle className="text-green-700">Success!</AlertTitle>
              </Alert>
              
              <p className="text-lg font-medium mb-2">
                We see that you are close to{" "}
                <span className="text-purple-700">Everitt Labratory</span>.
              </p>
              <p className="text-lg font-medium mb-6">
                We hope you have fun and enjoy the event!
              </p>
              
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img 
                  src="/lovable-uploads/728b7802-e14a-4403-840f-866ca7a14478.png" 
                  alt="Map showing success location" 
                  className="w-full h-60 object-cover"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckIn;
