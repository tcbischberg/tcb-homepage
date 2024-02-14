import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TeamNewsQuery } from '../../tina/__generated__/types';
import Carousel from './Carousel';

export default function TeamNews(props: { query: string; variables: object; data: TeamNewsQuery }) {
  const { data } = useTina(props);

  return (
    <article className="article">
      <header>
        <div className="text-center">{new Date(data.teamNews.createdAt).toLocaleDateString('de')}</div>
        <h2 id={data.teamNews.slug ?? ''}>
          <a href={data.teamNews.slug ? '#' + data.teamNews.slug : ''} className="no-underline">
            {data.teamNews.title}
          </a>
        </h2>
      </header>
      <main>
        <TinaMarkdown content={data?.teamNews?.body ?? { type: 'root', children: [] }} components={{ Carousel }} />
      </main>
      <hr />
    </article>
  );
}
