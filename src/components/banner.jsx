import React from 'react';
import ceweNunjuk from '../assets/ceweNunjuk.png';
import ceweNunjuk2 from '../assets/ceweNunjuk2.png';

const Banner = () => {
  return (
    <div className="relative bg-white py-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Kartu Pertama (Lebih Besar) */}
        <div className="bg-blue-700 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center max-w-full w-full md:max-w-[700px] h-auto relative overflow-hidden">
          <div className="w-full md:w-1/2 z-10">
            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4">Ayo Nyari Kerja!</h1>
            <p className="text-lg md:text-md text-white mb-6">
              Temukan peluang karir terbaik dan capai impian Anda bersama kami.
            </p>
            <a 
              href="/" 
              className="bg-white text-blue-800 py-3 px-6 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-gray-200 transform hover:scale-105"
            >
              Mulai Sekarang
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center relative mt-6 md:mt-0">
            {/* Bentuk di belakang gambar */}
            <div className="absolute w-56 h-56 bg-pink-500 rounded-full z-0 transform -translate-x-1/4 -translate-y-1/4"></div>
            <img 
              src={ceweNunjuk}
              alt="Pekerjaan" 
              className="w-56 h-auto md:max-w-[200px] md:max-h-[400px] rounded-lg object-cover z-10" 
            />
          </div>
        </div>

        {/* Kartu Kedua (Lebih Kecil) */}
        <div className="bg-pink-500 p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center max-w-full w-full md:max-w-[700px] h-auto relative overflow-hidden">
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl md:text-5xl font-extrabold text-white mb-4">Karir Cerah Menantimu!</h1>
            <p className="text-lg md:text-md text-white mb-6">
              Dapatkan peluang kerja yang sesuai dengan keahlianmu dan mulailah perjalanan karirmu hari ini.
            </p>
            <a 
              href="/jobs" 
              className="bg-white text-pink-800 py-3 px-6 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-gray-200 transform hover:scale-105"
            >
              Lihat Lowongan
            </a>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center relative mt-6 md:mt-0">
            <img 
              src={ceweNunjuk2}
              alt="Pekerjaan" 
              className="w-56 h-auto md:max-w-[200px] md:max-h-[400px] rounded-lg object-cover z-10" 
            />
            <div className="absolute w-60 h-60 bg-blue-600 rounded-full z-0 transform translate-x-1/4 translate-y-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
