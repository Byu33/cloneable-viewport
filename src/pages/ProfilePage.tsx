
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    // Logout logic
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </div>
        <button onClick={handleEditProfile}>
          <Edit className="w-5 h-5" />
        </button>
      </header>

      <div className="px-6 py-8 flex-1 overflow-auto pb-20">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Bella Yu" />
            <AvatarFallback>BY</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-1">Bella Yu</h2>
          <p className="text-gray-600">Marketing VP</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>bellayu@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>(123) 456-7890</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Birth Date</p>
              <p>January 15, 1998</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Membership Information</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Big Sister</p>
              <p>Emma Thompson</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pledge Class</p>
              <p>Sigma '21</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Graduation Year</p>
              <p>2024</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-900 text-2xl font-bold">42</p>
              <p className="text-sm text-gray-600">Points</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-900 text-2xl font-bold">12</p>
              <p className="text-sm text-gray-600">Events</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-purple-900 text-2xl font-bold">7/14</p>
              <p className="text-sm text-gray-600">Requirements</p>
            </div>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-gray-700 mb-4"
          onClick={() => navigate("/settings")}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-red-600 border-red-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>

      <TabBar />
    </div>
  );
};

export default ProfilePage;
