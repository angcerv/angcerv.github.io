import React from "react";
import { FaDownload } from "react-icons/fa"; // Importa el ícono de descarga

function LinkButton({ text, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer p-2 ml-3 border border-teal-500 text-white text-xs rounded-lg 
                 shadow-md transition-all duration-200 ease-in-out 
                 hover:bg-teal-950 hover:shadow-lg hover:scale-105 
                 active:scale-95 active:shadow-sm"
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Si se pasa un icono, lo renderiza */}
      {text}
    </button>
  );
}

export default LinkButton;
