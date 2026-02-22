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


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (

    <BrowserRouter>
      <div className="relative min-h-screen w-full bg-[url('/fundo.jpg')] bg-cover bg-center bg-fixed overflow-x-hidden font-sans">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-600 hover:text-red-500">
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
        <div className="hidden lg:block fixed top-0 w-full z-30 shadow-md">
          <Topbar />
        </div>
        <div className="lg:hidden fixed top-0 left-0 z-30 w-full p-4 flex items-center bg-transparent">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-white transition"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span className="h-0.5 w-full bg-white shadow-white shadow-xl hover:shadow-2xl"></span>
              <span className="h-0.5 w-full bg-white shadow-white shadow-xl hover:shadow-2xl"></span>
              <span className="h-0.5 w-full bg-white shadow-white shadow-xl hover:shadow-2xl"></span>
            </div>
          </button>
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
          </Routes>
        </main>

      </div>
      <footer className="bg-sky-950/90 p-4">
        <div className="flex justify-between items-center px-6 text-white">
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white">Nossas redes sociais</h2>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/scaer_afa/" target="_blank" rel="noopener noreferrer">
                <img src="/instagram_icon_branco.svg" alt="Instagram" className="w-8 h-8 hover:opacity-75" />
              </a>
              <a href="https://www.youtube.com/@AFAMilitar" target="_blank" rel="noopener noreferrer">
                <img src="/youtube_icon_branco.svg" alt="YouTube" className="w-8 h-8 hover:opacity-75" />
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white">Transparência</h2>
            <div className="flex gap-2">
              <a href="/Prestação" rel="noopener noreferrer">
                Prestação de contas
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white">Nosso estatuto</h2>
            <div className="flex gap-2">
              <a href="/Estatuto" rel="noopener noreferrer">
                Nosso Estatuto
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-center space-x-4 mt-2">
            <h2 className="text-white">Esportes</h2>
            <div className="flex gap-2 flex-col">
              <a href="/Interafa" rel="noopener noreferrer">
                INTERAFA
              </a>
              <a href="Navamaer" rel="noopener noreferrer">
                NAVAMAER
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-white pt-18 pb-2">© Copyright SCAER 2026</p>
      </footer>
    </BrowserRouter>
  );
}