import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function Static(props: Readonly<{ query: string; variables: object; data: { static: { body?: any } } }>) {
  const { data } = useTina(props);

  return <TinaMarkdown content={data?.static?.body ?? []} />;
}
