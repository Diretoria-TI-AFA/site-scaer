import { useSearchParams } from "react-router-dom";
import { usePocketbase } from "../src/hooks/usePocketbase";
import pb from "../src/services/pocketbase";
import { getImageUrl } from "../src/services/fileUrl";
import type { Post } from "../src/types";

async function getPostPorId(id: string): Promise<Post> {
    return pb.collection('posts').getOne<Post>(id);
}

export default function PostPage() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('p');

    const { data: post, loading, error } = usePocketbase(() => {
        if (!id) return Promise.resolve(null);
        return getPostPorId(id);
    });
    console.log('ID da URL:', id);
    console.log('Post:', post);
    console.log('Erro:', error);

    if (!id) {
        return <p className="text-white text-center py-20">Post não encontrado.</p>;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-white text-8xl text-center">Carregando...</p>
            </div>
        );
    }

    if (error || !post) {
        return <p className="text-red-400 text-center py-20">Erro ao carregar post.</p>;
    }

    const imagemUrl = getImageUrl(post, post.capa, '1200x600');

    const data = new Date(post.data_publicacao).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <main className="mx-auto w-full h-auto flex-col bg-sky-950">
            <img src={imagemUrl} alt={post.titulo} className="w-full max-h-[50rem] object-cover object-center" />
            <h1 className="text-3xl xl:px-56 lg:px-42 md:px-24 sm:px-12 font-bold text-white text-center pt-12 ">
                {post.titulo}
            </h1>
            <div className="pt-4 text-gray-200 prose-p:my-0 xl:px-56 lg:px-42 md:px-24 sm:px-12 text-base leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: post.conteudo }} />
            <time className="text-lg xl:px-56 lg:px-42 md:px-24 sm:px-12 text-gray-300">{data}</time>
            <div className="h-15" />
        </main>
    );
}