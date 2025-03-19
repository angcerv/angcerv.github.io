import React, { useState, useEffect } from "react";
import avatar from "../assets/img/avatar.png";
import LinkButton from "./LinkButton";
import { FaDownload, FaMapMarkerAlt, FaLinkedin, FaGithub, FaRegCopy, FaCheck } from "react-icons/fa";

const Introduction = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [showEmailText, setShowEmailText] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEmailAnimationButton = () => {
    setShowEmail(true);
    setTimeout(() => setShowEmailText(true), 1000);
  };

  useEffect(() => {
    if (showEmail) {
      const timeout = setTimeout(() => setShowEmailText(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [showEmail]);

  const handleCopy = () => {
    navigator.clipboard.writeText("angcerv9@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInBackground = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.blur();
      window.focus();
    }
  };

  const openResume = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-10 p-4 md:p-8 w-full">
      <section className="py-10 border-b border-gray-700 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
        {/* Contenido de texto */}
        <div className="md:w-2/3">
          <h3 className="text-xl">
            <span className="text-teal-500">Hi!</span> I'm
          </h3>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-500 leading-tight mb-4">
            Angela Cervantes
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            <span className="flex justify-center md:justify-start items-center text-sm text-gray-400">
              <FaMapMarkerAlt className="mr-2 text-red-700" />
              Vancouver, BC, Canada
            </span>
            Software Development Engineer
          </p>
          <p className="text-gray-400 text-justify leading-relaxed mt-4 mb-7 max-w-md md:max-w-xl">
            Full Stack Software Engineer with 4+ years of experience in designing, developing, and maintaining high-quality software solutions.
        </p>


          {/* Botón de email */}
          <div className="relative inline-block">
            <button
              onClick={handleEmailAnimationButton}
              className={`cursor-pointer transition-all duration-500 ease-in-out flex items-center px-6 py-3 rounded-full overflow-hidden ${
                showEmail
                  ? "w-72 bg-transparent border border-teal-500"
                  : "w-36 bg-teal-500 hover:bg-teal-600 text-white active:scale-95"
              }`}
            >
              {showEmail ? (
                <div className="flex justify-between items-center w-full">
                  <span
                    className="cursor-text text-sm text-gray-300 select-all transition-opacity duration-1000"
                    style={{ opacity: showEmailText ? 1 : 0 }}
                  >
                    angcerv9@gmail.com
                  </span>
                  <button onClick={handleCopy} className="cursor-pointer ml-3 transition-colors">
                    {copied ? (
                      <FaCheck className="text-teal-600" size={18} />
                    ) : (
                      <FaRegCopy className="text-gray-300 hover:text-teal-500 active:scale-105" size={18} />
                    )}
                  </button>
                </div>
              ) : (
                <span className="text-sm font-bold">Let's talk!</span>
              )}
            </button>
          </div>

          {/* Botones de LinkedIn, GitHub y Resume */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-sm mt-8 mb-8">
            <span className="text-gray-300">Check out my:</span>
            <div className="flex space-x-3 ml-0 md:ml-3 mt-3 md:mt-0">
              <LinkButton
                text="LinkedIn"
                onClick={() => openInBackground("https://www.linkedin.com/in/angcerv9")}
                icon={<FaLinkedin className="text-white" />}
              />
              <LinkButton text="GitHub" onClick={() => openInBackground("https://github.com")} icon={<FaGithub className="text-white" />} />
              <LinkButton text="Resume" onClick={openResume} icon={<FaDownload />} />
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative w-48 h-48 md:w-60 md:h-60 bg-teal-500 rounded-full overflow-hidden mt-8 md:mt-0 md:ml-10">
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </section>
    </div>
  );
};

export default Introduction;
