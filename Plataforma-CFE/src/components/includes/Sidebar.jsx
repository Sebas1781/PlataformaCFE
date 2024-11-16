import React from "react";
import sidebarConfig from "../../data/sidebarConfig"; 

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white w-64">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-lg font-bold">My App</h1>
      </div>
      <nav className="flex-1 p-4">
        {sidebarConfig.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center p-2 my-2 rounded-lg transition-colors duration-200 hover:bg-gray-700"
          >
            <span className="mr-3 text-lg">{<item.icon />}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="p-4">
        <p className="text-sm text-center text-gray-400">© 2024 My App</p>
      </div>
    </div>
  );
};

export default Sidebar;
