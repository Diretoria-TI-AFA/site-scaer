import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabase = (sportId: string, eventId: string, tableType: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sportId || !eventId) {
            setLoading(false);
            return;
        }

        const tableName = tableType === 'matches' ? 'matches' : tableType === 'medals' ? 'medals' : 'rankings';

        const fetchData = async () => {
            setLoading(true);

            let query = supabase.from(tableName).select('*');

            if (sportId !== 'geral') {
                query = query.ilike('sport_id', sportId).eq('event_id', eventId);
            }

            if (tableName === 'matches') query = query.order('created_at', { ascending: true });
            else if (tableName === 'rankings') query = query.order('position', { ascending: true });
            else if (tableName === 'medals') query = query.order('position', { ascending: true });

            const { data: result, error } = await query;

            if (error) {
                console.error(`Error fetching data:`, error);
            } else {
                setData(result || []);
            }
            setLoading(false);
        };

        fetchData();

        const channel = supabase
            .channel('db-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: tableName, filter: sportId !== 'geral' ? `sport_id=eq.${sportId}` : undefined }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sportId, eventId, tableType]);

    return { data, loading };
};
