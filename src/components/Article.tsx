import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function Review(props: { query: string; variables: object; data: { article: { body?: any } } }) {
  const { data } = useTina(props);

  return <TinaMarkdown content={data?.article?.body ?? []} />;
}
