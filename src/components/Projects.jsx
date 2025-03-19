import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaReact, FaDatabase, FaGithub } from "react-icons/fa";
import { SiElectron } from "react-icons/si";

const ProjectCard = ({ title, description, techs, image, githubLink, index }) => {
  const techIcons = {
    ElectronJS: <SiElectron className="text-teal-400" />,
    MongoDB: <FaDatabase className="text-green-700" />,
    HTML: <FaHtml5 className="text-orange-500" />,
    CSS: <FaCss3Alt className="text-blue-500" />,
    React: <FaReact className="text-blue-500" />,
    NodeJS: <FaNodeJs className="text-green-600" />,
  };

  return (
    <motion.div
      className="relative w-full h-auto min-h-80 sm:h-96 rounded-xl border border-teal-700 shadow-lg overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 group-hover:opacity-90"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="absolute inset-0 w-full h-full flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-gray-900 via-gray-800/80 to-transparent">
        <h3 className="text-lg sm:text-xl font-semibold text-teal-400">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">{description}</p>

        <div className="flex items-center">
          <div className="flex space-x-3">
            {techs.map((tech, index) => (
              <span key={tech + index} className="text-lg">
                {techIcons[tech]}
              </span>
            ))}
          </div>

          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-500"
              whileHover={{ scale: 1.1 }}
            >
              <FaGithub />
              <span>GitHub</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "WriteWay",
      description: "Desktop application for writers designed to write and plan novels and collaborate with other authors.",
      techs: ["ElectronJS", "MongoDB", "NodeJS"],
      image: "./assets/writeway_1.png",
      githubLink: "https://github.com/angcerv/writeway",
    },
    {
      title: "WriteWay",
      description: "Desktop application for writers designed to write and plan novels and collaborate with other authors.",
      techs: ["ElectronJS", "MongoDB", "NodeJS"],
      image: "./assets/writeway_1.png",
      githubLink: "https://github.com/angcerv/writeway",
    },
  ];

  return (
    <motion.div
      className="max-w-5xl mx-auto p-4 sm:p-6 rounded-2xl bg-gray-800 mt-4 sm:mt-6 mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            title={project.title}
            description={project.description}
            techs={project.techs}
            image={project.image}
            githubLink={project.githubLink}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
