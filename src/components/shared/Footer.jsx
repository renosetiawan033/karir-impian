import React from 'react';
import { FaGithub, FaSquareInstagram  } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Karir impian</h2>
            <p className="text-sm">© 2024 Karir impian. Semua hak dilindungi undang-undang.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;