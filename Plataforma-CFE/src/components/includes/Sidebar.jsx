import React from "react";
import sidebarConfig from "../../data/sidebarConfig";
import cfe2Image from "../../public/cfe2.png"; // Import the image

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-emerald-600 text-white w-64">
      <div className="p-4 flex items-center justify-center bg-emerald-700">
        <img src={cfe2Image} alt="My App" className="w-full h-auto" />
      </div>
      <nav className="flex-1 p-4">
        {sidebarConfig.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center p-2 my-2 rounded-lg transition-colors duration-200 hover:bg-emerald-800"
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
