import { useMemo } from "react";
import { usePocketbase } from "../src/hooks/usePocketbase";
import { getInterafaResults, type InterafaRecord, type TeamId } from "../src/services/interafaApi";

const TEAM_IDS = ["ATH", "URC", "PRS", "DRK"] as const;

const TEAM_META: Record<TeamId, { nome: string; escudo: string; classname: string }> = {
    ATH: { nome: "ATHOS", escudo: "/ath.svg", classname: "bg-yellow-400 text-white" },
    URC: { nome: "UIRAÇU", escudo: "/uir.svg", classname: "bg-red-500 text-white" },
    PRS: { nome: "PERSEU", escudo: "/prs.svg", classname: "bg-blue-500 text-white" },
    DRK: { nome: "DRAKON", escudo: "/drk.svg", classname: "bg-green-500 text-white" },
};

const TEAM_INFO = {
    ATH: {
        nome: "ATHOS",
        escudo: "/ath.svg",
    },
    URC: {
        nome: "UIRAÇU",
        escudo: "/uir.svg",
    },
    PRS: {
        nome: "PERSEU",
        escudo: "/prs.svg",
    },
    DRK: {
        nome: "DRAKON",
        escudo: "/drk.svg",
    },
} as const;

const SPORT_ORDER = [
    "Atletismo",
    "Basquetebol",
    "Esgrima",
    "Futebol",
    "Judô",
    "Natação",
    "Orientação",
    "Pentatlo Militar",
    "Polo Aquático",
    "Tiro",
    "Triathlon",
    "Voleibol",
    "Torcida",
    "Escalada",
] as const;

const getTeamBg = (team?: string) => {
    switch (team) {
        case "ATH":
            return "bg-yellow-400 text-sky-950";
        case "URC":
            return "bg-red-500 text-white";
        case "PRS":
            return "bg-blue-500 text-white";
        case "DRK":
            return "bg-green-500 text-white";
        default:
            return "bg-sky-950/50 text-white";
    }
};

function createEmptyPoints() {
    return {
        DRK: 0,
        ATH: 0,
        URC: 0,
        PRS: 0,
    };
}

function normalize(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function getPoints(record: Partial<InterafaRecord>) {
    const points = createEmptyPoints();

    if (record.primeiro) points[record.primeiro] = 4;
    if (record.segundo) points[record.segundo] = 3;
    if (record.terceiro) points[record.terceiro] = 2;
    if (record.quarto) points[record.quarto] = 1;

    return points;
}

export default function Interafa() {
    const { data, loading } = usePocketbase(() => getInterafaResults());

    const modalidades = useMemo(() => {
        const map = new Map(
            (data ?? []).map((item) => [normalize(item.modalidade), item])
        );

        return SPORT_ORDER.map((nome, index) => {
            const found = map.get(normalize(nome));

            return {
                id: found?.id ?? nome,
                modalidade: nome,
                ordem: found?.ordem ?? index + 1,
                primeiro: found?.primeiro ?? undefined,
                segundo: found?.segundo ?? undefined,
                terceiro: found?.terceiro ?? undefined,
                quarto: found?.quarto ?? undefined,
                updated: found?.updated ?? "",
            };
        }).sort((a, b) => a.ordem - b.ordem);
    }, [data]);

    const quadro = useMemo(() => {
        return modalidades.map((item) => ({
            ...item,
            pontos: getPoints(item),
        }));
    }, [modalidades]);

    const totais = useMemo(() => {
        return TEAM_IDS.reduce(
            (acc, team) => {
                acc[team] = quadro.reduce((sum, modalidade) => {
                    return sum + modalidade.pontos[team];
                }, 0);
                return acc;
            },
            {} as Record<TeamId, number>
        );
    }, [quadro]);

    const ranking = useMemo(() => {
        return [...TEAM_IDS].sort((a, b) => totais[b] - totais[a]);
    }, [totais]);

    if (loading) {
        return (
            <div className="min-h-screen bg-sky-950 text-white px-4 py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="h-10 w-48 rounded-2xl bg-sky-100/10 animate-pulse mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-28 rounded-3xl bg-sky-100/10 animate-pulse"
                            />
                        ))}
                    </div>
                    <div className="h-80 rounded-3xl bg-sky-100/10 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-950 text-white px-4 py-8 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                    <span className="text-sky-200/70 text-sm uppercase tracking-[0.2em] font-semibold">
                        LVIII Interafa
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold">Resultados</h1>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {ranking.map((teamId, index) => (
                        <div
                            key={teamId}
                            className={`rounded-3xl border border-sky-100/10 p-5 ${TEAM_META[teamId].classname}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-4xl font-bold">{index + 1}º</span>
                                <span className="text-md">{totais[teamId]} pts</span>
                            </div>

                            <div className="flex flex-col justify-center items-center gap-3">
                                <img
                                    src={TEAM_META[teamId].escudo}
                                    alt={TEAM_META[teamId].nome}
                                    className="w-24 h-24 rounded-xl object-cover border border-sky-100/10"
                                />
                                <span className="text-xl text-black font-bold">{TEAM_META[teamId].nome}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="rounded-3xl border border-sky-100/10 bg-sky-100/5 overflow-hidden">
                    <div className="px-5 py-4 border-b border-sky-100/10">
                        <h2 className="text-xl font-semibold">Quadro geral</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead className="bg-sky-950/70">
                                <tr>
                                    <th className="text-left px-4 py-3">Modalidade</th>
                                    {TEAM_IDS.map((team) => (
                                        <th key={team} className="text-center px-4 py-3">
                                            {team}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {quadro.map((item) => (
                                    <tr key={item.id} className="border-t border-sky-100/10">
                                        <td className="px-4 py-3">{item.modalidade}</td>
                                        {TEAM_IDS.map((team) => (
                                            <td key={team} className="text-center px-4 py-3">
                                                {item.pontos[team]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                <tr className="border-t border-sky-100/10 bg-sky-100/5 font-bold">
                                    <td className="px-4 py-4">TOTAL</td>
                                    {TEAM_IDS.map((team) => (
                                        <td key={team} className="text-center px-4 py-4">
                                            {totais[team]}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <h1 className="text-3xl sm:text-4xl font-bold">PAINEL DE ESPORTES</h1>
                
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {quadro.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl border border-sky-100/10 bg-sky-100/5 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">{item.modalidade}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {[
                                    { label: "1º", value: item.primeiro },
                                    { label: "2º", value: item.segundo },
                                    { label: "3º", value: item.terceiro },
                                    { label: "4º", value: item.quarto },
                                ].map((posicao) => {
                                    const team = posicao.value ? TEAM_INFO[posicao.value as keyof typeof TEAM_INFO] : null;

                                    return (
                                        <div
                                            key={posicao.label}
                                            className={`rounded-2xl p-3 ${getTeamBg(posicao.value)}`}
                                        >
                                            <p className="text-2xl font-bold opacity-80">{posicao.label}</p>

                                            {team ? (
                                                <div className="flex flex-col justify-center items-center gap-3">
                                                    <img
                                                        src={team.escudo}
                                                        alt={team.nome}
                                                        className="w-16 h-16 object-contain"
                                                    />
                                                    <p className="font-semibold">{team.nome}</p>
                                                </div>
                                            ) : (
                                                <p className="font-semibold">—</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}