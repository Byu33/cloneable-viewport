
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";

const BirthdaysPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const birthdays = [
    { name: "Emma Johnson", date: "Today", avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    { name: "Olivia Davis", date: "Tomorrow", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
    { name: "Sophia Martinez", date: "May 15", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { name: "Ava Wilson", date: "May 20", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Birthdays</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto pb-20">
        <div className="space-y-4">
          {birthdays.map((person, index) => (
            <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={person.avatarUrl} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.date}</p>
                </div>
              </div>
              {person.date === "Today" && (
                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
                  Today
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default BirthdaysPage;
