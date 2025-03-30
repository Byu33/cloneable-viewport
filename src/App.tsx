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
import EventPreviewPage from "./pages/EventPreviewPage";
import EventAttendancePage from "./pages/EventAttendancePage";
import EditEventPage from "./pages/EditEventPage";
import HomePage from "./pages/HomePage";
import ToDoPage from "./pages/ToDoPage";
import SisterPointsPage from "./pages/SisterPointsPage"; 
import RequirementsPage from "./pages/RequirementsPage";
import OtherPage from "./pages/OtherPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import TaskDetailPage from "./pages/TaskDetailPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import DuesPage from "./pages/DuesPage";

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
          <Route path="/event-preview" element={<EventPreviewPage />} />
          <Route path="/event-attendance/:id" element={<EventAttendancePage />} />
          <Route path="/edit-event/:id" element={<EditEventPage />} />
          
          <Route path="/home" element={<HomePage />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
          
          <Route path="/sister-points" element={<SisterPointsPage />} />
          <Route path="/requirements" element={<RequirementsPage />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dues" element={<DuesPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
