
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Member {
  id: number;
  name: string;
  avatar?: string;
  initials: string;
  role?: string;
  selected?: boolean;
}

interface MemberSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMembers: (members: Member[]) => void;
  selectedMembers?: Member[];
}

const MemberSearchModal: React.FC<MemberSearchModalProps> = ({
  open,
  onOpenChange,
  onSelectMembers,
  selectedMembers = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Esther Smith",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      initials: "ES",
      role: "President",
      selected: selectedMembers.some(m => m.id === 1)
    },
    {
      id: 2,
      name: "Aparna Patel",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      initials: "AP",
      role: "VP Membership",
      selected: selectedMembers.some(m => m.id === 2)
    },
    {
      id: 3,
      name: "Hannah Brown",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      initials: "HB",
      role: "Member",
      selected: selectedMembers.some(m => m.id === 3)
    },
    {
      id: 4,
      name: "Mooshoo Craddock",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      initials: "MC",
      role: "Treasurer",
      selected: selectedMembers.some(m => m.id === 4)
    },
    {
      id: 5,
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      initials: "ET",
      role: "Secretary",
      selected: selectedMembers.some(m => m.id === 5)
    },
    {
      id: 6,
      name: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/26.jpg",
      initials: "SM",
      role: "Member",
      selected: selectedMembers.some(m => m.id === 6)
    },
    {
      id: 7,
      name: "Isabella Wilson",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
      initials: "IW",
      role: "Member",
      selected: selectedMembers.some(m => m.id === 7)
    }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleMemberSelection = (id: number) => {
    setMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === id 
          ? { ...member, selected: !member.selected } 
          : member
      )
    );
  };

  const handleDone = () => {
    const selectedMems = members.filter(member => member.selected);
    onSelectMembers(selectedMems);
    onOpenChange(false);
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.role && member.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg">Assign to Members</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="p-4">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="max-h-[300px] overflow-y-auto space-y-3">
            {filteredMembers.map(member => (
              <div 
                key={member.id} 
                className={`flex items-center justify-between p-2 rounded-lg ${member.selected ? 'bg-purple-50' : ''}`}
                onClick={() => toggleMemberSelection(member.id)}
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    {member.role && <p className="text-sm text-gray-500">{member.role}</p>}
                  </div>
                </div>
                <div 
                  className={`h-5 w-5 rounded-sm flex items-center justify-center ${
                    member.selected 
                      ? 'bg-purple-600 text-white' 
                      : 'border border-gray-300'
                  }`}
                >
                  {member.selected && <CheckCircle className="h-4 w-4" />}
                </div>
              </div>
            ))}
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No members found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            className="w-full bg-purple-700 hover:bg-purple-800"
            onClick={handleDone}
          >
            Assign {members.filter(m => m.selected).length} members
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberSearchModal;
