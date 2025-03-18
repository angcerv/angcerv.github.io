import avatar from '../assets/img/profile_grey.jpg'; // Asegúrate de que la ruta de la imagen sea correcta

const AboutMe = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-3 rounded-xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-center">
        {/* Texto a la izquierda */}
        <div className="space-y-4">
          <p>My name is Angela. I'm a Software Development Engineer with 4+ years of experience building user-focused applications.</p>
          <p>Recently relocated to Vancouver, I'm eager to explore new opportunities and continue growing within the Canadian tech industry.</p>   
          <p>I’m passionate about designing and developing applications that enhance user experiences, and I truly love my career and the ever-evolving world of software engineering.</p> 
        </div>

        {/* Foto a la derecha */}
        <div className="flex justify-center">
          <img
            src={avatar} // Asegúrate de que el avatar esté en la carpeta correcta
            alt="Angela Cervantes"
            className="w-70 h-70 rounded-full object-cover border-1 border-teal-600 shadow-md shadow-teal-500"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
