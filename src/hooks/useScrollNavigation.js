import { useState, useEffect } from "react";

const useScrollNavigation = (sectionIds) => {
  const [activeTab, setActiveTab] = useState(sectionIds[0]); // Establece la primera sección como activa por defecto
  const [visibleSections, setVisibleSections] = useState(
    sectionIds.reduce((acc, id) => ({ ...acc, [id]: false }), {})
  );
  const [showMenu, setShowMenu] = useState(false);

  // Maneja el seguimiento del scroll y la visibilidad de las secciones
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;

          // Sección visible
          if (top < windowHeight * 0.75) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }

          // Sección activa
          if (scrollPosition >= section.offsetTop - windowHeight / 3) {
            setActiveTab(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  // Scroll suave a la sección
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setShowMenu(false); // Cerrar menú en móviles
    }
  };

  return {
    activeTab,
    visibleSections,
    showMenu,
    setShowMenu,
    scrollToSection,
  };
};

export default useScrollNavigation;
