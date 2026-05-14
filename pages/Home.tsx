import Infocard from "../components/Infocard";
import { usePocketbase } from "../src/hooks/usePocketbase";
import { getPosts } from "../src/services/postsapi"

export default function Home() {
    const { data: posts, loading } = usePocketbase(() => getPosts());

    return (
        <div className="flex flex-col pt-0 w-full overflow-hidden">
            <div className="relative top-0 z-0 overflow-hidden">
                <img src="/img/pag_inicial.jpg" alt="Página Inicial" className="w-full" />
            </div>
            <div id="Noticias" className="bg-sky-950 px-2 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full max-w-7xl mx-auto">

                    {loading && (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl w-full max-w-[320px] mx-auto h-[380px] sm:h-[420px] md:h-[450px] overflow-hidden bg-sky-100/20 p-4 border border-sky-50/30 flex flex-col gap-3 animate-pulse"
                            >
                                <div className="w-full h-40 sm:h-48 rounded-2xl bg-sky-100/20 shrink-0" />
                                <div className="h-5 rounded-md bg-sky-100/20 w-3/4 mt-4" />
                                <div className="h-3 rounded-md bg-sky-100/20 w-full" />
                                <div className="h-3 rounded-md bg-sky-100/20 w-5/6" />
                                <div className="h-3 rounded-md bg-sky-100/20 w-4/6" />
                                <div className="h-3 rounded-md bg-sky-100/20 w-1/3 mt-auto pt-4" />
                            </div>
                        ))
                    )}
                    <Infocard
                        key="interafa"
                        title="LIII INTERAFA"
                        description="FIQUE POR DENTRO DE TUDO O QUE ACONTECE NA LIII INTERAFA"
                        image="/interafa.png"
                        redirectTo="/interafa"
                        variant="interafa"
                    />

                    {!loading && posts && posts.map((post) => (
                        <Infocard key={post.id} post={post} />
                    ))}

                </div>
            </div>

            <div className="bg-sky-950 py-24 flex justify-center items-center flex-col">
                <img src="/escudoSCAER_branco.svg" alt="Logo da SCAER" className="mx-auto w-64 h-64 object-contain hover:scale-110 transition duration-300" />
                <h1 className="text-center text-white text-4xl font-bold mt-4">SCAER - Sociedade Acadêmica dos Cadetes da Aeronáutica</h1>
                <p className="text-center px-4 max-w-4xl text-white text-2xl py-6 flex justify-center items-center">
                    A SCAER é feita por Cadetes, para Cadetes. Somos parte essencial na vida do cadete da AFA, trabalhando continuamente para honrar nossas tradições e construir um futuro brilhante para a Força Aérea Brasileira.
                </p>
            </div>
            <div className="py-72" />
            <div className="bg-sky-960 flex">
                <div className="bg-sky-950 text-center text-white text-2xl py-12 font-bold flex flex-col gap-4 justify-center items-center w-full">
                    <p>Mídias Sociais</p>
                    <div className="flex gap-8 justify-center items-center">
                        <img onClick={() => window.open("https://www.instagram.com/scaer_afa/", "_blank")} className="w-12 h-12 cursor-pointer hover:scale-125 transition-all duration-300 " src="/instagram_icon_branco.svg" alt="Instagram" />
                        <img onClick={() => window.open("https://www.youtube.com/@AFAMilitar", "_blank")} className="w-12 h-12 cursor-pointer hover:scale-125 transition-all duration-300 " src="/youtube_icon_branco.svg" alt="Youtube" />
                    </div>
                </div>
            </div>

            <div className="bg-sky-960">
                <div className="flex flex-col justify-top font-bold py-24 text-white bg-[url('/img/profissionalismo.jpg')] bg-cover h-full aspect-[5/2]">
                    <div className="max-w-[45%] text-right flex flex-col justify-end mt-auto ml-12 mr-auto">
                        <h2 className="text-left text-6xl"></h2>
                        <p className="text-justify text-2xl"></p>
                    </div>
                </div>
            </div>

            <div className="bg-sky-960">
                <div className="flex flex-col justify-top font-bold py-24 text-white bg-[url('/img/integridade.jpg')] bg-cover h-full aspect-[5/2]">
                    <div className="max-w-[45%] text-right flex flex-col justify-end mt-auto ml-12 mr-auto">
                        <h2 className="text-left text-6xl"></h2>
                        <p className="text-justify text-2xl"></p>
                    </div>
                </div>
            </div>

            <div className="bg-sky-960">
                <div className="flex flex-col justify-top font-bold py-24 text-white bg-[url('/img/esp_corpo.jpg')] bg-cover h-full aspect-[5/2]">
                    <div className="max-w-[45%] text-right items-end flex flex-col justify-end ml-auto mr-12">
                        <h2 className="text-right text-6xl"></h2>
                        <p className="text-justify text-2xl"></p>
                    </div>
                </div>
            </div>

        </div>
    );
}