

export default function Esquadroes() {
    return (
        <div className="mt-36 mx-12 w-auto mb-6 rounded-4xl border-sky-50/40 border h-auto py-12 flex justify-center items-center bg-sky-950 backdrop-blur-xs">
            <div className="flex gap-8 justify-between items-center w-full h-full pt-auto px-36">
                <div>
                    <img className="rounded-full" src="/ath.svg" alt="Athos" />
                    <h2 className="text-auto lg:text-3xl text-center font-bold text-white ">Quarto Esquadrão</h2>
                </div>
                <div>
                    <img className="rounded-full" src="/uir.svg" alt="Uiraçu" />
                    <h2 className="text-auto lg:text-3xl text-center font-bold text-white ">Terceiro Esquadrão</h2>
                </div>
                <div>
                    <img className="rounded-full" src="/prs.svg" alt="Perseu" />
                    <h2 className="text-auto lg:text-3xl text-center font-bold text-white ">Segundo Esquadrão</h2>
                </div>
                <div>
                    <img className="rounded-full" src="/drk.svg" alt="Drakon" />
                    <h2 className="text-auto lg:text-3xl text-center font-bold text-white ">Primeiro Esquadrão</h2>
                </div>
            </div>
        </div>
    )
}