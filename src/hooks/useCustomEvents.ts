import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CustomEvent {
    id: string;
    name: string;
    tableType: 'ranking' | 'matches' | 'medals';
}

export const useCustomEvents = (sportId: string) => {
    const [customEvents, setCustomEvents] = useState<CustomEvent[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!sportId) return;

            // 1. Tentar buscar na tabela de eventos customizados
            const { data: customData, error: customError } = await supabase
                .from('custom_events')
                .select('*')
                .ilike('sport_id', sportId);

            if (!customError && customData && customData.length > 0) {
                setCustomEvents(customData.map(d => ({
                    id: d.id,
                    name: d.name,
                    tableType: d.table_type as any
                })));
                return;
            }

            // 2. Fallback Automático: Procurar em todas as tabelas de resultados
            const tables: ('rankings' | 'matches' | 'medals')[] = ['rankings', 'matches', 'medals'];
            const discoveredEvents: CustomEvent[] = [];

            await Promise.all(tables.map(async (table) => {
                const type = table === 'rankings' ? 'ranking' : table === 'matches' ? 'matches' : 'medals';
                const { data } = await supabase
                    .from(table)
                    .select('event_id')
                    .ilike('sport_id', sportId);

                if (data && data.length > 0) {
                    const uniqueIds = [...new Set(data.map(d => d.event_id))];
                    uniqueIds.forEach(id => {
                        // Filtro específico para o Judô sugerido pelo usuário
                        if (sportId.toLowerCase() === 'judo') {
                            const idLower = id.toLowerCase();
                            if (idLower === 'geral' || idLower.includes('teste') || id.length > 20) {
                                return; // Pula eventos de teste ou IDs genéricos no Judô
                            }
                        }

                        if (!discoveredEvents.find(e => e.id === id)) {
                            discoveredEvents.push({
                                id: id,
                                name: id,
                                tableType: type as any
                            });
                        }
                    });
                }
            }));

            setCustomEvents(discoveredEvents);
        };

        fetchEvents();

        const channel = supabase
            .channel('custom-events-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_events', filter: `sport_id=eq.${sportId}` }, () => {
                fetchEvents();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sportId]);

    return customEvents;
};
