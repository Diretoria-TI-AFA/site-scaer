import { useParams, useNavigate } from "react-router-dom";
import { SPORTS_CONFIG } from "../src/data/sportsConfig";
import { Scoreboard } from "../components/Scoreboard";

export function SportResultsPage() {
    const { sportId } = useParams();
    const navigate = useNavigate();

    const selectedSport = sportId
        ? SPORTS_CONFIG.find((s) => s.id.toLowerCase() === sportId.toLowerCase())
        : null;

    if (!selectedSport) {
        return (
            <div className="min-h-screen bg-sky-950 px-4 py-10 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-3xl font-bold">Esporte não encontrado</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 rounded-2xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400 cursor-pointer"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Scoreboard
            sport={selectedSport}
            onBack={() => navigate(-1)}
        />
    );
}