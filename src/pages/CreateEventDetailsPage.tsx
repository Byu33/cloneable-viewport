
import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const CreateEventDetailsPage = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePrevious = () => {
    navigate("/create-event");
  };

  const handleNext = () => {
    // Navigate to the logistics page
    navigate("/create-event/logistics");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm text-gray-600">Page 2 of 3</h1>
          <button onClick={() => navigate("/your-events")}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <Progress value={66.66} className="w-full" />
      </header>

      <div className="flex-1 px-6 py-4 overflow-auto pb-24">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">What is this event about?</h1>
        
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Image (optional)
            </label>
            <div 
              className={`border border-dashed rounded-md p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer ${
                previewUrl ? 'border-transparent' : 'border-gray-300'
              }`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Event preview" 
                  className="max-h-40 object-contain"
                />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-purple-600 text-center">File accepted: png, jpg</p>
                </>
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-gray-700 font-medium">
              Description (optional)
            </label>
            <Textarea
              id="description"
              placeholder="Lorem ipsum blah blah blah"
              className="bg-gray-50 min-h-[160px]"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white flex justify-between items-center">
        <Button 
          variant="outline" 
          className="px-4"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        
        <button 
          className="text-gray-500 font-medium"
          onClick={() => navigate("/your-events")}
        >
          Skip
        </button>
        
        <Button 
          className="bg-purple-700 hover:bg-purple-800 text-white px-6"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateEventDetailsPage;
