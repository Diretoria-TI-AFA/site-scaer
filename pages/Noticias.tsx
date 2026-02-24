import Infocard from "../components/Infocard";
import { usePocketbase } from "../src/hooks/usePocketbase";
import { getPosts } from "../src/services/postsapi"

export default function Noticias() {
    const { data: posts, loading } = usePocketbase(() => getPosts());
    return (
        <>
            <div>
                <img src="/home2.jpg" alt="SCAER" className="w-full max-h-[50rem] object-cover object-top mx-auto hover:bg-blue-900/20" />
            </div>
            <div className="bg-sky-950 w-screen flex flex-col justify-center items-center p-6">
                <h1 className="text-4xl font-bold text-white">Noticias</h1>
                <p className="text-gray-200 text-base leading-relaxed whitespace-pre-wrap">Confira as últimas notícias da SCAER</p>
            </div>
            <div id="Noticias" className="bg-sky-950 text-center flex justify-center items-center py-12 gap-6">
                {loading && (
                    Array.from({ length: 6 }).map((_, i) => (
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
            <div className="min-h-80" />
        </>
    )
}