export interface TeamImages {
    [key: string]: string;
}

export const TEAMS_IMAGES: TeamImages = {
    PERSEU: "/prs.svg",
    UIRAÇU: "/uir.svg",
    ATHOS: "/ath.svg",
    DRAKON: "/drk.svg",
};

export const TEAM_GRADIENTS: { [key: string]: string } = {
    PERSEU: "linear-gradient(90deg, #02091E, #12326F)",
    UIRAÇU: "linear-gradient(90deg, #3A0202, #FF301A)",
    ATHOS: "linear-gradient(90deg, #3E2C00, #F4B000)",
    DRAKON: "linear-gradient(90deg, #00331C, #00A86B)", // Ajustar cor se necessário
};

export const AVAILABLE_TEAMS = ["", "ATHOS", "UIRAÇU", "PERSEU", "DRAKON"];
export const GENERAL_TEAMS = ["ATHOS", "UIRAÇU", "PERSEU", "DRAKON"];

export type TableType = "ranking" | "matches" | "medals";

export interface SportEvent {
    id: string;
    name: string;
    tableType: TableType;
}

export interface SportConfig {
    id: string;
    name: string;
    icon: string;
    url: string;
    events: SportEvent[];
}

export const SPORTS_CONFIG: SportConfig[] = [
    {
        id: "atletismo",
        name: "Atletismo",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/ath.png",
        url: "https://script.google.com/macros/s/AKfycbyMjdH28bWj3thrN2Jlw4QAmDV_kuMqGjn5NpATUDS1pD2139ckI81SfZA6gmjUpLJfVg/exec",
        events: [
        ]
    },
    {
        id: "basquete",
        name: "Basquete",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/bkb.png",
        url: "https://script.google.com/macros/s/AKfycbwRgr8UWVd0plX2seoRdbGuLlhOpKP8H7OxV0mFs23BFXW0x6CHaunV4cJXPC4XLMxDEQ/exec",
        events: [
            { id: "basquete", name: "Partidas", tableType: "matches" }
        ]
    },
    {
        id: "futebol",
        name: "Futebol",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/fbl.png",
        url: "https://script.google.com/macros/s/AKfycbwtbBVunCtwJ4rPgQAaUwE6XBul0Zqt7xkYOi6X_qcfo_3HERKw3wtlUO4VgBWY-1XeDQ/exec",
        events: [
            { id: "futebol", name: "Partidas", tableType: "matches" }
        ]
    },
    {
        id: "judo",
        name: "Judô",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/jud.png",
        url: "https://script.google.com/macros/s/AKfycbw2UC7MrAdT73C6Zk6bE9jEiwuEKm94I52UcNceo9QbadNrRBPrwwH6h__MdQHVYLTqDA/exec",
        events: [
        ]
    },
    {
        id: "esgrima",
        name: "Esgrima",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/fen.png",
        url: "",
        events: [
        ]
    },
    {
        id: "natacao",
        name: "Natação",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/swm.png",
        url: "https://script.google.com/macros/s/AKfycbwG514pg936nGsjwHxWkTeGtDKijgDTNlS6l7wL1fh0F0cqOsSHoiUVdkZ_3onX6K2cpg/exec",
        events: [
        ]
    },
    {
        id: "orientacao",
        name: "Orientação",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/ChatGPT-Image-15-de-jul.-de-2025-14_26_32-1.png",
        url: "https://script.google.com/macros/s/AKfycbwojdwUV6saeIrTGAnpTCLuwTRYW6aQz7jqjMHEHZKh4j9jicDRHLq1UhOcLIDm3VoC9g/exec",
        events: [
        ]
    },
    {
        id: "pentatlo",
        name: "Pentatlo",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/mpn.png",
        url: "https://script.google.com/macros/s/AKfycbwQHydiGtkQgKQIShys73GBIgm8cULESubEJe1Vj-avtBICcJfVZEz1FkfLpzw4tInSfg/exec",
        events: [
        ]
    },
    {
        id: "polo",
        name: "Polo Aquático",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/wpo.png",
        url: "https://script.google.com/macros/s/AKfycbxplaXp_QkqPO6vLBMoXkBdfELJLM1L3BInY_Kojgrzu7MNoJ4OodMc6_1qf9ardak/exec",
        events: [
            { id: "polo", name: "Partidas", tableType: "matches" }
        ]
    },
    {
        id: "tiro",
        name: "Tiro",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/sho.png",
        url: "https://script.google.com/macros/s/AKfycbxEOhlppGhGCZxkgKLzMTvnkl_vkNjbnmFJ2R3fUx0496KxZv2ILQX_SQ8ztSGqhwGO0A/exec",
        events: [
            { id: "pistola-ar", name: "Pistola de Ar", tableType: "ranking" },
            { id: "carabina-ar", name: "Carabina de Ar", tableType: "ranking" },
        ]
    },
    {
        id: "triathlon",
        name: "Triathlon",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/tri.png",
        url: "https://script.google.com/macros/s/AKfycbwUUArVYUalO2H736WESs1D985lGMU7TmPJiPt9ZuFi5_l5rH4heaxBnIge2QtpXggA0Q/exec",
        events: [
        ]
    },
    {
        id: "volei",
        name: "Vôlei",
        icon: "https://scaer.com.br/wp-content/uploads/2025/07/vvo.png",
        url: "https://script.google.com/macros/s/AKfycbxEOhlppGhGCZxkgKLzMTvnkl_vkNjbnmFJ2R3fUx0496KxZv2ILQX_SQ8ztSGqhwGO0A/exec",
        events: [
            { id: "volei", name: "Partidas", tableType: "matches" }
        ]
    },
    {
        id: "escalada",
        name: "Escalada",
        icon: "/escalada.png",
        url: "",
        events: [
        ]
    }
];
