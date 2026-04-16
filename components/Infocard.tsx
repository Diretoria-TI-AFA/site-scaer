import { getImageUrl } from "../src/services/fileUrl"
import type { Post } from "../src/types"
import { useNavigate } from "react-router-dom";

interface Props {
    post: Post;
};

export default function Infocard({ post }: Props) {
    if (!post) return null;

    const imageUrl = getImageUrl(post, post.capa, '800x600');

    const data = new Date(post.data_publicacao).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    const navigate = useNavigate();

    function openPost() {
        navigate(`/post?p=${post.id}`)
    }

    return (
        <article
            onClick={openPost}
            className="cursor-pointer rounded-xl w-full max-w-[320px] h-[380px] sm:h-[420px] md:h-[450px] overflow-hidden bg-sky-900 p-4 border border-sky-950/30 backdrop-blur-sm flex flex-col hover:bg-sky-800 hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto"
        >
            <img
                src={imageUrl}
                alt={post.titulo}
                className="w-full h-40 sm:h-48 object-cover rounded-xl border border-sky-100/30 shrink-0"
            />

            <div className="pt-4 flex flex-col gap-2 flex-grow overflow-hidden">
                <h2 className="text-base sm:text-lg font-bold text-sky-100 line-clamp-2">
                    {post.titulo}
                </h2>

                <p className="text-xs sm:text-sm text-sky-100 line-clamp-3 md:line-clamp-4">
                    {post.descricao}
                </p>
            </div>

            <time className="text-[10px] sm:text-xs text-sky-100/80 mt-auto pt-2 shrink-0 border-t border-sky-100/10">
                {data}
            </time>
        </article>
    );
}