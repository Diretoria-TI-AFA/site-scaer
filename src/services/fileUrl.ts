import pb from './pocketbase';

export function getImageUrl(record: any, nomeArquivo: string, thumb?: string) {
  if (!nomeArquivo) return '';
  return pb.files.getURL(record, nomeArquivo, { thumb });
}