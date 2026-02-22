import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

export default function Sidebar({ onClose }: { onClose: () => void }) {

    const navigate = useNavigate();
    
    return (
        <section className="w-64 px-4 py-2 bg-sky-950/40 fixed top-0 left-0 z-10 h-screen flex flex-col items-center space-y-2 overflow-y-auto">
            <div>
                <a href="/home"><img src="logov2_branco.svg" alt="SCAER" className="w-auto max-h-14 mx-auto hover:bg-blue-900/20" /></a>
            </div>
            <div className="flex flex-col space-y-1">
                <Button onClick={() => { navigate("/quemsomos"); onClose(); }} variant="text-only">Quem Somos</Button>
                <Button onClick={() => { navigate("/noticias"); onClose(); }} variant="text-only">Noticias</Button>
                <Button onClick={() => { navigate("/clubes"); onClose(); }} variant="text-only">CLubes e Diretorias</Button>
                <Button onClick={() => { navigate("/sejasocio"); onClose(); }} variant="text-only">Seja Sócio</Button>
                <Button onClick={() => { navigate("/esquadroes"); onClose(); }} variant="text-only">Esquadrões</Button>
                <Button onClick={() => { navigate("/navamaer"); onClose(); }} variant="text-only">Navamaer</Button>
                <Button onClick={() => { navigate("/interafa"); onClose(); }} variant="text-only">InterAFA</Button>
                <Button onClick={() => { navigate("/loja"); onClose(); }} variant="text-only">Loja COMERCIAL</Button>
            </div>
        </section>
    )
};