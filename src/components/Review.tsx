import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function Review(props: Readonly<{ query: string; variables: object; data: { review: { body?: any } } }>) {
  const { data } = useTina(props);

  return <TinaMarkdown content={data?.review?.body ?? []} />;
}
