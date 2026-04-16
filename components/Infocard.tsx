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
            className="
        rounded-xl w-70 h-100 overflow-hidden bg-sky-100 p-4 border border-sky-950/30 backdrop-blu-xs flex flex-col
        hover:bg-indigo-200 transition duration-450"
        >
            <img
                src={imageUrl}
                alt={post.titulo}
                className="w-full h-48 object-cover rounded-2xl border border-sky-950/30"
            />
            <div className="p-4 flex flex-col gap-2 h-full">
                <h2 className="text-lg font-bold text-sky-950">
                    {post.titulo}
                </h2>
                <p className="text-sm text-sky-950">
                    {post.descricao}
                </p>
            </div>
            <time className="text-xs text-sky-950/80">
                {data}
            </time>
        </article>
    );
} 