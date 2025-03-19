import React from "react";
import { motion } from "framer-motion";
import { FaPlug, FaCogs, FaJs, FaJava, FaReact, FaAngular, FaHtml5, FaCss3, FaNodeJs, FaGitAlt, FaAws, FaPython, FaDatabase } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoElectron } from "react-icons/io5";
import { SiTypescript, SiCplusplus } from "react-icons/si";
import { PiFileCSharpFill } from "react-icons/pi";
import { DiMysql } from "react-icons/di";

const TechnologyCard = ({ tech, logo: Logo, years, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex w-28 h-8 md:w-31 md:h-9 perspective group hover:cursor-default"
    >
      <div className="w-full h-full flex items-center gap-1 p-2 rounded-xl border border-teal-500 bg-teal-900 shadow-lg transition-transform duration-400 ease-in-out transform group-hover:rotate-y-180">
        {/* Front face */}
        <div className="absolute inset-0 flex items-center justify-center backface-hidden transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:delay-0 delay-50">
          {Logo && <Logo className="w-5 h-5 text-white mr-2" />}
          <span className="text-xs font-semibold text-white">{tech}</span>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 rotate-y-180 transition-opacity duration-300 group-hover:opacity-100">
          <span>{years} {years === 1 ? "year" : "years"}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Technologies = () => {
  const techCategories = [
    {
      title: "Frontend",
      icon: <FaReact className="text-teal-500" />,
      techs: [
        { tech: "Javascript", logo: FaJs, years: 4 },
        { tech: "React", logo: FaReact, years: 3 },
        { tech: "Angular", logo: FaAngular, years: 3 },
        { tech: "HTML5", logo: FaHtml5, years: 4 },
        { tech: "CSS", logo: FaCss3, years: 4 },
        { tech: "Tailwind", logo: RiTailwindCssFill, years: 3 },
      ],
    },
    {
      title: "Backend",
      icon: <FaNodeJs className="text-teal-500" />,
      techs: [
        { tech: "Java", logo: FaJava, years: 4 },
        { tech: "Node.js", logo: FaNodeJs, years: 4 },
        { tech: "ElectronJS", logo: IoLogoElectron, years: 2 },
      ],
    },
    {
      title: "Databases",
      icon: <FaDatabase className="text-teal-500" />,
      techs: [
        { tech: "MySQL", logo: DiMysql, years: 4 },
        { tech: "MongoDB", logo: FaDatabase, years: 4 },
      ],
    },
    {
      title: "Infra & Tools",
      icon: <FaGitAlt className="text-teal-500" />,
      techs: [
        { tech: "Git", logo: FaGitAlt, years: 4 },
        { tech: "REST", logo: FaPlug, years: 4 },
        { tech: "SOAP", logo: FaCogs, years: 4 },
        { tech: "AWS", logo: FaAws, years: 2 },
      ],
    },
    {
      title: "Other Languages",
      icon: <SiCplusplus className="text-teal-500" />,
      techs: [
        { tech: "Typescript", logo: SiTypescript, years: 1 },
        { tech: "Python", logo: FaPython, years: 2 },
        { tech: "C", logo: SiCplusplus, years: 1 },
        { tech: "C#", logo: PiFileCSharpFill, years: 1 },
      ],
    },
  ];

  return (
    <div className="px-4">
      {techCategories.map((category, catIndex) => (
        <motion.div
          key={catIndex}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: catIndex * 0.2 }}
          className="mt-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
            {category.icon}
            {category.title}
          </h2>
          <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
            <div className="flex flex-wrap gap-4 justify-center">
              {category.techs.map((t, index) => (
                <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Technologies;
