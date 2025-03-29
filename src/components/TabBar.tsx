
import React from "react";
import { Home, Calendar, CheckSquare, MessageSquare, Menu } from "lucide-react";

const TabBar = () => {
  return (
    <div className="flex justify-around items-center p-3 border-t bg-white">
      <TabItem icon={<Home />} label="Home" />
      <TabItem icon={<Calendar />} label="Events" active />
      <TabItem icon={<CheckSquare />} label="To Do" />
      <TabItem icon={<MessageSquare />} label="To Do" />
      <TabItem icon={<Menu />} label="Other" />
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
    <button className="flex flex-col items-center">
      <div className={active ? "text-purple-900" : "text-gray-500"}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${active ? "text-purple-900" : "text-gray-500"}`}>
        {label}
      </span>
    </button>
  );
};

export default TabBar;
