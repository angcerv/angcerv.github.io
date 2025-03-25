import React from "react";
import { FaInfoCircle, FaTools, FaProjectDiagram, FaBriefcase, FaUserAlt } from "react-icons/fa";

const Sidebar = ({ activeTab, scrollToSection, sectionIds }) => {
  const icons = {
    introduction: <FaInfoCircle />,
    technologies: <FaTools />,
    projects: <FaProjectDiagram />,
    experience: <FaBriefcase />,
    about: <FaUserAlt />,
  };

  const labels = {
    introduction: "Introduction",
    technologies: "Technologies",
    projects: "Projects",
    experience: "Experience",
    about: "About Me",
  };

  return (
    <div className="hidden md:flex fixed top-30 right-3 w-16 h-full bg-gray-900 text-white flex-col items-center py-8">
      {sectionIds.map((id) => (
        <div key={id} className="relative group">
          <button
            onClick={() => scrollToSection(id)}
            className={`w-12 h-12 mb-8 rounded-full flex justify-center items-center cursor-pointer transition-all relative z-10 ${
              activeTab === id ? "bg-teal-500" : "bg-gray-700 hover:bg-teal-500"
            }`}
          >
            <span className="text-xl">{icons[id]}</span>
          </button>
          <div className="absolute top-1/2 right-full mr-3 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            {labels[id]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
