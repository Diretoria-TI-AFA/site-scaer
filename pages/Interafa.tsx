import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePocketbase } from "../src/hooks/usePocketbase";
import { getInterafaResults, type InterafaRecord, type TeamId } from "../src/services/interafaApi";
import { SPORTS_CONFIG } from "../src/data/sportsConfig";
import { Scoreboard } from "../components/Scoreboard";
import { useNavigate } from "react-router-dom";

const TEAM_IDS = ["ATH", "URC", "PRS", "DRK"] as const;

const TEAM_META: Record<TeamId, { nome: string; escudo: string; classname: string }> = {
    ATH: { nome: "ATHOS", escudo: "/ath.svg", classname: "bg-yellow-400 text-white" },
    URC: { nome: "UIRAÇU", escudo: "/uir.svg", classname: "bg-red-500 text-white" },
    PRS: { nome: "PERSEU", escudo: "/prs.svg", classname: "bg-blue-500 text-white" },
    DRK: { nome: "DRAKON", escudo: "/drk.svg", classname: "bg-green-500 text-white" },
};

const TEAM_INFO = {
    ATH: { nome: "ATHOS", escudo: "/ath.svg" },
    URC: { nome: "UIRAÇU", escudo: "/uir.svg" },
    PRS: { nome: "PERSEU", escudo: "/prs.svg" },
    DRK: { nome: "DRAKON", escudo: "/drk.svg" },
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
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const sportParam = searchParams.get("esporte") || searchParams.get("sport");
    const selectedSport = sportParam
        ? SPORTS_CONFIG.find((s) => s.id.toLowerCase() === sportParam.toLowerCase())
        : null;

    const { data, loading } = usePocketbase(() => getInterafaResults());

    const modalidades = useMemo(() => {
        const map = new Map((data ?? []).map((item) => [normalize(item.modalidade), item]));

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
        return TEAM_IDS.reduce((acc, team) => {
            acc[team] = quadro.reduce((sum, modalidade) => {
                return sum + modalidade.pontos[team];
            }, 0);
            return acc;
        }, {} as Record<TeamId, number>);
    }, [quadro]);

    const ranking = useMemo(() => {
        return [...TEAM_IDS].sort((a, b) => totais[b] - totais[a]);
    }, [totais]);

    if (loading) {
        return (
            <div className="min-h-screen bg-sky-950 px-4 py-10 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 h-10 w-48 animate-pulse rounded-2xl bg-sky-100/10" />
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-28 animate-pulse rounded-3xl bg-sky-100/10" />
                        ))}
                    </div>
                    <div className="h-80 animate-pulse rounded-3xl bg-sky-100/10" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-950 px-4 py-8 text-white sm:px-6 lg:px-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                {/* Painel de esportes vindo do App.tsx */}
                <section className="flex flex-col gap-5">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200/70">
                            LVIII Interafa
                        </span>
                        <h1 className="text-3xl font-bold sm:text-4xl">
                            Painel de Esportes - INTERAFA
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {SPORTS_CONFIG.map((sport) => (
                            <button
                                key={sport.id}
                                type="button"
                                onClick={() => navigate(`/esporte/${sport.id}`)}
                                className="group block rounded-3xl border border-sky-100/10 bg-sky-100/5 p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-100/10"
                            >
                                <div className="flex flex-col items-center justify-center gap-5">
                                    <img
                                        src={sport.icon}
                                        alt={sport.name}
                                        className="h-20 w-20 object-contain brightness-0 invert transition duration-300 group-hover:scale-105"
                                    />
                                    <h2 className="text-3xl font-bold uppercase tracking-wide text-white">
                                        {sport.name}
                                    </h2>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Scoreboard do esporte selecionado */}
                {selectedSport ? (
                    <section className="rounded-3xl border border-sky-100/10 bg-sky-100/5 p-2">
                        <Scoreboard
                            sport={selectedSport}
                            onBack={() => {
                                searchParams.delete("esporte");
                                searchParams.delete("sport");
                                setSearchParams(searchParams);
                            }}
                        />
                    </section>
                ) : null}

                {/* Resultados */}
                <section className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold sm:text-4xl text-center">Resultados gerais</h1>
                </section>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {ranking.map((teamId, index) => (
                        <div
                            key={teamId}
                            className={`rounded-3xl border border-sky-100/10 p-5 ${TEAM_META[teamId].classname}`}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-4xl font-bold">{index + 1}º</span>
                                <span className="text-md">{totais[teamId]} pts</span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-3">
                                <img
                                    src={TEAM_META[teamId].escudo}
                                    alt={TEAM_META[teamId].nome}
                                    className="h-24 w-24 rounded-xl border border-sky-100/10 object-cover"
                                />
                                <span className="text-xl font-bold text-black">{TEAM_META[teamId].nome}</span>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="overflow-hidden rounded-3xl border border-sky-100/10 bg-sky-100/5">
                    <div className="border-b border-sky-100/10 px-5 py-4">
                        <h2 className="text-xl font-semibold">Quadro geral</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead className="bg-sky-950/70">
                                <tr>
                                    <th className="px-4 py-3 text-left">Modalidade</th>
                                    {TEAM_IDS.map((team) => (
                                        <th key={team} className="px-4 py-3 text-center">
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
                                            <td key={team} className="px-4 py-3 text-center">
                                                {item.pontos[team]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                <tr className="border-t border-sky-100/10 bg-sky-100/5 font-bold">
                                    <td className="px-4 py-4">TOTAL</td>
                                    {TEAM_IDS.map((team) => (
                                        <td key={team} className="px-4 py-4 text-center">
                                            {totais[team]}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <h1 className="text-3xl font-bold sm:text-4xl text-center">Resultados finais por esporte</h1>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {quadro.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl border border-sky-100/10 bg-sky-100/5 p-5"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{item.modalidade}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                {[
                                    { label: "1º", value: item.primeiro },
                                    { label: "2º", value: item.segundo },
                                    { label: "3º", value: item.terceiro },
                                    { label: "4º", value: item.quarto },
                                ].map((posicao) => {
                                    const team = posicao.value
                                        ? TEAM_INFO[posicao.value as keyof typeof TEAM_INFO]
                                        : null;

                                    return (
                                        <div
                                            key={posicao.label}
                                            className={`rounded-2xl p-3 ${getTeamBg(posicao.value)}`}
                                        >
                                            <p className="text-2xl font-bold opacity-80">{posicao.label}</p>

                                            {team ? (
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <img
                                                        src={team.escudo}
                                                        alt={team.nome}
                                                        className="h-16 w-16 object-contain"
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