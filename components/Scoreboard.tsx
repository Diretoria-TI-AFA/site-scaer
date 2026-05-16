import React, { useMemo, useState } from 'react';
import {
    TEAMS_IMAGES,
    TEAM_GRADIENTS,
    SPORTS_CONFIG,
    AVAILABLE_TEAMS,
} from '../src/data/sportsConfig';
import type { SportConfig } from '../src/data/sportsConfig';
import { useSupabase } from '../src/hooks/useSupabase';
import { useCustomEvents } from '../src/hooks/useCustomEvents';

interface ScoreboardProps {
    sport: SportConfig;
    onBack: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ sport, onBack }) => {
    const customEvents = useCustomEvents(sport.id);
    const allEvents = useMemo(() => [...sport.events, ...customEvents], [sport.events, customEvents]);

    const [activeEvent, setActiveEvent] = useState(allEvents[0]?.id || '');
    const currentEvent = allEvents.find((e) => e.id === activeEvent);

    React.useEffect(() => {
        if (!activeEvent && allEvents.length > 0) {
            setActiveEvent(allEvents[0].id);
        }
    }, [allEvents, activeEvent]);

    const { data, loading } = useSupabase(
        sport.id,
        activeEvent,
        currentEvent?.tableType || 'matches'
    );

    const getTeamImage = (teamName: string) => {
        return TEAMS_IMAGES[teamName?.toUpperCase()] || '';
    };

    const tableBaseClass =
        'w-full max-w-[1000px] mx-auto mt-5 border-collapse overflow-hidden rounded-[12px] bg-[#024a70] shadow-[0_8px_30px_rgba(0,0,0,0.08)]';

    const cellBaseClass =
        'border-b border-[#eeeeee] px-[15px] py-[15px] text-center max-[600px]:px-[5px] max-[600px]:py-[10px]';

    const headBaseClass =
        "border-b border-[#eeeeee] bg-[#031b2b] px-[15px] py-[15px] text-center font-['Bebas_Neue'] text-[20px] tracking-[1px] text-white max-[600px]:px-[5px] max-[600px]:py-[10px]";

    const renderRankingTable = () => {
        const hasMarks = data.some(item => item.time_mark && item.time_mark.trim() !== '');

        return (
            <table className={tableBaseClass}>
                <thead>
                    <tr>
                        <th
                            colSpan={hasMarks ? 4 : 3}
                            className={`${headBaseClass} text-[24px] max-[600px]:text-[18px]`}
                        >
                            {currentEvent?.name}
                        </th>
                    </tr>
                    <tr>
                        <th className={headBaseClass}>Posição</th>
                        <th className={headBaseClass}>Atleta</th>
                        {hasMarks && <th className={headBaseClass}>Tempo / Marca</th>}
                        <th className={headBaseClass}>Equipe</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const gradient = TEAM_GRADIENTS[item.team?.toUpperCase()];

                        return (
                            <tr
                                key={index}
                                className="transition-colors hover:bg-[#00598a]"
                                style={gradient ? { backgroundImage: gradient, color: 'white' } : undefined}
                            >
                                <td className={cellBaseClass}>{item.position}º</td>
                                <td className={cellBaseClass}>{item.athlete}</td>
                                {hasMarks && <td className={cellBaseClass}>{item.time_mark || '-'}</td>}
                                <td className={`${cellBaseClass} font-medium`}>
                                    {getTeamImage(item.team) ? (
                                        <img
                                            src={getTeamImage(item.team)}
                                            alt={item.team}
                                            title={item.team}
                                            className="mx-auto h-[44px] object-contain align-middle max-[600px]:h-[32px]"
                                        />
                                    ) : (
                                        item.team
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const renderMatchesTable = () => {
        return (
            <table className={tableBaseClass}>
                <thead>
                    <tr>
                        <th
                            colSpan={3}
                            className={`${headBaseClass} text-[24px] max-[600px]:text-[18px]`}
                        >
                            Partidas - {currentEvent?.name}
                        </th>
                    </tr>
                    <tr>
                        <th className={headBaseClass}>Jogo</th>
                        <th className={headBaseClass}>Confronto</th>
                        <th className={headBaseClass}>Placar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="transition-colors hover:bg-[#00598a]">
                            <td
                                className={`${cellBaseClass} whitespace-nowrap text-[24px] max-[600px]:text-[16px]`}
                            >
                                {item.match_number}
                            </td>

                            <td className={cellBaseClass}>
                                <div className="flex flex-wrap items-center justify-center gap-[10px] max-[600px]:gap-[5px]">
                                    {getTeamImage(item.team1) ? (
                                        <img
                                            src={getTeamImage(item.team1)}
                                            alt={item.team1}
                                            className="h-[44px] object-contain max-[600px]:h-[32px]"
                                        />
                                    ) : (
                                        <span>{item.team1}</span>
                                    )}

                                    <span className="font-bold">vs</span>

                                    {getTeamImage(item.team2) ? (
                                        <img
                                            src={getTeamImage(item.team2)}
                                            alt={item.team2}
                                            className="h-[44px] object-contain max-[600px]:h-[32px]"
                                        />
                                    ) : (
                                        <span>{item.team2}</span>
                                    )}
                                </div>
                            </td>

                            <td
                                className={`${cellBaseClass} whitespace-nowrap text-[24px] font-bold max-[600px]:text-[18px]`}
                            >
                                {item.score1} x {item.score2}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderMedalsTable = () => {
        if (sport.id === 'geral') {
            const sportsList = SPORTS_CONFIG.filter((s) => s.id !== 'geral');
            const teamsList = AVAILABLE_TEAMS.filter((t) => t);

            const teamScores = teamsList
                .map((team) => {
                    let totalPoints = 0;
                    const resultsBySport: Record<string, number | null> = {};

                    sportsList.forEach((s) => {
                        const sportMedals = data.filter((m) => m.sport_id === s.id && m.team === team);
                        let sportPoints = 0;
                        let bestPosition = 99;

                        sportMedals.forEach((m) => {
                            sportPoints += m.points || 0;
                            if (m.position < bestPosition) bestPosition = m.position;
                        });

                        totalPoints += sportPoints;
                        resultsBySport[s.id] = bestPosition === 99 ? null : bestPosition;
                    });

                    return { team, totalPoints, resultsBySport };
                })
                .sort((a, b) => b.totalPoints - a.totalPoints);

            return (
                <div className="w-full overflow-x-auto">
                    <table className={`${tableBaseClass} whitespace-nowrap`}>
                        <thead>
                            <tr>
                                <th className={`${headBaseClass} pl-[15px] text-left`}>Equipe</th>

                                {sportsList.map((s) => (
                                    <th
                                        key={s.id}
                                        className={`${headBaseClass} h-[120px] px-[5px] py-[10px] text-[14px] [writing-mode:vertical-rl] rotate-180`}
                                    >
                                        {s.name}
                                    </th>
                                ))}

                                <th className={headBaseClass}>Total Pts</th>
                            </tr>
                        </thead>

                        <tbody>
                            {teamScores.map((ts) => (
                                <tr key={ts.team} className="transition-colors hover:bg-[#00598a]">
                                    <td className={`${cellBaseClass} pl-[15px] text-left`}>
                                        <div className="flex items-center gap-[10px]">
                                            {getTeamImage(ts.team) ? (
                                                <img
                                                    src={getTeamImage(ts.team)}
                                                    alt={ts.team}
                                                    className="mr-[10px] h-10 align-middle"
                                                />
                                            ) : null}
                                            <span className="font-bold">{ts.team}</span>
                                        </div>
                                    </td>

                                    {sportsList.map((s) => {
                                        const pos = ts.resultsBySport[s.id];

                                        return (
                                            <td key={s.id} className={`${cellBaseClass} text-[20px]`}>
                                                {pos === 1 ? '🥇' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : pos === 4 ? '4º' : '-'}
                                            </td>
                                        );
                                    })}

                                    <td className={`${cellBaseClass} text-[20px] font-bold`}>{ts.totalPoints}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <table className={tableBaseClass}>
                <thead>
                    <tr>
                        <th
                            colSpan={3}
                            className={`${headBaseClass} text-[24px] max-[600px]:text-[18px]`}
                        >
                            Resultados - {currentEvent?.name}
                        </th>
                    </tr>
                    <tr>
                        <th className={headBaseClass}>Colocação</th>
                        <th className={headBaseClass}>Equipe</th>
                        <th className={headBaseClass}>Pontos</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="transition-colors hover:bg-[#00598a]">
                            <td className={`${cellBaseClass} text-[24px]`}>
                                {item.position === 1
                                    ? '🥇 1º'
                                    : item.position === 2
                                        ? '🥈 2º'
                                        : item.position === 3
                                            ? '🥉 3º'
                                            : '4º'}
                            </td>

                            <td className={cellBaseClass}>
                                <div className="flex items-center justify-center gap-[10px]">
                                    {getTeamImage(item.team) ? (
                                        <img src={getTeamImage(item.team)} alt={item.team} className="h-10" />
                                    ) : null}
                                    <span>{item.team}</span>
                                </div>
                            </td>

                            <td className={`${cellBaseClass} text-[20px] font-bold`}>
                                {item.points} pts
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="min-h-screen bg-[#052f4a] font-['Inter'] text-white antialiased">
            <div className="mx-auto w-full max-w-[1000px] px-5 py-10 max-[600px]:px-[10px] max-[600px]:py-[15px]">
                <button
                    type="button"
                    onClick={onBack}
                    className="relative z-50 pointer-events-auto mb-5 inline-flex cursor-pointer items-center gap-2 rounded-[8px] bg-[#024a70] px-5 py-2.5 font-['Bebas_Neue'] text-[18px] tracking-[1px] text-white transition-all duration-300 hover:-translate-x-1 hover:bg-[#00598a]"
                >
                    ← Voltar
                </button>

                <div className="mb-[30px] flex items-center gap-5 max-[600px]:flex-col max-[600px]:gap-[10px] max-[600px]:text-center">
                    <img
                        src={sport.icon}
                        alt={sport.name}
                        className="h-[60px] w-[60px] object-contain brightness-0 invert max-[600px]:h-[50px] max-[600px]:w-[50px]"
                    />
                    <h1 className="font-['Bebas_Neue'] text-[40px] uppercase tracking-[2px] text-white max-[600px]:text-[28px] max-[600px]:tracking-[1px]">
                        {sport.name} - Resultados
                    </h1>
                </div>

                <div className="mx-auto mb-4 mt-6 flex max-w-[1000px] flex-wrap justify-center gap-[10px]">
                    {allEvents.map((event) => {
                        const isActive = activeEvent === event.id;

                        return (
                            <button
                                key={event.id}
                                onClick={() => setActiveEvent(event.id)}
                                className={[
                                    "cursor-pointer rounded-[10px] border px-4 py-2.5 font-['Bebas_Neue'] text-[18px] tracking-[0.5px] text-white transition-all duration-200 hover:-translate-y-px max-[600px]:px-3 max-[600px]:py-2 max-[600px]:text-[14px]",
                                    isActive
                                        ? 'border-[#024a70] bg-[#024a70]'
                                        : 'border-[#024a70] bg-[#024a70]/80',
                                ].join(' ')}
                            >
                                {event.name}
                            </button>
                        );
                    })}
                </div>

                {loading ? (
                    <div className="py-10 text-center font-['Bebas_Neue'] text-[24px] tracking-[2px] text-white">
                        Carregando Resultados...
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto rounded-[12px] [-webkit-overflow-scrolling:touch]">
                        {currentEvent?.tableType === 'matches' && renderMatchesTable()}
                        {currentEvent?.tableType === 'ranking' && renderRankingTable()}
                        {currentEvent?.tableType === 'medals' && renderMedalsTable()}
                    </div>
                )}
            </div>
        </div>
    );
};