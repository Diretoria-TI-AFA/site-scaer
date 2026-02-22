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
        <div className="
            flex flex-col items-center bg-sky-950/30 backdrop-blur-xs border border-sky-50/35 p-6 rounded-4xl
            mt-24 p-4 mx-8
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
    )
}