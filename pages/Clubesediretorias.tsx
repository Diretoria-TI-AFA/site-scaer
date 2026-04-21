import Infoclubscards from "../components/Infoclubscard"
import pb from "../src/services/pocketbase"
import { usePocketbase } from "../src/hooks/usePocketbase"
import type { Clube } from "../src/types"

async function getClubes() {
    const res = await pb.collection("clubes").getList<Clube>(1, 60, {
        sort: 'nome',
    });
    return res.items;
}

export default function Clubesediretorias() {
    const { data: clubes, loading } = usePocketbase(() => getClubes());

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <div className="w-full h-auto">
                <img src="/img/clubes_diretorias.jpg" alt="" className="w-full h-[50rem] object-cover object-top " />
            </div>
            <div className="flex flex-col items-center bg-sky-950 backdrop-blur-xs p-8 w-full">
                <h1 className="text-white text-4xl font-bold text-center mb-12">Presidência</h1>
                <div className="flex flex-col items-center mb-12">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-sky-500 overflow-hidden mb-4 shadow-xl">
                        <img
                            src="/img/presidente.jpeg"
                            alt="Presidente"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-white text-2xl font-bold">CAD INT ARAGÃO</h2>
                    <p className="text-sky-400 font-medium uppercase tracking-wider">Presidente</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-6xl">
                    <div className="flex flex-col items-center w-32 md:w-40">
                        <p className="text-sky-400 text-sm text-center">Vice-Presidente</p>
                        <h3 className="text-white text-lg font-semibold text-center leading-tight">CAD AV BERTELLI</h3>
                    </div>
                    <div className="flex flex-col items-center w-32 md:w-40">
                        <p className="text-sky-400 text-sm text-center">Secretária</p>
                        <h3 className="text-white text-lg font-semibold text-center leading-tight">CAD INT JÚLIA SOUSA</h3>
                    </div>
                    <div className="flex flex-col items-center w-32 md:w-40">
                        <p className="text-sky-400 text-sm text-center">Tesoureiros</p>
                        <h3 className="text-white text-lg font-semibold text-center leading-tight">CAD INT AMANDA <br /> CAD INT ANDRÉ OLIVEIRA</h3>
                    </div>
                    <div className="flex flex-col items-center w-32 md:w-40">
                        <p className="text-sky-400 text-sm text-center">ACI</p>
                        <h3 className="text-white text-lg font-semibold text-center leading-tight">CAD AV ALVES <br /> CAD INT DOMINGUES <br /> CAD INT FARIAS</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center bg-sky-950 backdrop-blur-xs p-4">
                <h1 className="text-white text-4xl font-bold text-center mt-4">Clubes e Diretorias</h1>
            </div>
            <div className="
                flex flex-col items-center bg-sky-950 backdrop-blur-xs
                mt-0 p-12
                grid gap-6
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                ">
                {clubes?.map(clube => (
                    <Infoclubscards key={clube.id} clube={clube} />
                ))}
            </div>
        </>
    )
}