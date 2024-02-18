import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Carousel from './Carousel';
import { useEffect, useMemo, useState } from 'react';
import client from '../../tina/__generated__/client';
import type { ArticleQuery } from '../../tina/__generated__/types';

export default function InternalArticle(props: { query: string; variables: object; data: ArticleQuery }) {
  const [articleQuery, setArticleQuery] = useState(undefined as ArticleQuery | undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined as unknown | undefined);

  useEffect(() => {
    const fetchContent = () => {
      setIsLoading(true);
      client.queries
        .article({
          relativePath: props.data.article._sys.relativePath,
        })
        .then((response) => {
          console.log({ response });
          setArticleQuery(response?.data ?? undefined);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    };
    fetchContent();
    // WARN: We should consider protecting against re-running this effect while the fetch is still in progress.
    //       But since the relativePath is not expected to change, we can ignore this for now.
  }, [props.data.article._sys.relativePath]);

  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

  const { data } = useTina({
    query: props.query,
    // HINT: force update of the returned data when the articleQuery was fetched
    variables: articleQuery ? { not: 'props.variables' } : props.variables,
    data: articleQuery ?? { article: { title: props.data.article.title } },
  });

  useEffect(() => {
    console.log({ articleQuery });
  }, [articleQuery]);

  return (
    <>
      <article className="article">
        <header>
          {data?.article?.createdAt && (
            <div className="text-center">{new Date(data.article.createdAt).toLocaleDateString('de')}</div>
          )}
          <h2 id={data?.article?.slug ?? ''}>
            <a href={data?.article?.slug ? '#' + data?.article?.slug : ''} className="no-underline">
              {data?.article?.title}
            </a>
          </h2>
        </header>
        <main>
          <noscript>
            <i className="block text-center">
              Wir verwenden JavaScript, um interne Artikel anzuzeigen. Bitte aktivieren Sie JavaScript in Ihrem Browser.
            </i>
          </noscript>
          {isLoading && (
            <div className="flex h-40 justify-center align-middle">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}
          {!!error && <i className="block text-center">Fehler beim Laden des Artikels</i>}
          <TinaMarkdown content={data?.article?.body ?? { type: 'root', children: [] }} components={{ Carousel }} />
        </main>
      </article>
      <hr />
    </>
  );
}
