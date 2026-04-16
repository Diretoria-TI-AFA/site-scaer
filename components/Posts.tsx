import { usePocketbase } from "../src/hooks/usePocketbase";
import { getPosts } from "../src/services/postsapi";
import Infocard from "./Infocard"

export default function Posts() {

    const { data: posts, loading, error } = usePocketbase(() => getPosts());

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl bg-gray-200/30 border border-gray-200/40 animate-pulse h-72" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-center text-red-500 py-8">
                Não foi possível carregar as publicações
            </p>
        );
    };
    if (!posts) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {posts?.map(post => (
                <Infocard key={post.id} post={post.post} />
            ))}
        </div>
    )
}