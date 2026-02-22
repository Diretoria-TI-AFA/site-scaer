export interface Post {
    post: Post;
    id: string;
    collectionId: string;
    conteudo: string;
    titulo: string;
    descricao: string;
    capa: string;
    categoria: string;
    destaque: boolean;
    data_publicacao: string;
    slug: string;
    ativo: boolean;
}

export interface Clube {
    id: string;
    collectionId: string;
    nome: string;
    descricao: string;
    bolacha: string;
    presidente: string;
}

export interface Foto {
    id: string;
    collectionId: string;
    titulo: string;
    imagem: string;
    album: string;
    ordem: number;
    ativo: boolean;
}