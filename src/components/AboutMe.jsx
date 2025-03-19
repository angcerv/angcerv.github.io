import avatar from '../assets/img/profile_grey.jpg';
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <motion.div 
      className="max-w-5xl mx-auto px-6 py-6 rounded-xl text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-10">

        <motion.div 
          className="space-y-4 text-center md:text-left flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>My name is Angela. I'm a Software Development Engineer with 4+ years of experience building user-focused applications.</p>
          <p>Recently relocated to Vancouver, I'm eager to explore new opportunities and continue growing within the Canadian tech industry.</p>   
          <p>I’m passionate about designing and developing applications that enhance user experiences, and I truly love my career and the ever-evolving world of software engineering.</p> 
        </motion.div>

        <motion.div 
          className="flex justify-center flex-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img
            src={avatar}
            alt="Angela Cervantes"
            className="w-[180px] sm:w-[220px] lg:w-[250px] rounded-lg object-cover border-2 border-teal-600 shadow-md shadow-teal-500"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutMe;
