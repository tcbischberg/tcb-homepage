import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { ArticleQuery } from '../../tina/__generated__/types';

export default function Article(props: { query: string; variables: object; data: ArticleQuery }) {
  const { data } = useTina(props);

  return (
    <div className="article">
      <div className="text-center">{new Date(data.article.createdAt).toLocaleDateString('de')}</div>
      <h2>{data.article.title}</h2>
      <TinaMarkdown content={data?.article?.body ?? []} />
      <hr />
    </div>
  );
}
