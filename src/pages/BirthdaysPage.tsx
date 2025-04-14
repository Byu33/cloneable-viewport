
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cake, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";

interface Birthday {
  id: number;
  name: string;
  date: string;
  avatarUrl?: string;
  avatarFallback: string;
  upcoming: boolean;
}

const BirthdaysPage = () => {
  const navigate = useNavigate();

  const birthdays: Birthday[] = [
    {
      id: 1,
      name: "Emma Thompson",
      date: "Today",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
      avatarFallback: "ET",
      upcoming: true
    },
    {
      id: 2,
      name: "Sophia Martinez",
      date: "Tomorrow",
      avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
      avatarFallback: "SM",
      upcoming: true
    },
    {
      id: 3,
      name: "Isabella Wilson",
      date: "April 15",
      avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
      avatarFallback: "IW",
      upcoming: true
    },
    {
      id: 4,
      name: "Olivia Garcia",
      date: "April 17",
      avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      avatarFallback: "OG",
      upcoming: true
    },
    {
      id: 5,
      name: "Ava Rodriguez",
      date: "April 22",
      avatarUrl: "https://randomuser.me/api/portraits/women/39.jpg",
      avatarFallback: "AR",
      upcoming: true
    },
    {
      id: 6,
      name: "Mia Lewis",
      date: "March 28",
      avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
      avatarFallback: "ML",
      upcoming: false
    },
    {
      id: 7,
      name: "Charlotte Lee",
      date: "March 20",
      avatarUrl: "https://randomuser.me/api/portraits/women/48.jpg",
      avatarFallback: "CL",
      upcoming: false
    }
  ];

  const upcomingBirthdays = birthdays.filter(birthday => birthday.upcoming);
  const pastBirthdays = birthdays.filter(birthday => !birthday.upcoming);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Birthdays</h1>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-20">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Birthdays</h2>
          
          <div className="space-y-3">
            {upcomingBirthdays.map(birthday => (
              <div key={birthday.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src={birthday.avatarUrl} alt={birthday.name} />
                    <AvatarFallback>{birthday.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{birthday.name}</p>
                    <p className="text-sm text-gray-500">{birthday.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {(birthday.date === "Today" || birthday.date === "Tomorrow") && (
                    <Cake className="h-5 w-5 text-purple-600 mr-2" />
                  )}
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Birthdays</h2>
          
          <div className="space-y-3">
            {pastBirthdays.map(birthday => (
              <div key={birthday.id} className="bg-white rounded-lg p-4 shadow-sm flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={birthday.avatarUrl} alt={birthday.name} />
                  <AvatarFallback>{birthday.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{birthday.name}</p>
                  <p className="text-sm text-gray-500">{birthday.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default BirthdaysPage;
