
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const CreateEventLogisticsPage = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState("");
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const handlePrevious = () => {
    navigate("/create-event/details");
  };

  const handlePreview = () => {
    // For now, just go back to your-events page when preview is clicked
    // In a real app, this would show a preview of the event
    navigate("/your-events");
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setCustomQuestions([...customQuestions, newQuestion]);
      setNewQuestion("");
      setShowAddQuestion(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-sm text-gray-600">Page 3 of 3</h1>
        <button onClick={() => navigate("/your-events")}>
          <X className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 px-6 py-4 overflow-auto pb-24">
        <div className="space-y-6">
          {/* Budget */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Budget</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                type="number"
                placeholder=""
                className="bg-gray-50 pl-8"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Logistics */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Logistics</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                <Checkbox id="limit-attendees" className="mt-1" />
                <label
                  htmlFor="limit-attendees"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Would you like to limit the number of attendees?
                </label>
              </div>

              <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                <Checkbox id="automatic-reminders" className="mt-1" />
                <label
                  htmlFor="automatic-reminders"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Do you want automatic reminders sent to attendees?
                </label>
              </div>

              <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                <Checkbox id="allow-plus-ones" className="mt-1" />
                <label
                  htmlFor="allow-plus-ones"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Should guests be allowed to bring +1s?
                </label>
              </div>

              <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                <Checkbox id="food-allergies" className="mt-1" />
                <label
                  htmlFor="food-allergies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Would you like to ask attendees about food allergies or meal preferences?
                </label>
              </div>

              <div className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                <Checkbox id="waiting-list" className="mt-1" />
                <label
                  htmlFor="waiting-list"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Do you want to allow a waiting list if the event is full?
                </label>
              </div>

              {/* Custom Questions */}
              {customQuestions.map((question, index) => (
                <div key={index} className="flex items-start space-x-2 rounded-md bg-gray-50 p-4">
                  <Checkbox id={`custom-question-${index}`} className="mt-1" />
                  <label
                    htmlFor={`custom-question-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {question}
                  </label>
                </div>
              ))}

              {/* Add a Question */}
              {showAddQuestion ? (
                <div className="mt-2 space-y-2">
                  <Input
                    type="text"
                    placeholder="Type your question here"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAddQuestion(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={addQuestion}>
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  className="flex items-center text-purple-700 font-medium mt-4"
                  onClick={() => setShowAddQuestion(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add a question for participants
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white flex justify-between items-center">
        <Button variant="outline" className="px-4" onClick={handlePrevious}>
          Previous
        </Button>

        <Button
          className="bg-purple-700 hover:bg-purple-800 text-white px-6"
          onClick={handlePreview}
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default CreateEventLogisticsPage;
