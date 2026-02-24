

export default function Esquadroes() {
    return (
        <>
            <div>
                <img src="/banner_esq.png" alt="Esquadrões do CCAER" className="object-cover object-top w-screen max-h-[55rem]" />
            </div>
            <div className="mb-36 w-auto h-auto py-12 flex justify-center items-center bg-sky-950">
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
        </>
    )
}