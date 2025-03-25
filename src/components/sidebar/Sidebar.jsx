import React from "react";
import { FaInfoCircle, FaTools, FaProjectDiagram, FaBriefcase, FaUserAlt } from "react-icons/fa";
import NavButton from "../buttons/NavButton"; // Importamos el componente NavButton

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
        <NavButton
          key={id}
          id={id}
          label={labels[id]}
          icon={icons[id]}
          isActive={activeTab === id} // Cambia el color cuando el tab está activo
          scrollToSection={scrollToSection} // Pasa la función para hacer scroll
        />
      ))}
    </div>
  );
};

export default Sidebar;
