import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePocketbase } from "../src/hooks/usePocketbase";
import {
    getInterafaResults,
    type InterafaRecord,
    type TeamId,
} from "../src/services/interafaApi";
import { SPORTS_CONFIG } from "../src/data/sportsConfig";
import { Scoreboard } from "../components/Scoreboard";

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
    const [mostrarQuadroGeral, setMostrarQuadroGeral] = useState(false);

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
            <div className="min-h-screen bg-sky-950 px-4 py-8 text-white sm:py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-6 h-8 w-40 animate-pulse rounded-2xl bg-sky-100/10 sm:mb-8 sm:h-10 sm:w-48" />

                    <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-24 animate-pulse rounded-2xl bg-sky-100/10 sm:h-28 sm:rounded-3xl"
                            />
                        ))}
                    </div>

                    <div className="h-64 animate-pulse rounded-2xl bg-sky-100/10 sm:h-80 sm:rounded-3xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-950 px-3 py-6 text-white sm:px-6 sm:py-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8">
                {/* Resultados */}
                <span className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/70 sm:text-sm">
                    LIII Interafa
                </span>

                <section className="flex flex-col gap-2">
                    <h1 className="text-center text-2xl font-bold sm:text-4xl">
                        Resultados gerais
                    </h1>
                </section>

                {/* Ranking geral */}
                <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                    {ranking.map((teamId, index) => (
                        <div
                            key={teamId}
                            className={`rounded-2xl border border-sky-100/10 p-3 sm:rounded-3xl sm:p-5 ${TEAM_META[teamId].classname}`}
                        >
                            <div className="mb-3 flex items-center justify-between sm:mb-4">
                                <span className="text-2xl font-bold sm:text-4xl">
                                    {index + 1}º
                                </span>

                                <span className="text-xs sm:text-md">
                                    {totais[teamId]} pts
                                </span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
                                <img
                                    src={TEAM_META[teamId].escudo}
                                    alt={TEAM_META[teamId].nome}
                                    className="h-14 w-14 rounded-xl border border-sky-100/10 object-cover sm:h-24 sm:w-24"
                                />

                                <span className="text-sm font-bold text-black sm:text-xl">
                                    {TEAM_META[teamId].nome}
                                </span>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Quadro geral minimizado por padrão */}
                <section className="overflow-hidden rounded-2xl border border-sky-100/10 bg-sky-100/5 sm:rounded-3xl">
                    <div className="flex flex-col gap-3 border-b border-sky-100/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <button
                            type="button"
                            aria-expanded={mostrarQuadroGeral}
                            aria-controls="quadro-geral-medalhas"
                            onClick={() => setMostrarQuadroGeral((atual) => !atual)}
                            className="rounded-2xl bg-sky-100 px-4 py-3 text-sm font-bold text-sky-950 transition hover:bg-white sm:px-5"
                        >
                            {mostrarQuadroGeral
                                ? "Ocultar quadro geral"
                                : "Clique aqui para ver o quadro geral"}
                        </button>
                    </div>

                    {mostrarQuadroGeral ? (
                        <div id="quadro-geral-medalhas" className="overflow-x-auto">
                            <table className="w-full table-fixed text-xs sm:min-w-[720px] sm:text-base">
                                <thead className="bg-sky-950/70">
                                    <tr>
                                        <th className="px-2 py-2 text-left sm:px-4 sm:py-3">
                                            Modalidade
                                        </th>

                                        {TEAM_IDS.map((team) => (
                                            <th
                                                key={team}
                                                className="px-2 py-2 text-center sm:px-4 sm:py-3"
                                            >
                                                {team}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {quadro.map((item) => (
                                        <tr key={item.id} className="border-t border-sky-100/10">
                                            <td className="px-2 py-2 leading-tight sm:px-4 sm:py-3">
                                                {item.modalidade}
                                            </td>

                                            {TEAM_IDS.map((team) => (
                                                <td
                                                    key={team}
                                                    className="px-2 py-2 text-center sm:px-4 sm:py-3"
                                                >
                                                    {item.pontos[team]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}

                                    <tr className="border-t border-sky-100/10 bg-sky-100/5 font-bold">
                                        <td className="px-2 py-3 sm:px-4 sm:py-4">TOTAL</td>

                                        {TEAM_IDS.map((team) => (
                                            <td
                                                key={team}
                                                className="px-2 py-3 text-center sm:px-4 sm:py-4"
                                            >
                                                {totais[team]}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </section>

                {/* Painel de esportes vindo do App.tsx */}
                <section className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1 className="text-2xl font-bold sm:text-4xl">
                            Painel de Esportes - INTERAFA
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
                        {SPORTS_CONFIG.map((sport) => (
                            <button
                                key={sport.id}
                                type="button"
                                onClick={() => navigate(`/esporte/${sport.id}`)}
                                className="group block rounded-2xl border border-sky-100/10 bg-sky-100/5 p-4 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-sky-100/10 sm:rounded-3xl sm:p-8"
                            >
                                <div className="flex flex-col items-center justify-center gap-3 sm:gap-5">
                                    <img
                                        src={sport.icon}
                                        alt={sport.name}
                                        className="h-10 w-10 object-contain brightness-0 invert transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
                                    />

                                    <h2 className="text-base font-bold uppercase tracking-wide text-white sm:text-3xl">
                                        {sport.name}
                                    </h2>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Scoreboard do esporte selecionado */}
                {selectedSport ? (
                    <section className="rounded-2xl border border-sky-100/10 bg-sky-100/5 p-2 sm:rounded-3xl">
                        <Scoreboard
                            sport={selectedSport}
                            onBack={() => {
                                const nextParams = new URLSearchParams(searchParams);
                                nextParams.delete("esporte");
                                nextParams.delete("sport");
                                setSearchParams(nextParams);
                            }}
                        />
                    </section>
                ) : null}

                <h1 className="text-center text-2xl font-bold sm:text-4xl">
                    Resultados finais por esporte
                </h1>

                {/* Resultados finais por esporte */}
                <section className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
                    {quadro.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-sky-100/10 bg-sky-100/5 p-3 sm:rounded-3xl sm:p-5"
                        >
                            <div className="mb-3 flex items-center justify-between sm:mb-4">
                                <h3 className="text-sm font-semibold leading-tight sm:text-lg">
                                    {item.modalidade}
                                </h3>
                            </div>

                            <div className="grid grid-cols-4 gap-1.5 text-xs sm:grid-cols-2 sm:gap-3 sm:text-sm">
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
                                            className={`rounded-xl p-2 sm:rounded-2xl sm:p-3 ${getTeamBg(posicao.value)}`}
                                        >
                                            <p className="text-sm font-bold opacity-80 sm:text-2xl">
                                                {posicao.label}
                                            </p>

                                            {team ? (
                                                <div className="flex flex-col items-center justify-center gap-1 sm:gap-3">
                                                    <img
                                                        src={team.escudo}
                                                        alt={team.nome}
                                                        className="h-6 w-6 object-contain sm:h-16 sm:w-16"
                                                    />

                                                    <p className="hidden font-semibold sm:block">
                                                        {team.nome}
                                                    </p>

                                                    <p className="block text-[10px] font-semibold leading-none sm:hidden">
                                                        {posicao.value}
                                                    </p>
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