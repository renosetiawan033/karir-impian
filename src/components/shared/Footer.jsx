import React from 'react';
import astronot from './../../assets/astronot3.png';

const Footer = () => {
  return (
    <footer className="border-t bg-blue-600 border-t-gray-200 py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center">
          {/* Left Section (Text) */}
          <div className="mb-4 md:mb-0 text-left">
            <h2 className="md:text-xl font-bold text-white">Karir Impian</h2>
            <p className="text-xs md:text-sm text-gray-200">© 2024 Karir Impian. Semua hak dilindungi undang-undang.</p>
          </div>
          
          {/* Right Section (Astronaut Image) */}
          <div className="transition-transform transform hover:scale-110 flex justify-center mt-4 md:mt-0">
            <img 
              src={astronot} 
              alt="Astronaut" 
              className="w-24 h-24 md:w-28 md:h-28" // Adjusted size for responsive behavior
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
