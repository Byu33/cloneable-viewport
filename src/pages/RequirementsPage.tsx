
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import TabBar from "@/components/TabBar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Requirement {
  id: number;
  title: string;
  category: string;
  isComplete: boolean;
}

const RequirementsPage = () => {
  const navigate = useNavigate();
  const [isMetExpanded, setIsMetExpanded] = useState(false);
  const [isUnmetExpanded, setIsUnmetExpanded] = useState(true);

  const requirements: Requirement[] = [
    { id: 1, title: "Attend 1 Sisterhood Event", category: "Sisterhood", isComplete: false },
    { id: 2, title: "Attend 1 Professional Event", category: "Professional", isComplete: false },
    { id: 3, title: "Attend 1 Risk Event", category: "Risk", isComplete: false },
    { id: 4, title: "Attend 1 Risk Event", category: "Risk", isComplete: false },
    { id: 5, title: "Attend 1 Risk Event", category: "Risk", isComplete: false },
    { id: 6, title: "Attend 1 Risk Event", category: "Risk", isComplete: false },
    { id: 7, title: "Fulfill 1 sister hour", category: "Sisterhood", isComplete: false },
    { id: 8, title: "Attend Chapter Meeting", category: "Required", isComplete: true },
    { id: 9, title: "Pay Dues", category: "Finance", isComplete: true },
    { id: 10, title: "Complete Risk Form", category: "Risk", isComplete: true },
    { id: 11, title: "Attend Initiation", category: "Required", isComplete: true },
    { id: 12, title: "Complete Academic Form", category: "Academic", isComplete: true },
    { id: 13, title: "Attend Study Hours", category: "Academic", isComplete: true },
    { id: 14, title: "Complete Service Hours", category: "Service", isComplete: true },
  ];

  const metRequirements = requirements.filter(req => req.isComplete);
  const unmetRequirements = requirements.filter(req => !req.isComplete);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRequirementClick = (id: number) => {
    navigate(`/requirement/${id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Requirements</h1>
      </header>

      <div className="px-6 py-4 flex-1 overflow-auto pb-20">
        <Collapsible 
          open={isMetExpanded} 
          onOpenChange={setIsMetExpanded}
          className="mb-4"
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center py-3 text-left">
            <div className="flex items-center">
              <h2 className="text-xl font-medium">Met Requirements</h2>
              <div className="ml-2 h-6 w-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm">
                {metRequirements.length}
              </div>
            </div>
            {isMetExpanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-2 mt-2">
              {metRequirements.map(requirement => (
                <div 
                  key={requirement.id}
                  className="bg-purple-50 p-4 rounded-lg flex justify-between items-center"
                  onClick={() => handleRequirementClick(requirement.id)}
                >
                  <span className="text-purple-900 font-medium">{requirement.title}</span>
                  <ChevronRight className="h-5 w-5 text-purple-500" />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          open={isUnmetExpanded} 
          onOpenChange={setIsUnmetExpanded}
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center py-3 text-left">
            <div className="flex items-center">
              <h2 className="text-xl font-medium">Unmet Requirements</h2>
              <div className="ml-2 h-6 w-6 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm">
                {unmetRequirements.length}
              </div>
            </div>
            {isUnmetExpanded ? <ChevronUp /> : <ChevronDown />}
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-2 mt-2">
              {unmetRequirements.map(requirement => (
                <div 
                  key={requirement.id}
                  className="bg-purple-50 p-4 rounded-lg flex justify-between items-center"
                  onClick={() => handleRequirementClick(requirement.id)}
                >
                  <span className="text-purple-900 font-medium">{requirement.title}</span>
                  <ChevronRight className="h-5 w-5 text-purple-500" />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <TabBar />
    </div>
  );
};

export default RequirementsPage;
