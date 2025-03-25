import React from "react";

const NavButton = ({ id, label, icon, isActive, scrollToSection }) => {
  return (
    <div className="relative group">
      <button
        onClick={() => scrollToSection(id)}
        className={`w-12 h-12 mb-8 rounded-full flex justify-center items-center cursor-pointer transition-all relative z-10 ${
          isActive ? "bg-teal-500" : "bg-gray-700 hover:bg-teal-500"
        }`}
      >
        <span className="text-xl">{icon}</span>
      </button>
      <div className="absolute top-1/2 right-full mr-3 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        {label}
      </div>
    </div>
  );
};

export default NavButton;
