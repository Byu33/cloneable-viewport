
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, QrCode, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";

interface Candidate {
  id: number;
  name: string;
  image: string;
}

const SisterPointsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const candidates: Candidate[] = [
    { id: 1, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    { id: 7, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    { id: 8, name: "Hannah B", image: "https://randomuser.me/api/portraits/women/8.jpg" },
  ];

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDialogOpen(true);
  };

  const handleGivePoints = () => {
    // Logic to give points
    setIsDialogOpen(false);
    // You could show a toast notification here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Sister Points</h1>
      </header>

      <div className="px-6 py-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search candidate's name"
            className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div 
          className="bg-purple-50 rounded-lg p-4 mb-6 flex items-center justify-between"
          onClick={() => navigate("/scan-qr")}
        >
          <div className="flex items-center">
            <div className="h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center mr-3">
              <QrCode className="h-6 w-6 text-purple-800" />
            </div>
            <div>
              <p className="font-medium text-purple-900">Scan QR Code</p>
              <p className="text-sm text-gray-600">Scan candidate's QR code to give points</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </div>

        <h2 className="text-xl font-semibold mb-4">Candidates</h2>
        <div className="space-y-2">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
              onClick={() => handleCandidateClick(candidate)}
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={candidate.image} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{candidate.name}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md mx-auto p-0 rounded-lg">
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">
              You are giving sister points to
            </h2>

            {selectedCandidate && (
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={selectedCandidate.image} alt={selectedCandidate.name} />
                  <AvatarFallback>{selectedCandidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">{selectedCandidate.name}</p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                className="w-28"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="w-28 bg-purple-900 hover:bg-purple-800"
                onClick={handleGivePoints}
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TabBar />
    </div>
  );
};

export default SisterPointsPage;
