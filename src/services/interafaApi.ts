import pb from "../services/pocketbase";

export type TeamId = "DRK" | "ATH" | "URC" | "PRS";

export type InterafaRecord = {
    id: string;
    modalidade: string;
    ordem: number;
    primeiro?: TeamId;
    segundo?: TeamId;
    terceiro?: TeamId;
    quarto?: TeamId;
    updated: string;
};

export async function getInterafaResults(): Promise<InterafaRecord[]> {
    const records = await pb.collection("interafa").getFullList({
        sort: "ordem",
        fields: "id,modalidade,ordem,primeiro,segundo,terceiro,quarto,updated",
    });

    return records as unknown as InterafaRecord[];
}