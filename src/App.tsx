import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Quemsomos from "../pages/Quemsomos";
import Clubesediretorias from "../pages/Clubesediretorias";
import Sejasocio from "../pages/Sejasocio";
import Esquadroes from "../pages/Esquadroes";
import Navamaer from "../pages/Navamaer";
import Interafa from "../pages/Interafa";
import Paginadeposts from "../pages/Paginadeposts"
import Noticias from "../pages/Noticias"
import Parcerias from "../pages/Parcerias"
import { SportResultsPage } from "../pages/SportResultsPage";


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-[-1] fixed"
        >
          <source src="/fundo.mp4" type="video/mp4" />
        </video>
        <div className={`fixed z-80 inset-y-0 left-0 w-64 shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full overflow-y-auto">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
        <div className="absolute top-0 w-full z-40">
          <Topbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} isSidebarOpen={isSidebarOpen} />
        </div>
        <main>
          <Routes>
            <Route path="/post" element={<Paginadeposts />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/quemsomos" element={<Quemsomos />} />
            <Route path="/clubes" element={<Clubesediretorias />} />
            <Route path="/sejasocio" element={<Sejasocio />} />
            <Route path="/esquadroes" element={<Esquadroes />} />
            <Route path="/navamaer" element={<Navamaer />} />
            <Route path="/interafa" element={<Interafa />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/esporte/:sportId" element={<SportResultsPage />} />
          </Routes>
        </main>

      </div>
      <footer className="bg-sky-950 p-4 pt-14 w-full">
        <div className="flex justify-between items-center px-6 text-white">
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white font-bold text-center"></h2>
            <div className="flex gap-2">
              <a href="/Prestação" rel="noopener noreferrer" className="hover:scale-115 transition duration-300 text-center">
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white font-bold text-center">NOSSAS REDES SOCIAIS</h2>
            <div className="flex gap-2 justify-center py-2 gap-8">
              <a href="https://www.instagram.com/scaer_afa/" target="_blank" rel="noopener noreferrer">
                <img src="/instagram_icon_branco.svg" alt="Instagram" className="w-8 h-8 hover:scale-115 transition duration-100" />
              </a>
              <a href="https://www.youtube.com/@AFAMilitar" target="_blank" rel="noopener noreferrer">
                <img src="/youtube_icon_branco.svg" alt="YouTube" className="w-8 h-8 hover:scale-115 transition duration-100" />
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white font-bold text-center"></h2>
            <div className="flex gap-2">
              <a href="/Estatuto" rel="noopener noreferrer" className="hover:scale-115 transition duration-300 text-center">
              </a>
            </div>
          </div>
        </div>
        <img src="/escudoSCAER_branco.svg" onClick={() => window.location.href = "/"} alt="Logo da SCAER" className="mx-auto max-w-56 max-h-56 pb-4 pt-24 object-contain hover:scale-110 transition duration-300 " />
        <p className="text-center text-white">SITE OFICIAL DA SOCIEDADE DE CADETES DA AERONÁUTICA</p>
        <p className="text-center text-white">© 2026 - Site produzido pela DIRETORIA DE IMPRENSA. Todos os Direitos Reservados.</p>
      </footer>
    </BrowserRouter>
  );
}