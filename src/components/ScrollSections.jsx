import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTools, FaProjectDiagram, FaUserAlt, FaBriefcase, FaInfoCircle, FaBars } from "react-icons/fa";
import Introduction from './Introduction';
import Technologies from './Technologies';
import Projects from './Projects';
import Experience from './Experience';
import AboutMe from './AboutMe';

const ScrollSections = () => {
  const [activeTab, setActiveTab] = useState("introduction");
  const [visibleSections, setVisibleSections] = useState({
    introduction: true,
    technologies: false,
    projects: false,
    experience: false,
    about: false,
  });
  const [showMenu, setShowMenu] = useState(false); // Estado del menú en móviles

  const sectionIds = ["introduction", "technologies", "projects", "experience", "about"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;

          if (top < windowHeight * 0.75) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }

          if (scrollPosition >= section.offsetTop - windowHeight / 3) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setShowMenu(false); // Cerrar menú en móviles
    }
  };

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
    <div className="flex">
      {/* Botón de menú para móviles */}
      <div className="md:hidden fixed top-5 right-5 bg-gray-900 p-3 rounded-lg z-50 shadow-lg">
        <button onClick={() => setShowMenu(!showMenu)}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>

      {/* Sidebar para escritorio */}
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

      {/* Menú lateral en móviles */}
      {showMenu && (
        <div className="fixed top-0 right-0 w-48 h-full bg-gray-900 text-white flex flex-col items-center py-8 z-50">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="w-full py-3 text-center hover:bg-teal-500"
            >
              {labels[id]}
            </button>
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="mr-0 md:mr-20 p-4 md:p-8 w-full">
        {/* Introduction */}
        <motion.section
          id="introduction"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Introduction />
        </motion.section>

        {/* Technologies */}
        <motion.section
          id="technologies"
          className="mb-20 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.technologies ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies</h2>
          <Technologies />
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          className="mb-20 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.projects ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <hr className="border-t border-gray-500 my-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <Projects />
        </motion.section>

        {/* Experience */}
        <motion.section
          id="experience"
          className="mb-20 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.experience ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <hr className="border-t border-gray-500 my-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <Experience />
        </motion.section>

        {/* About Me */}
        <motion.section
          id="about"
          className="mb-20 mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.about ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <hr className="border-t border-gray-500 my-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <AboutMe />
        </motion.section>
      </div>
    </div>
  );
};

export default ScrollSections;
