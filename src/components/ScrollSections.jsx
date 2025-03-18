import React, { useState, useEffect } from "react";
import { FaTools, FaProjectDiagram, FaUserAlt, FaBriefcase, FaInfoCircle } from "react-icons/fa";
import Introduction from './Introduction';
import Technologies from './Technologies';
import Projects from './Projects';
import Experience from './Experience';
import AboutMe from './AboutMe';

const ScrollSections = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  const sectionIds = ["introduction", "technologies", "projects", "experience", "about"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight; // Altura de la ventana visible
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
  
          // Calcula el umbral en el tercio superior de la pantalla
          const sectionTopThreshold = top - windowHeight / 3;
  
          // Si el scroll está dentro del rango del tercio superior de la sección
          if (scrollPosition >= sectionTopThreshold && scrollPosition < sectionTopThreshold + height) {
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
      {/* Barra lateral */}
      <div className="fixed top-30 right-3 w-16 h-full bg-gray-900 text-white flex flex-col items-center py-8 overflow-visible">
        {sectionIds.map((id) => (
          <div key={id} className="relative group">
            {/* Botón */}
            <button
              onClick={() => scrollToSection(id)}
              className={`w-12 h-12 mb-8 rounded-full flex justify-center items-center cursor-pointer transition-colors relative z-10 ${
                activeTab === id ? "bg-teal-500" : "bg-gray-700 hover:bg-teal-500"
              }`}
            >
              <span className="text-xl">{icons[id]}</span>
            </button>

            {/* Tooltip - Ahora sale a la izquierda */}
            <div className="cursor-default absolute top-1/2 right-full mr-3 -translate-y-1/2 bg-gray-800 text-white text-sm select-none px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              {labels[id]}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="mr-20 p-8 w-full">
        <section id="introduction" className="mb-14">
          <Introduction />
        </section>
        <section id="technologies" className="mb-14 mt-14">
          <h2 className="text-4xl font-bold mb-4">Technologies</h2>
          <Technologies />
        </section>
        <hr className="border-t border-gray-500 my-4" />
        <section id="projects" className="mb-14 mt-14">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <Projects />
        </section>
        <hr className="border-t border-gray-500 my-4" />
        <section id="experience" className="mb-14">
          <h2 className="text-4xl font-bold mb-4 mt-14">Experience</h2>
          <Experience />
        </section>
        <hr className="border-t border-gray-500 my-4" />
        <section id="about" className="mb-20 mt-14">
        <h2 className="text-4xl font-bold mb-4 mt-14">About Me</h2>
          <AboutMe />
        </section>
      </div>
    </div>
  );
};

export default ScrollSections;
