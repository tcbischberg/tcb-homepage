import type { SponsorQuery } from '../../tina/__generated__/types';

export default function Sponsor(props: Readonly<{ data: SponsorQuery }>) {
  const { sponsor } = props.data;
  return (
    <div className="max-w-[70%] m-auto">
      <a href={sponsor.link ?? undefined} target="_blank" rel="noreferrer">
        <h3>{sponsor.name}</h3>
        <img src={sponsor.logo ?? undefined} alt={sponsor.name ?? undefined} />
      </a>
    </div>
  );
}
