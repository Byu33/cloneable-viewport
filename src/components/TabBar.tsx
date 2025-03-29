
import React from "react";
import { Home, Calendar, ClipboardList, MessageSquare, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEventsActive = location.pathname === "/" || location.pathname === "/explore";

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-around items-center py-3 px-6 border-t bg-white font-figtree">
      <TabItem 
        icon={<Home className="w-5 h-5" />} 
        label="Home" 
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
        onClick={() => handleNavigation("/todo")} 
      />
      <TabItem 
        icon={<MessageSquare className="w-5 h-5" />} 
        label="Chat" 
        onClick={() => handleNavigation("/chat")} 
      />
      <TabItem 
        icon={<Menu className="w-5 h-5" />} 
        label="Other" 
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
      <div className={`mb-1 ${active ? "text-purple-900" : "text-gray-500"}`}>
        {icon}
      </div>
      <span className={active ? "text-purple-900" : "text-gray-500"}>
        {label}
      </span>
    </button>
  );
};

export default TabBar;
