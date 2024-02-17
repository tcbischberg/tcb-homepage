import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Carousel from './Carousel';
import Directions from './Directions';

export default function Static(
  props: Readonly<{ query: string; variables: object; data: { static: { body?: any } } }>
) {
  const { data } = useTina(props);

  return <TinaMarkdown content={data?.static?.body ?? []} components={{ Carousel, Directions }} />;
}
