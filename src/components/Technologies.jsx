import React from "react";
import { FaPlug, FaCogs, FaJs, FaJava, FaReact, FaAngular, FaHtml5, FaCss3, FaNodeJs, FaGitAlt, FaAws, FaPython, FaDatabase } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoElectron } from "react-icons/io5";
import { SiTypescript, SiCplusplus } from "react-icons/si";
import { PiFileCSharpFill } from "react-icons/pi";
import { DiMysql } from "react-icons/di";

const TechnologyCard = ({ tech, logo: Logo, years }) => {
  return (
    <div className="relative flex w-33 h-9 perspective group hover:cursor-default">
      <div className="w-full h-full flex items-center gap-1 p-2 rounded-xl border border-teal-500 bg-teal-900 shadow-lg transition-transform duration-400 ease-in-out transform group-hover:rotate-y-180">
        
        {/* Cara frontal */}
        <div className="absolute inset-0 flex items-center justify-center backface-hidden transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:delay-0 delay-50">
          {Logo && <Logo className="w-5 h-5 text-white mr-2" />}
          <span className="text-xs font-semibold text-white">{tech}</span>
        </div>

        {/* Cara trasera (aparece solo en hover) */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-0 rotate-y-180 transition-opacity duration-300 group-hover:opacity-100">
          <span>{years} {years === 1 ? "year" : "years"}</span>
        </div>
      </div>
    </div>
  );
};

const Technologies = () => {

  const techsFrontend = [
    { tech: "Javascript", logo: FaJs, years: 4 },
    { tech: "React", logo: FaReact, years: 4 },
    { tech: "Angular", logo: FaAngular, years: 4 },
    { tech: "HTML5", logo: FaHtml5, years: 4 },
    { tech: "CSS", logo: FaCss3, years: 4 },
    { tech: "Tailwind", logo: RiTailwindCssFill, years: 4 },
  ];

  const techsBackend = [
    { tech: "Java", logo: FaJava, years: 4 },
    { tech: "Node.js", logo: FaNodeJs, years: 4 },
    { tech: "ElectronJS", logo: IoLogoElectron, years: 2 },
  ];

  const techsDBs = [
    { tech: "MySQL", logo: DiMysql, years: 4 },
    { tech: "MongoDB", logo: FaDatabase, years: 4 },
  ];

  const techsInfraAndTools = [
    { tech: "Git", logo: FaGitAlt, years: 4 },
    { tech: "REST", logo: FaPlug, years: 4 },
    { tech: "SOAP", logo: FaCogs, years: 4 },
    { tech: "AWS", logo: FaAws, years: 2 },
  ];

  const techsOtherLanguages = [
    { tech: "Typescript", logo: SiTypescript, years: 1 },
    { tech: "Python", logo: FaPython, years: 2 },
    { tech: "C", logo: SiCplusplus, years: 1 },
    { tech: "C#", logo: PiFileCSharpFill, years: 1 },
  ];

  return (
    <div>
      {/* Frontend Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
          <FaReact className="text-teal-500" />
          Frontend
        </h2>
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex gap-x-4 gap-y-6">
            {techsFrontend.map((t, index) => (
              <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} />
            ))}
          </div>
        </div>
      </div>

      {/* Backend Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
          <FaNodeJs className="text-teal-500" />
          Backend
        </h2>
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex gap-x-4 gap-y-6">
            {techsBackend.map((t, index) => (
              <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} />
            ))}
          </div>
        </div>
      </div>

      {/* Databases Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
          <FaDatabase className="text-teal-500" />
          Databases
        </h2>
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex gap-x-4 gap-y-6">
            {techsDBs.map((t, index) => (
              <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} />
            ))}
          </div>
        </div>
      </div>

      {/* Infra & Tools Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
          <FaGitAlt className="text-teal-500" />
          Infra & Tools
        </h2>
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex gap-x-4 gap-y-6">
            {techsInfraAndTools.map((t, index) => (
              <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} />
            ))}
          </div>
        </div>
      </div>

      {/* Other Languages Section */}
      <div className="mt-8 mb-6">
        <h2 className="text-2xl font-bold text-teal-500 flex items-center gap-2 mb-4">
          <SiCplusplus className="text-teal-500" />
          Other Languages
        </h2>
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-gray-800 shadow-lg">
          <div className="flex gap-x-4 gap-y-6">
            {techsOtherLanguages.map((t, index) => (
              <TechnologyCard key={index} tech={t.tech} logo={t.logo} years={t.years} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
