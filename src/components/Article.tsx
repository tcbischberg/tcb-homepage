import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Carousel from './Carousel';
import type { ArticleQuery } from '../../tina/__generated__/types';
import { shouldShowInternalArticles } from '../helper';
import Login from './Login';

export default function Article(props: { query: string; variables: object; data: ArticleQuery }) {
  const { data } = useTina(props);

  if (shouldShowInternalArticles && props.data.article.internal) {
    return <Login />;
  }

  return (
    <>
      <article className="article">
        <header>
          <div className="text-center">{new Date(data?.article?.createdAt).toLocaleDateString('de')}</div>
          <h2 id={data?.article?.slug ?? ''}>
            <a href={data?.article?.slug ? '#' + data?.article?.slug : ''} className="no-underline">
              {data?.article?.title}
            </a>
          </h2>
        </header>
        <main>
          <TinaMarkdown content={data?.article?.body ?? { type: 'root', children: [] }} components={{ Carousel }} />
        </main>
      </article>
      <hr />
    </>
  );
}
