
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, CalendarDays, DollarSign, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const DuesPage = () => {
  const navigate = useNavigate();

  const duesInfo = {
    total: 300,
    dueDate: "January 6, 2024",
    isPaid: false,
    breakdown: [
      { name: "National Dues", amount: 150 },
      { name: "Chapter Dues", amount: 125 },
      { name: "Administrative Fee", amount: 25 },
    ]
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayNow = () => {
    navigate("/payment");
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

      <div className="px-6 py-4 flex-1 overflow-auto">
        <Card className="mb-6 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-between items-center">
              <span>Total Dues</span>
              {duesInfo.isPaid && (
                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Paid
                </span>
              )}
            </CardTitle>
            <CardDescription>For the Spring 2024 semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-5xl font-bold mb-1">${duesInfo.total}</p>
              <div className="flex items-center justify-center text-gray-600">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>Due by {duesInfo.dueDate}</span>
              </div>
            </div>

            <div className="space-y-3">
              {duesInfo.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="font-medium">${item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
          {!duesInfo.isPaid && (
            <CardFooter className="flex flex-col gap-2">
              <Button 
                className="w-full bg-purple-900 hover:bg-purple-800"
                onClick={handlePayNow}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
              <Button 
                variant="outline"
                className="w-full text-purple-700 border-purple-300"
                onClick={handlePaymentPlan}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Setup Payment Plan
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              We accept credit cards, debit cards, and bank transfers. All payments are securely processed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DuesPage;
