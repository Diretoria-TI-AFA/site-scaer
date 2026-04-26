

export default function Esquadroes() {
    return (
        <>
            <div>
                <img src="/banner_esq.png" alt="Esquadrões do CCAER" className="object-cover object-top w-full max-h-[55rem]" />
            </div>
            <div className="w-full h-full flex justify-center items-center bg-sky-950">
                <div className="flex gap-4 justify-between items-top pt-12 mx-auto h-full pt-auto px-12 bg-sky-950">
                    <div className="justify-center">
                        <img className="rounded-full" src="/ath.svg" alt="Athos" />
                        <h2 className="text-auto sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-bold text-white ">Quarto Esquadrão</h2>
                    </div>
                    <div className="justify-center">
                        <img className="rounded-full" src="/uir.svg" alt="Uiraçu" />
                        <h2 className="text-auto sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-bold text-white ">Terceiro Esquadrão</h2>
                    </div>
                    <div className="justify-center">
                        <img className="rounded-full" src="/prs.svg" alt="Perseu" />
                        <h2 className="text-auto sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-bold text-white ">Segundo Esquadrão</h2>
                    </div>
                    <div className="justify-center">
                        <img className="rounded-full" src="/drk.svg" alt="Drakon" />
                        <h2 className="text-auto sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center font-bold text-white ">Primeiro Esquadrão</h2>
                    </div>
                </div>
            </div>
            <div className="h-auto">
                <img src="/esquadroesccaer.png" alt="Esquadrões do CCAER" />
            </div>
        </>
    )
}