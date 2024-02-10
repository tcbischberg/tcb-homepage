import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { ArticleQuery } from '../../tina/__generated__/types';
import Carousel from './Carousel';

export default function Article(props: { query: string; variables: object; data: ArticleQuery }) {
  const { data } = useTina(props);

  return (<>
    <div className="article">
      <div className="text-center">{new Date(data.article.createdAt).toLocaleDateString('de')}</div>
      <h2 id={data.article.slug ?? ''}><a href={data.article.slug ? '#' + data.article.slug : ''} className="no-underline">{data.article.title}</a></h2>
      <TinaMarkdown content={data?.article?.body ?? { type: 'root', children: [] }} components={{ Carousel }} />
      <hr />
      <Carousel images={["/uploads/2022_generationenturnier/gewinner.jpg", "/uploads/2022_generationenturnier/ergebnisse.jpg"]} />
    </div>
  </>
  );
}
