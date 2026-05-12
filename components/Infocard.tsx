import { getImageUrl } from "../src/services/fileUrl";
import type { Post } from "../src/types";
import { useNavigate } from "react-router-dom";

interface StaticProps {
    post?: undefined;
    title: string;
    description: string;
    image: string;
    redirectTo: string;
    variant?: "post" | "interafa";
}

interface PostProps {
    post: Post;
    title?: undefined;
    description?: undefined;
    image?: undefined;
    redirectTo?: undefined;
    variant?: undefined;
}

type Props = StaticProps | PostProps;

export default function Infocard(props: Props) {
    const navigate = useNavigate();

    if (props.post) {
        const { post } = props;
        const imageUrl = getImageUrl(post, post.capa, "800x600");
        const data = new Date(post.data_publicacao).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

        return (
            <article
                onClick={() => navigate(`/post?p=${post.id}`)}
                className="cursor-pointer rounded-xl w-full max-w-[320px] h-[380px] sm:h-[420px] md:h-[450px] overflow-hidden bg-sky-900 p-4 border border-sky-950/30 backdrop-blur-sm flex flex-col hover:bg-sky-800 hover:scale-105 hover:shadow-xl transition-all duration-300 mx-auto"
            >
                <img
                    src={imageUrl}
                    alt={post.titulo}
                    className="w-full h-40 sm:h-50vh object-cover rounded-xl border border-sky-100/30 shrink-0"
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

    const {
        title,
        description,
        image,
        redirectTo,
        variant = "post",
    } = props;

    const isInterafa = variant === "interafa";

    const cardClass = isInterafa
        ? "bg-gradient-to-br from-green-600 via-yellow-400 to-blue-600 border-4 border-yellow-300 hover:scale-105 hover:shadow-2xl"
        : "bg-sky-900 border border-sky-950/30 hover:bg-sky-800 hover:shadow-xl";

    const textTitleClass = isInterafa ? "text-sky-950" : "text-sky-100";
    const textDescriptionClass = isInterafa ? "text-sky-950/90" : "text-sky-100";
    const imageBorderClass = isInterafa ? "border-yellow-200/80" : "border-sky-100/30";

    return (
        <article
            onClick={() => navigate(redirectTo)}
            className={`cursor-pointer rounded-xl w-full max-w-[320px] h-[380px] sm:h-[420px] md:h-[450px] overflow-hidden p-4 backdrop-blur-sm flex flex-col transition-all duration-300 mx-auto ${cardClass}`}
        >
            <img
                src={image}
                alt={title}
                className={`w-full h-40 sm:h-50vh object-cover rounded-xl border shrink-0 ${imageBorderClass}`}
            />

            <div className="pt-4 flex flex-col gap-2 flex-grow overflow-hidden">
                <h2 className={`text-base sm:text-lg font-bold line-clamp-2 ${textTitleClass}`}>
                    {title}
                </h2>
                <p className={`text-xs sm:text-sm line-clamp-3 md:line-clamp-4 ${textDescriptionClass}`}>
                    {description}
                </p>
            </div>

            {isInterafa && (
                <span className="mt-auto pt-2 text-xs text-center font-bold tracking-widest text-sky-950 uppercase">
                    LVIII INTERAFA - 12 A 18 DE MAIO
                </span>
            )}
        </article>
    );
}