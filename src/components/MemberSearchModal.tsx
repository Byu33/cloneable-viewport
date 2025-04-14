
import React, { useState, useEffect } from "react";
import { X, Search, CheckCircle, Check } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Member {
  id: number;
  name: string;
  avatar?: string;
  role?: string;
  selected?: boolean;
}

interface MemberSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMembersSelected: (members: Member[]) => void;
  selectedMembers?: Member[];
  title?: string;
}

const MemberSearchModal = ({
  open,
  onOpenChange,
  onMembersSelected,
  selectedMembers = [],
  title = "Add Assignees"
}: MemberSearchModalProps) => {
  // Mock data for members
  const allMembers: Member[] = [
    { id: 1, name: "Hannah B", avatar: "https://randomuser.me/api/portraits/women/28.jpg", role: "President" },
    { id: 2, name: "Aparna P", avatar: "https://randomuser.me/api/portraits/women/32.jpg", role: "Vice President" },
    { id: 3, name: "Esther S", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    { id: 4, name: "Mooshoo C", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 5, name: "Lisa R", avatar: "https://randomuser.me/api/portraits/women/54.jpg" },
    { id: 6, name: "Jennifer K", avatar: "https://randomuser.me/api/portraits/women/76.jpg", role: "Secretary" },
    { id: 7, name: "Maya L", avatar: "https://randomuser.me/api/portraits/women/89.jpg" },
    { id: 8, name: "Taylor S", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: 9, name: "Emma W", avatar: "https://randomuser.me/api/portraits/women/24.jpg", role: "Treasurer" },
    { id: 10, name: "Sophie T", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
  ];

  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Member[]>([]);

  useEffect(() => {
    // Initialize members with selectedMembers marked as selected
    const initialMembers = allMembers.map(member => {
      const isSelected = selectedMembers.some(selected => selected.id === member.id);
      return { ...member, selected: isSelected };
    });
    
    setMembers(initialMembers);
    setSelected(selectedMembers);
  }, [selectedMembers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleMember = (member: Member) => {
    // Toggle member selection
    const updatedMembers = members.map(m => {
      if (m.id === member.id) {
        return { ...m, selected: !m.selected };
      }
      return m;
    });
    
    setMembers(updatedMembers);
    
    // Update selected members list
    const updatedSelected = updatedMembers.filter(m => m.selected);
    setSelected(updatedSelected);
  };

  const handleDone = () => {
    onMembersSelected(selected);
    onOpenChange(false);
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group members by first letter of name
  const groupedMembers = filteredMembers.reduce((groups, member) => {
    const firstLetter = member.name[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(member);
    return groups;
  }, {} as Record<string, Member[]>);

  // Sort the keys alphabetically
  const sortedKeys = Object.keys(groupedMembers).sort();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md h-[90vh] flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogClose className="rounded-full focus:outline-none">
              <X className="h-6 w-6" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="p-4 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search members..."
              className="pl-10 pr-4 py-3 rounded-full border border-gray-300 bg-white"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          {selected.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Selected</h3>
              <div className="flex flex-wrap gap-2">
                {selected.map(member => (
                  <Badge key={member.id} variant="outline" className="flex items-center gap-1 p-1 pr-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                    <button 
                      onClick={() => toggleMember(member)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {sortedKeys.length > 0 ? (
            sortedKeys.map(letter => (
              <div key={letter} className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{letter}</h3>
                <div className="space-y-1">
                  {groupedMembers[letter].map(member => (
                    <div 
                      key={member.id}
                      onClick={() => toggleMember(member)}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          {member.role && <p className="text-xs text-gray-500">{member.role}</p>}
                        </div>
                      </div>
                      {member.selected && <Check className="h-5 w-5 text-purple-600" />}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              No members found matching "{searchTerm}"
            </div>
          )}
        </div>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            className="w-full bg-purple-700 hover:bg-purple-800 text-white"
            onClick={handleDone}
            disabled={selected.length === 0}
          >
            Done ({selected.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberSearchModal;
