import pb from "./pocketbase"
import type { Post } from "../types"

export async function getPosts(limite = 50) {
    const resultado = await pb.collection('posts').getList<Post>(1, limite, {
        filter: 'ativo = true',
        sort: '-data_publicacao',
    })
    return resultado.items;
}

export async function getPostsDestaque() {
    const resultado = await pb.collection('posts').getList<Post>(1, 3, {
        filter: 'ativo = true && destaque = true',
        sort: '-data_publicacao',
    });
    return resultado.items;
}

export async function getPostsPorCategoria(categoria: string) {
    const resultado = await pb.collection('posts').getList<Post>(1, 20, {
        filter: `ativo = true && categoria = "${categoria}"`,
        sort: '-data_publicacao',
    });
    return resultado.items;
}