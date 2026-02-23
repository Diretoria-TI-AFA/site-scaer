import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

export default function Sidebar({ onClose }: { onClose: () => void }) {
    const navigate = useNavigate();

    return (
        <section className="w-64 px-4 py-2 bg-sky-950 h-screen flex flex-col items-center space-y-2 overflow-y-auto">
            <div className="w-full flex justify-end pt-2">
                <button onClick={onClose} className="text-white hover:text-red-400 transition p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div>
                <a onClick={() => { navigate("/home"); onClose(); }}>
                    <img src="/escudoSCAER_branco.svg" alt="SCAER" className="w-auto max-h-24 mx-auto hover:bg-blue-900/20" />
                </a>
            </div>
            <div className="flex flex-col space-y-1">
                <Button onClick={() => { navigate("/noticias"); onClose(); }} variant="text-only">Noticias</Button>
                <Button onClick={() => { navigate("/clubes"); onClose(); }} variant="text-only">Clubes e Diretorias</Button>
                <Button onClick={() => { navigate("/sejasocio"); onClose(); }} variant="text-only">Seja Sócio</Button>
                <Button onClick={() => { navigate("/esquadroes"); onClose(); }} variant="text-only">Esquadrões</Button>
                <Button onClick={() => { navigate("/navamaer"); onClose(); }} variant="text-only">Navamaer</Button>
                <Button onClick={() => { navigate("/interafa"); onClose(); }} variant="text-only">InterAFA</Button>
                <Button onClick={() => { navigate("/loja"); onClose(); }} variant="text-only">Loja COMERCIAL</Button>
            </div>
        </section>
    );
}