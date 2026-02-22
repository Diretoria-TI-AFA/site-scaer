import pb from './pocketbase';

export async function getFotosPorAlbum(album: string) {
  const resultado = await pb.collection('fotos').getList(1, 100, {
    filter: `ativo = true && album = "${album}"`,
    sort: 'ordem',
  });
  return resultado.items;
}

export const getBanners = () => getFotosPorAlbum('banner');
export const getGaleria = () => getFotosPorAlbum('galeria');
