import React from 'react';
import Navbar from './shared/navbar';
import rafi from '../assets/rafi.jpg'
import reno from '../assets/reno.jpg'
const TentangKami = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 mt-2">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Tentang Kami</h1>
        <p className="text-center text-gray-600 max-w-2xl mb-12 px-4">
          Selamat datang di Karir Impian! Kami adalah platform pencarian kerja yang dirancang untuk
          membantu Anda menemukan peluang kerja impian Anda. Dengan berbagai fitur menarik dan
          pengalaman pengguna yang intuitif, kami berkomitmen untuk menjadi jembatan antara
          pencari kerja dan perusahaan yang mencari bakat terbaik.
        </p>
        <div className="flex justify-around w-full max-w-4xl mb-12">
          <div className="flex flex-col items-center">
            <img 
              src={rafi} 
              alt="Back-End Developer" 
              className="rounded-full w-40 h-40 shadow-lg mb-2 transition-transform transform hover:scale-105"
            />
            <p className="text-gray-800 font-medium mt-2">Raffi Priya Rosa</p> 
            <p className="text-gray-700 font-medium text-sm">Sebagai</p> 
            <h2 className="font-semibold text-lg text-gray-800">Back-End Developer</h2>
            <p className="text-gray-500 text-center max-w-xs mt-1">
              Bertanggung jawab untuk pengembangan dan pemeliharaan server serta database.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={reno} 
              alt="Front-End Developer" 
              className="rounded-full w-40 h-40 shadow-lg mb-2 transition-transform transform hover:scale-105"
            />
            <p className="text-gray-800 font-medium mt-2">Reno Setiawan</p> 
            <p className="text-gray-700 font-medium text-sm">Sebagai</p> 
            <h2 className="font-semibold text-lg text-gray-800">Front-End Developer</h2>
            <p className="text-gray-500 text-center max-w-xs mt-1">
              Fokus pada desain antarmuka pengguna dan pengalaman pengguna yang menarik.
            </p>
          </div>
        </div>
        <p className="text-center text-gray-600 max-w-lg">
          Bergabunglah dengan kami dan wujudkan karir impian Anda hari ini!
        </p>
      </div>
    </div>
  );
}

export default TentangKami;
