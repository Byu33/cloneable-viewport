
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabBar from "@/components/TabBar";

interface Member {
  id: number;
  name: string;
  position?: string;
  graduationYear?: string;
  avatarUrl?: string;
  avatarFallback: string;
  pledgeClass?: string;
}

const MembersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const members: Member[] = [
    {
      id: 1,
      name: "Bella Yu",
      position: "Marketing VP",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      avatarFallback: "BY",
      pledgeClass: "Sigma '21"
    },
    {
      id: 2,
      name: "Emma Thompson",
      position: "President",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
      avatarFallback: "ET",
      pledgeClass: "Sigma '21"
    },
    {
      id: 3,
      name: "Sophia Martinez",
      position: "Treasurer",
      graduationYear: "2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/26.jpg",
      avatarFallback: "SM",
      pledgeClass: "Sigma '22"
    },
    {
      id: 4,
      name: "Isabella Wilson",
      position: "Member",
      graduationYear: "2025",
      avatarUrl: "https://randomuser.me/api/portraits/women/29.jpg",
      avatarFallback: "IW",
      pledgeClass: "Sigma '22"
    },
    {
      id: 5,
      name: "Olivia Garcia",
      position: "Recruitment Chair",
      graduationYear: "2024",
      avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      avatarFallback: "OG",
      pledgeClass: "Sigma '21"
    },
    {
      id: 6,
      name: "Ava Rodriguez",
      position: "Member",
      graduationYear: "2026",
      avatarUrl: "https://randomuser.me/api/portraits/women/39.jpg",
      avatarFallback: "AR",
      pledgeClass: "Sigma '23"
    },
    {
      id: 7,
      name: "Mia Lewis",
      position: "Member",
      graduationYear: "2026",
      avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
      avatarFallback: "ML",
      pledgeClass: "Sigma '23"
    }
  ];

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (member.pledgeClass && member.pledgeClass.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleMemberClick = (memberId: number) => {
    // Navigate to member profile or display more info
    console.log(`Clicked on member ${memberId}`);
  };

  const handleFilter = () => {
    // Filter functionality
    console.log("Opening filter options");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Members</h1>
      </header>

      <div className="px-6 py-4">
        <div className="relative">
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

      <div className="px-6 flex justify-between items-center mb-4">
        <button className="text-purple-700 font-medium flex items-center">
          <Plus className="w-5 h-5 mr-1" />
          Add New Member
        </button>
        
        <button 
          className="p-2 bg-gray-100 rounded-full"
          onClick={handleFilter}
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-6 pb-20">
        <div className="space-y-3">
          {filteredMembers.map(member => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg p-4 shadow-sm"
              onClick={() => handleMemberClick(member.id)}
            >
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <div className="flex text-sm text-gray-500">
                    {member.position && <p className="mr-2">{member.position}</p>}
                    {member.pledgeClass && <p>• {member.pledgeClass}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default MembersPage;
