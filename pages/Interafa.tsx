

export default function Interafa() {
    return (
        <div className="bg-sky-950/40 backdrop-blur-xs border border-sky-50/35 p-6 rounded-4xl w-auto min-h-screen mt-36 mx-4 mb-2 text-center ">
            <div className="flex flex-col items-center justify-center" >
                <h1 className="text-2xl font-bold text-gray-200">Resultados</h1>
                <div className="flex items-center justify-between w-full gap-12 bg-sky-50/40 backdrop-blur-xs border border-sky-50/35 p-6 rounded-4xl" >
                    <div className="mx-auto">
                        <svg width="100" height="250" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="90" width="100" height="200" fill="#E0E0E0" />
                            <rect x="0" y="90" width="100" height="15" fill="#BDBDBD" />
                            <circle cx="50" cy="145" r="30" fill="#F5F5F5" />
                            <text x="50" y="230" font-family="sans-serif" font-size="40" font-weight="bold" fill="#9E9E9E" text-anchor="middle">2</text>
                            <image x="20" y="115" width="60" height="60" href="/uir.jpg" />
                        </svg>
                        <p className="text-gray-200">2º Lugar</p>
                    </div>
                    <div className="mx-auto">
                        <svg width="100" height="250" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="40" width="100" height="230" fill="#FFD700" />
                            <rect x="0" y="40" width="100" height="15" fill="#FDB931" />
                            <circle cx="50" cy="95" r="30" fill="#FFF8DC" />
                            <text x="50" y="180" font-family="sans-serif" font-size="40" font-weight="bold" fill="#DAA520" text-anchor="middle">1</text>
                            <image x="20" y="65" width="60" height="60" href="/ath.jpg" />
                        </svg>
                        <p className="text-gray-200">1º Lugar</p>
                    </div>
                    <div className="mx-auto">
                        <svg width="100" height="250" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="140" width="100" height="180" fill="#CD7F32" />
                            <rect x="0" y="140" width="100" height="15" fill="#A0522D" />
                            <circle cx="50" cy="185" r="25" fill="#D2B48C" />
                            <text x="50" y="240" font-family="sans-serif" font-size="30" font-weight="bold" fill="#8B4513" text-anchor="middle">3</text>
                            <image x="25" y="160" width="50" height="50" href="/prs.jpg" />
                        </svg>
                        <p className="text-gray-200">3º Lugar</p>
                    </div>
                    <div className="mx-auto">
                        <svg width="100" height="250" viewBox="0 0 100 250" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="140" width="100" height="230" fill="#f7c28eff" />
                            <rect x="0" y="140" width="100" height="15" fill="#ffeed6bb" />
                            <circle cx="50" cy="185" r="25" fill="#D2B48C" />
                            <text x="50" y="240" font-family="sans-serif" font-size="30" font-weight="bold" fill="#8B4513" text-anchor="middle">4</text>
                            <image x="25" y="160" width="50" height="50" href="/drk.jpg" />
                        </svg>
                        <p className="text-gray-200">4º Lugar</p>
                    </div>
                </div>
                <div className="flex flex-col gap-8 items-center justify-between bg-sky-50/40 backdrop-blur-xs border border-sky-50/35 p-6 rounded-4xl my-2 w-full ">
                    <div className="w-full mx-auto">
                        <p className="text-gray-200 font-bold text-2xl">Quadro horário</p>
                    </div>
                    <div className="w-full mx-auto">
                        <div className="flex gap-8 justify-between text-gray-200 h-120">
                            <p>Primeiro dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Segundo dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Terceiro dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Quarto dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Quinto dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Sexto dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                            <p>Sétimo dia<br></br>aqui ficarão os horários de cada competição do dia.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8 items-center justify-between bg-sky-50/40 backdrop-blur-xs border border-sky-50/35 p-6 rounded-4xl my-2 w-full ">
                    <div className="w-full mx-auto">
                        <p className="text-gray-200 font-bold text-2xl">Esportes</p>
                    </div>
                    <div className="w-full mx-auto">
                        <p className="text-gray-200 font-bold text-2xl">Nesta seção ficarão os resultados parciais e finais de cada esporte. atualizados em tempo real.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}