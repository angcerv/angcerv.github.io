// src/App.jsx
import React from 'react';
import Footer from './components/Footer'
import ScrollSections from './components/ScrollSections'

function App() {
  return (
    <div className="font-mono bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center md:flex-row">
      <div className='max-w-5xl'>
        <ScrollSections />
        <Footer />
      </div>   
    </div>
  );
}

export default App;
