import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

interface TopbarProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between gap-4 px-56 py-8 bg-transparent">
            <div className="flex items-center gap-2">
                <button onClick={onToggleSidebar} className="text-white p-2 rounded-md hover:bg-white/10 transition">
                    {isSidebarOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
                <div className="flex items-center px-2" onClick={() => navigate("/home")}>
                    <img src="/escudoSCAER_branco.svg" alt="SCAER" className="w-auto max-h-24 mx-auto hover:bg-blue-900/20" />
                </div>
            </div>
            <div className="py-2">
                <Button onClick={() => navigate("/clubes")} variant="text-only">Clubes e Diretorias</Button>
                <Button onClick={() => navigate("/sejasocio")} variant="text-only">Seja Sócio</Button>
                <Button onClick={() => navigate("/navamaer")} variant="text-only">Navamaer</Button>
                <Button onClick={() => navigate("/interafa")} variant="text-only">InterAFA</Button>
            </div>
        </nav>
    )
};