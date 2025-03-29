
import React from "react";
import { Home, Calendar, ClipboardList, MessageSquare, Menu } from "lucide-react";

const TabBar = () => {
  return (
    <div className="flex justify-around items-center py-3 px-6 border-t bg-white">
      <TabItem icon={<Home className="w-5 h-5" />} label="Home" />
      <TabItem icon={<Calendar className="w-5 h-5" />} label="Events" active />
      <TabItem icon={<ClipboardList className="w-5 h-5" />} label="To Do" />
      <TabItem icon={<MessageSquare className="w-5 h-5" />} label="Chat" />
      <TabItem icon={<Menu className="w-5 h-5" />} label="Other" />
    </div>
  );
};

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, active }) => {
  return (
    <button className="flex flex-col items-center text-xs">
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
