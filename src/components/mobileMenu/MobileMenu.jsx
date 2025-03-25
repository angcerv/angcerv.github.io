import React from "react";
import { motion } from "framer-motion";

const MobileMenu = ({ showMenu, setShowMenu, scrollToSection, sectionIds }) => {
  const labels = {
    introduction: "Introduction",
    technologies: "Technologies",
    projects: "Projects",
    experience: "Experience",
    about: "About Me",
  };

  if (!showMenu) return null; // No renderiza nada si el menú está oculto

  return (
    <motion.div
    initial={{ x: "100%", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: "100%", opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="fixed top-0 right-0 w-48 h-full bg-gray-900 text-white flex flex-col items-center py-8 z-50 shadow-lg max-w-full overflow-hidden"
   >
      {/* Botón para cerrar el menú */}
      <button 
        onClick={() => setShowMenu(false)} 
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✖
      </button>

      {/* Opciones del menú */}
      <div className="mt-10 w-full">
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
    </motion.div>
  );
};

export default MobileMenu;
