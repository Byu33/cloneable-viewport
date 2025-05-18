
import React from "react";
import { Home, Calendar, ClipboardList, MessageSquare, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeActive = location.pathname === "/home";
  const isEventsActive = location.pathname === "/" || 
                          location.pathname === "/explore" || 
                          location.pathname === "/your-events";
  const isToDoActive = location.pathname === "/todo";
  const isChatsActive = location.pathname === "/chat";
  const isOtherActive = location.pathname === "/other";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-around items-center py-3 px-6 border-t bg-white font-figtree fixed bottom-0 left-0 right-0 z-20 shadow-sm">
      <TabItem 
        icon={<Home className="w-5 h-5" />} 
        label="Home" 
        active={isHomeActive}
        onClick={() => handleNavigation("/home")} 
      />
      <TabItem 
        icon={<Calendar className="w-5 h-5" />} 
        label="Events" 
        active={isEventsActive}
        onClick={() => handleNavigation("/")} 
      />
      <TabItem 
        icon={<ClipboardList className="w-5 h-5" />} 
        label="To Do" 
        active={isToDoActive}
        onClick={() => handleNavigation("/todo")} 
      />
      <TabItem 
        icon={<MessageSquare className="w-5 h-5" />} 
        label="Chat" 
        active={isChatsActive}
        onClick={() => handleNavigation("/chat")} 
      />
      <TabItem 
        icon={<Menu className="w-5 h-5" />} 
        label="Other" 
        active={isOtherActive}
        onClick={() => handleNavigation("/other")} 
      />
    </div>
  );
};

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button className="flex flex-col items-center text-xs" onClick={onClick}>
      <div className={`mb-1 ${active ? "text-brand-purple" : "text-gray-500"}`}>
        {icon}
      </div>
      <span className={active ? "text-brand-purple font-medium" : "text-gray-500"}>
        {label}
      </span>
    </button>
  );
};

export default TabBar;
