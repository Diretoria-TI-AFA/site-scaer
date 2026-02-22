import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Infocard from "../components/Infocard";
import { usePocketbase } from "../src/hooks/usePocketbase";
import { getPosts } from "../src/services/postsapi"
import { getImageUrl } from "../src/services/fileUrl"
import type { Foto } from "../src/types"
import { getFotosPorAlbum } from "../src/services/photosApi"

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { data: posts, loading } = usePocketbase(() => getPosts());
    const { data: fotos, loading: loadingFotos } = usePocketbase(() => getFotosPorAlbum('banner'));

    const carrouselImages: string[] =
        (fotos as Foto[] | null)?.map((foto: Foto) => getImageUrl(foto, foto.imagem, '1920x1080')) ?? [];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carrouselImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carrouselImages.length) % carrouselImages.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 8000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    return (
        <div className="flex flex-col pt-0">
            <div className="relative top-0 z-0 overflow-hidden w-full">
                {loadingFotos ? (
                    <div className="w-full max-h-144 bg-sky-900 animate-pulse" style={{ height: "36rem" }} />
                ) : carrouselImages.length > 0 ? (
                    <>
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {carrouselImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={fotos?.[index]?.title ?? `Imagem ${index + 1}`}
                                    className="w-full max-h-220 shrink-0 object-cover"
                                />
                            ))}
                        </div>

                        {carrouselImages.length > 1 && (
                            <>
                                <ChevronRight
                                    color="white"
                                    onClick={nextImage}
                                    className="min-h-14 min-w-14 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
                                />
                                <ChevronLeft
                                    color="white"
                                    onClick={prevImage}
                                    className="min-h-14 min-w-14 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2"
                                />
                            </>
                        )}

                        {/* Indicadores de ponto */}
                        {carrouselImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {carrouselImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex
                                            ? "bg-white scale-125"
                                            : "bg-white/50"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {carrouselImages.length > 1 && (
                            <div className="absolute bottom-74 left-1/2 -translate-x-1/2 flex gap-2">
                                <p className="text-4xl font-bold text-white text-shadow-white/30 text-shadow-md">DOS CADETES, PARA OS CADETES</p>
                            </div>
                        )}
                    </>
                ) : null}
            </div>
            <div id="Noticias" className="bg-sky-950 text-center flex justify-center items-center py-12 gap-6">
                {loading && (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl w-70 h-100 overflow-hidden bg-sky-100/20 p-4 border border-sky-50/30 flex flex-col gap-3 animate-pulse"
                        >
                            <div className="w-full h-48 rounded-2xl bg-sky-100/20" />

                            <div className="h-5 rounded-md bg-sky-100/20 w-3/4" />

                            <div className="h-3 rounded-md bg-sky-100/20 w-full" />
                            <div className="h-3 rounded-md bg-sky-100/20 w-5/6" />
                            <div className="h-3 rounded-md bg-sky-100/20 w-4/6" />

                            <div className="h-3 rounded-md bg-sky-100/20 w-1/3 mt-auto" />
                        </div>
                    ))
                )}

                {!loading && posts?.map(post => (
                    <Infocard key={post.id} post={post} />
                ))}
            </div>
            <div className="bg-sky-950 py-24 flex justify-center items-center flex-col">
                <img src="/escudoSCAER_branco.svg" alt="Logo da SCAER" className="mx-auto w-64 h-64 object-contain" />
                <h1 className="text-center text-white text-4xl font-bold">SCAER - Sociedade Acadêmica dos Cadetes da Aeronáutica</h1>
                <p className="text-center px-auto max-w-3/7 text-white text-2xl py-2 flex justify-center items-center ">A SCAER é feita por Cadetes, para Cadetes. Somos parte essencial da vida na AFA, trabalhando continuamente para honrar nossas tradições e construir um futuro brilhante para a Força Aérea Brasileira.</p>
            </div>
            <div className="py-72"></div>
            <div className="bg-sky-960">
                <h1 className="bg-sky-950 text-center text-white text-2xl py-24 font-bold flex justify-center items-center ">Mídias Sociais</h1>
            </div>
            <div className="bg-sky-960">
                <div className="text-center text-3xl font-bold py-24 text-white bg-[url('/home2.jpg')] bg-cover bg-top">
                    <div className="max-w-3/7 text-4xl text-right items-center flex flex-col justify-center ml-auto mr-12">
                        <h2>Clubes e Diretorias</h2>
                        <p className="text-justify">
                            Os Clubes e diretorias da SCAER são responsáveis por promover atividades, eventos e iniciativas que enriquecem a experiência acadêmica e social dos cadetes da Academia da Força Aérea.
                            Com uma gestão democrática e transparente, os clubes e diretorias trabalham em conjunto para oferecer aos cadetes uma variedade de opções de lazer, cultura, esporte e desenvolvimento pessoal.
                            Atualmente, a SCAER conta com XX Clubes e diretorias, cada um com suas próprias atividades e eventos.
                        </p>
                    </div>
                </div>

            </div>
            <div className="bg-sky-960">
                <div className="text-center text-3xl font-bold py-24 text-white bg-[url('/home.jpg')] bg-cover bg-top">
                    <div className="max-w-3/7 text-4xl text-right items-center flex flex-col justify-center ml-12 mr-auto">
                        <h2>Texto 1</h2>
                        <p className="text-justify">
                            A SCAER - Sociedade Acadêmica dos Cadetes da Aeronáutica realiza atividades [...]
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-sky-960">
                <div className="text-center text-3xl font-bold py-24 text-white bg-[url('/home2.jpg')] bg-cover bg-top">
                    <div className="max-w-3/7 text-4xl text-right items-center flex flex-col justify-center ml-auto mr-12">
                        <h2>Texto 1</h2>
                        <p className="text-justify">
                            A SCAER - Sociedade Acadêmica dos Cadetes da Aeronáutica realiza atividades [...]
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si parsam param ad astra fili ergo sum ad sumus
                            Loren ipsum norte ergo si
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}