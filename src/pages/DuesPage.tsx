
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";

const DuesPage = () => {
  const navigate = useNavigate();

  const duesInfo = {
    totalAmount: 300,
    dueDate: "January 6, 2024",
    isPaid: false,
    breakdown: [
      { name: "National Dues", amount: 150 },
      { name: "Chapter Dues", amount: 125 },
      { name: "Operations Fee", amount: 25 }
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayNow = () => {
    // Payment processing would go here
    console.log("Processing payment");
  };

  const handlePaymentPlan = () => {
    navigate("/payment-plan");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center px-6 py-4 bg-white">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Dues</h1>
      </header>

      <div className="flex-1 overflow-auto px-6 py-4 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 text-center">
          <h2 className="text-xl font-semibold mb-6">This Semester's Dues</h2>
          
          {duesInfo.isPaid ? (
            <div className="flex flex-col items-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
              <p className="text-green-600 font-medium">Paid in Full</p>
            </div>
          ) : (
            <div>
              <p className="text-5xl font-bold mb-1">${duesInfo.totalAmount}</p>
              <p className="text-gray-600 mb-8">Due by {duesInfo.dueDate}</p>
            </div>
          )}
          
          <div className="border-t border-b py-4 mb-6">
            <h3 className="font-medium mb-4 text-left">Breakdown</h3>
            {duesInfo.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span className="font-medium">${item.amount}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="font-bold">${duesInfo.totalAmount}</span>
            </div>
          </div>
          
          {!duesInfo.isPaid && (
            <>
              <Button 
                className="w-full bg-purple-900 hover:bg-purple-800 mb-3"
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
              
              <button 
                className="text-purple-700 font-medium"
                onClick={handlePaymentPlan}
              >
                Set Up Payment Plan
              </button>
            </>
          )}
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default DuesPage;
