import React from 'react';
import { motion } from "framer-motion";
import { FaCode, FaTools, FaServer, FaFileAlt } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      position: 'Software Development Engineer',
      company: 'Oesia Networks',
      location: 'Madrid, Spain',
      dateRange: 'Sep 23 - Jan 25',
      description: [
        {
          text: 'Developed and implemented new features, primarily using Java, JavaScript, React and Angular.',
          icon: <FaCode />
        },
        {
          text: 'Maintained and fixed code issues, while conducting code reviews, performing testing, and managing source control.',
          icon: <FaTools />
        },
        {
          text: 'Provided technical support to customers by troubleshooting software issues and assisting with the implementation of SQL scripts.',
          icon: <FaServer />
        },
        {
          text: 'Created comprehensive documentation, covering code functionality, user interfaces, and internal team documentation.',
          icon: <FaFileAlt />
        }
      ],
    },
    {
      id: 2,
      position: 'Full Stack Developer',
      company: 'Optiva Media',
      location: 'Madrid, Spain',
      dateRange: 'Jun 20 - Jan 21',
      description: [
        {
          text: 'Developed and implemented new features, primarily using Java, JavaScript, and Angular.',
          icon: <FaCode />
        },
        {
          text: 'Created front-end prototypes and samples for customer presentations.',
          icon: <FaCode />
        },
        {
          text: 'Maintained and fixed code issues, while conducting code reviews, performing testing, and managing source control.',
          icon: <FaTools />
        },
        {
          text: 'Collaborated in preparing and delivering official code releases to the customer.',
          icon: <FaFileAlt />
        }
      ],
    },
    {
      id: 3,
      position: 'Software Application Engineer',
      company: 'Guidewire',
      location: 'Madrid, Spain',
      dateRange: 'Aug 21 - Sep 23',
      description: [
        {
          text: 'Developed solutions for bugs and errors identified, primarily using Java, Gosu, and JavaScript.',
          icon: <FaCode />
        },
        {
          text: 'Maintained code and fixed issues to ensure application stability, while analyzing application logs to resolve critical incidents.',
          icon: <FaTools />
        },
        {
          text: 'Provided technical support to customers by troubleshooting software issues and answering product-related questions.',
          icon: <FaServer />
        },
        {
          text: 'Created and maintained technical documentation to streamline issue resolution and improve internal workflows.',
          icon: <FaFileAlt />
        }
      ],
    },
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Computer Science Engineering',
      institution: 'University Carlos III of Madrid',
      location: 'Madrid, Spain',
      dateRange: 'Sep 2015 - Jul 2021',
    },
  ];

  return (
    <motion.div className="space-y-12"
    initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
      {/* Professional Experience */}
      <h2 className="text-2xl font-bold text-gray-400 flex items-center gap-2 mb-4">
        Professional Experience
      </h2>
      <div className="relative">
        <div className="absolute left-3 z-0 transform -translate-x-1/2 bg-gray-300 w-1 h-full"></div>

        {experiences.map((experience) => (
          <div key={experience.id} className="flex items-center space-x-6 mb-12">
            <div className="w-6 h-6 z-10 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 z-10 bg-white rounded-full"></div>
            </div>

            <div className="flex-1">
              <div className="text-lg font-semibold text-teal-500">{experience.position}</div>
              <div className="text-sm text-gray-300">{experience.company} - {experience.location}</div>
              <div className="text-xs text-gray-400">{experience.dateRange}</div>

              <div className="mt-4 text-gray-500">
                <ul className="list-inside space-y-4">
                  {experience.description.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-teal-500 pt-1">{point.icon}</span>
                      <span>{point.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <h2 className="text-2xl font-bold text-gray-400 flex items-center gap-2 mb-4">
        Education
      </h2>
      <div className="relative">
        <div className="absolute left-3 z-0 transform -translate-x-1/2 bg-gray-300 w-1 h-full"></div>

        {education.map((edu) => (
          <div key={edu.id} className="flex items-center space-x-6 mb-12">
            <div className="w-6 h-6 z-10 bg-teal-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 z-10 bg-white rounded-full"></div>
            </div>

            <div className="flex-1">
              <div className="text-lg font-semibold text-teal-500">{edu.degree}</div>
              <div className="text-sm text-gray-300">{edu.institution} - {edu.location}</div>
              <div className="text-xs text-gray-400">{edu.dateRange}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
