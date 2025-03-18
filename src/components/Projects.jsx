import { FaHtml5, FaCss3Alt, FaNodeJs, FaReact, FaDatabase } from "react-icons/fa";
import { SiElectron } from "react-icons/si";  // Icono para Electron

const ProjectCard = ({ title, description, techs, image }) => {
  // Mapeo de iconos para las tecnologías
  const techIcons = {
    ElectronJS: <SiElectron className="text-teal-400" />,
    MongoDB: <FaDatabase className="text-green-700" />,
    HTML: <FaHtml5 className="text-orange-500" />,
    CSS: <FaCss3Alt className="text-blue-500" />,
    React: <FaReact className="text-blue-500" />,
    NodeJS: <FaNodeJs className="text-green-600" />
  };

  return (
    <div className="relative w-full h-80 perspective group rounded-xl  border-1 border-teal-800"> {/* Agregamos el grupo para el hover */}
      {/* Imagen de fondo dinámica */}
      <div
        className="absolute inset-0 w-full h-full rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}  // Usando la imagen pasada como prop
      ></div>

      {/* Fondo semi-transparente para el recuadro */}
      <div className="absolute inset-0 w-full h-full flex justify-center items-end">
        <div className="bg-teal-900 bg-opacity-70 p-4 w-full rounded-b-xl"> {/* Aquí se añade el borde en hover */}
          {/* Título y Descripción del Proyecto */}
          <div className="text-white">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm mb-3">{description}</p>
            <div className="flex space-x-2">
              {/* Mostramos los iconos de las tecnologías */}
              {techs.map((tech) => techIcons[tech])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Projects = () => {
  const projects = [
    { 
      title: "WriteWay", 
      description: "Desktop application for writers designed to write and plan novels and collaborate with other authors.", 
      techs: ["ElectronJS", "MongoDB", "NodeJS"], 
      image: "/assets/writeway_1.png"  // Ruta de la imagen de fondo para este proyecto
    },
  ];

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-gray-800 mt-2 mb-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 justify-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techs={project.techs}
              image={project.image}  // Pasando la imagen como propiedad
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
