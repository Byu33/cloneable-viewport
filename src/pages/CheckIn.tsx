
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      tagColor: "bg-purple-200 text-purple-700",
      checkInStatus: "success" // Default to success if not provided
    } 
  };
  
  const checkInStatus = event.checkInStatus || "success";
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(true);
  
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
