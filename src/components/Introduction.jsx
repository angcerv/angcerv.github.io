import React, { useState, useEffect } from "react";
import avatar from '../assets/img/avatar.png';
import LinkButton from './LinkButton';
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
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.blur();
            window.focus();
        }
    };

    const openResume = () => {
        window.open('/angcerv.github.io/resume.pdf', '_blank');
    };

    return (
        <div className="flex items-center justify-center mt-10">
            <section className="py-12 border-b border-gray-700 flex items-center">
                <div>
                    <h3 className="text-xl">
                        <span className="text-teal-500">Hi!</span> I'm
                    </h3>
                    <h1 className="text-5xl font-bold text-teal-500 leading-tight mb-4">Angela Cervantes</h1>
                    <p className="text-2xl text-white-400 leading-relaxed mb-4">     
                        <span className="flex items-center text-gray-300 mt-7 text-sm">
                            <FaMapMarkerAlt className="mr-2 text-red-700" />
                            Vancouver, BC, Canada
                        </span>
                        Software Development Engineer
                    </p>
                    <p className="text-gray-400 text-justify sleading-relaxed mt-4 mb-7 pr-10">
                        Full Stack Software Engineer with 4+ years of experience in designing, developing, and maintaining high-quality software solutions.
                    </p>
                    <div className="relative inline-block">
                        <button 
                            onClick={handleEmailAnimationButton} 
                            className={`cursor-pointer transition-all duration-500 ease-in-out flex items-center px-6 py-3 rounded-full overflow-hidden ${showEmail ? 'w-70 bg-transparent border border-teal-500' : 'w-36 bg-teal-500 hover:bg-teal-600 text-white active:scale-95'}`}>
                            {showEmail ? (
                                <div className="flex justify-between items-center w-full">
                                    <span
                                    className="cursor-text text-sm text-gray-300 select-all transition-opacity duration-1000"
                                    style={{ opacity: showEmailText ? 1 : 0 }}
                                    >
                                    angcerv9@gmail.com
                                    </span>
                                    <button 
                                        onClick={handleCopy} 
                                        className="cursor-pointer ml-3 transition-colors"
                                    >
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
                    <div className="flex items-center text-sm mt-10 mb-8">
                        Check out my
                        <div className="flex space-x-3 ml-3">
                            <LinkButton text="LinkedIn" onClick={() => openInBackground("https://www.linkedin.com/in/angcerv9")} icon={<FaLinkedin className="text-white" />} />
                            <LinkButton text="GitHub" onClick={() => openInBackground("https://github.com")} icon={<FaGithub className="text-white" />} />
                            <LinkButton text="Resume" onClick={openResume} icon={<FaDownload />} />
                        </div>
                    </div>
                </div>
                <div className="relative w-120 h-70 bg-teal-500 rounded-full overflow-hidden ml-6">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-80 h-80 object-cover absolute top-[-20px] left-0"
                    />
                </div>
            </section>
        </div>
    );
};

export default Introduction;
