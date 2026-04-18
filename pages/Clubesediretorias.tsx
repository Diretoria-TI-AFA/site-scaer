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
            <div>
                <img src="/img/clubes_diretorias.jpg" alt="" className="w-full h-[50rem] object-cover object-top " />
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