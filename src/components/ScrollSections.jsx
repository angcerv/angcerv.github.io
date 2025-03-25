import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import Introduction from './sections/Introduction';
import Technologies from './sections/Technologies';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import AboutMe from './sections/AboutMe';
import Sidebar from "./sidebar/Sidebar";
import MobileMenu from "./mobileMenu/MobileMenu";
import useScrollNavigation from '../hooks/useScrollNavigation';

const ScrollSections = () => {
  const sectionIds = ["introduction", "technologies", "projects", "experience", "about"];

  const {
    activeTab,
    visibleSections,
    showMenu,
    setShowMenu,
    scrollToSection,
  } = useScrollNavigation(sectionIds);

  return (
    <div className="flex max-w-full">
      {/* Botón de menú para móviles */}
      <div className="md:hidden fixed top-10 right-7 bg-gray-900 p-3 rounded-lg z-50 shadow-lg">
        <button onClick={() => setShowMenu(!showMenu)}>
          <FaBars className="text-white text-2xl" />
        </button>
      </div>

      <Sidebar activeTab={activeTab} scrollToSection={scrollToSection} sectionIds={sectionIds} />

      <MobileMenu 
        showMenu={showMenu} 
        setShowMenu={setShowMenu} 
        scrollToSection={scrollToSection} 
        sectionIds={sectionIds} 
      />

      {/* Contenido principal */}
      <div className="mr-0 md:mr-20 p-4 md:p-8 w-full">
        {/* Introduction */}
        <motion.section
          id="introduction"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Introduction />
        </motion.section>

        {/* Technologies */}
        <motion.section
          id="technologies"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.technologies ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <hr className="border-t border-gray-500 mt-4 mb-10 sm:mb-20" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies</h2>
          <Technologies />
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={visibleSections.projects ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <hr className="border-t border-gray-500 mt-4 mb-10 sm:mb-20" />
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
          <hr className="border-t border-gray-500 my-4 mb-10 sm:mb-20" />
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
          <hr className="border-t border-gray-500 my-4 mb-10 sm:mb-20" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <AboutMe />
        </motion.section>
      </div>
    </div>
  );
};

export default ScrollSections;
