import { getImageUrl } from "../src/services/fileUrl";
import type { Clube } from "../src/types"

interface Props {
    clube: Clube
}

export default function Infoclubscards({ clube }: Props) {
    return (
        <article className="flex flex-col h-full">
            <div className="w-72 h-72 flex items-center justify-center">
                <img
                    src={getImageUrl(clube, clube.bolacha, '300x300')}
                    alt={clube.nome}
                    className="w-full h-full object-contain"
                />
            </div>
            <h3 className="text-white text-md font-bold text-center mt-4">{clube.nome}</h3>
            <p className="text-white text-sm text-center mt-1">{clube.descricao}</p>
            <p className="text-gray-300 text-xs text-center mt-auto ">{clube.presidente}</p>
        </article>
    )
} 