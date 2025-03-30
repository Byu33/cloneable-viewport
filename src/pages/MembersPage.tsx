
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";

const MembersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const members = [
    { name: "Emma Johnson", role: "President", avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    { name: "Olivia Davis", role: "Vice President", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
    { name: "Sophia Martinez", role: "Treasurer", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { name: "Ava Wilson", role: "Secretary", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { name: "Isabella Thompson", role: "Member", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" },
    { name: "Mia Garcia", role: "Member", avatarUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" },
    { name: "Charlotte Rodriguez", role: "Member", avatarUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
    { name: "Amelia Lewis", role: "Member", avatarUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" }
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Members</h1>
      </header>

      <div className="px-6 py-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search members..."
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="px-6 flex-1 overflow-auto pb-20">
        <div className="space-y-3">
          {filteredMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 flex items-center shadow-sm"
              onClick={() => navigate(`/member/${member.name.replace(/\s+/g, '-').toLowerCase()}`)}
            >
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No members found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default MembersPage;
