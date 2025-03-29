
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkboxes, setCheckboxes] = useState({
    leavingEarly: false,
    arrivingLate: false,
    foodAllergies: false,
    bringingGuest: false,
  });

  // Sample event data - in a real app this would come from an API or context
  const event = {
    id: Number(id),
    title: "Daily Standup Call",
    date: new Date("2024-02-16"),
    time: "5:00-6:00PM",
    tag: "Sisterhood",
  };

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConfirm = () => {
    toast({
      title: "Signed up!",
      description: "You have been successfully registered for this event.",
    });
    navigate('/?source=going');
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center px-4 py-3 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-grow px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800 mt-2">{event.title}</h1>
        <p className="text-gray-600 mb-3">{formatDate(event.date)} {event.time}</p>
        
        {event.tag && (
          <span className="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full font-bold inline-block mb-6">
            {event.tag}
          </span>
        )}

        <div className="text-gray-500 mb-3">
          <a href="#" className="text-purple-600">Add to Google Calendar</a>
        </div>
        
        <div className="space-y-3 mt-6">
          <CheckboxItem 
            id="leaving-early" 
            label="Leaving Early" 
            checked={checkboxes.leavingEarly}
            onCheckedChange={() => handleCheckboxChange('leavingEarly')}
          />
          
          <CheckboxItem 
            id="arriving-late" 
            label="Arriving Late" 
            checked={checkboxes.arrivingLate}
            onCheckedChange={() => handleCheckboxChange('arrivingLate')}
          />
          
          <CheckboxItem 
            id="food-allergies" 
            label="Food Allergies?" 
            checked={checkboxes.foodAllergies}
            onCheckedChange={() => handleCheckboxChange('foodAllergies')}
          />
          
          <CheckboxItem 
            id="bringing-guest" 
            label="Are you bringing a +1?" 
            checked={checkboxes.bringingGuest}
            onCheckedChange={() => handleCheckboxChange('bringingGuest')}
          />
        </div>
      </div>

      <div className="px-6 pb-8">
        <Button 
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-6 text-base"
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-md">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
        className="h-5 w-5 border-2 border-purple-300 data-[state=checked]:bg-purple-700"
      />
      <label htmlFor={id} className="text-base font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default SignUpPage;
