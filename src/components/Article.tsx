import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import client from '../../tina/__generated__/client';
import type { ArticleQuery } from '../../tina/__generated__/types';

type ArticleResponse = Awaited<ReturnType<typeof client.queries.article>>;

export default function Article(props: { query: string; variables: object; data: ArticleQuery }) {
  const isPublicArticle = !props.data.article._sys.relativePath.startsWith('intern');

  const [articleResponse, setArticleResponse] = useState(undefined as ArticleResponse | undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined as unknown | undefined);

  useEffect(() => {
    if (isPublicArticle) {
      return;
    }
    if (props?.data) {
      setArticleResponse({
        query: props?.query ?? '',
        variables: props?.variables ?? { relativePath: props.relativePath },
        data: props?.data,
      });
      return;
    }
    const fetchContent = async () => {
      setIsLoading(true);
      const articleResponse = await client.queries
        .article({
          relativePath: props.relativePath,
        })
        .catch((error) => {
          setError(error);
        });
      setArticleResponse(articleResponse ?? undefined);
      setIsLoading(false);
    };
    fetchContent();
  }, [props.relativePath]);

  useEffect(() => {
    if (!error) return;
    console.error(error);
  }, [error]);

  const [ranFlickity, setRanFlickity] = useState(false);
  useEffect(() => {
    if (articleResponse?.data) return;
    if (ranFlickity) return;
    setRanFlickity(true);
    const script = document.createElement('script');
    const flickity = [...document.getElementsByTagName('script')].find((script) => script.id === 'flickity');
    script.src = flickity?.src ?? '';
    script.async = true;
    script.id = 'flickity-reload';

    setTimeout(() => {
      document.getElementById('flickity-reload')?.remove();
      document.body.appendChild(script);
    }, 100);
  }, [ranFlickity]);

  const { data } = useTina({
    query: props?.query ?? articleResponse?.query ?? '',
    variables: props?.variables ?? articleResponse?.variables ?? {},
    data: props?.data ?? articleResponse?.data ?? {},
  });

  return (
    <>
      {isLoading && (
        <div className="flex h-80 justify-center align-middle">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
      {error && <div className="error"></div>}
      {(!!articleResponse || !!props.data) && (
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
      )}
    </>
  );
}
