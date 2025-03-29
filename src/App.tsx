
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import YourEvents from "./pages/YourEvents";
import EventDetails from "./pages/EventDetails";
import SignUpPage from "./pages/SignUpPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateEventDetailsPage from "./pages/CreateEventDetailsPage";
import CreateEventLogisticsPage from "./pages/CreateEventLogisticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/your-events" element={<YourEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/signup/:id" element={<SignUpPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/create-event/details" element={<CreateEventDetailsPage />} />
          <Route path="/create-event/logistics" element={<CreateEventLogisticsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
