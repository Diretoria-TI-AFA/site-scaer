import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function Topbar() {
    const navigate = useNavigate();

    return (
        <section className="bg-transparent w-full pr-24 px-4 py-2 fixed top-0 left-0 z-10 content-center align-items-center text-center flex flex-1 justify-center">
            <div className="py-2 max-h-full">
                <Button onClick={() => navigate("/clubes")} variant="text-only">Clubes e Diretorias</Button>
                <Button onClick={() => navigate("/sejasocio")} variant="text-only">Seja Sócio</Button>
            </div>
            <div className="px-6">
                <a onClick={() => navigate("/home")}><img src="logov2_branco.svg" alt="SCAER" className="w-auto max-h-14 mx-auto hover:bg-blue-900/20" /></a>
            </div>
            <div className="py-2">

                <Button onClick={() => navigate("/navamaer")} variant="text-only">Navamaer</Button>
                <Button onClick={() => navigate("/interafa")} variant="text-only">InterAFA</Button>
            </div>
        </section>
    )
};