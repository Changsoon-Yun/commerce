import { Helmet } from 'react-helmet-async';

interface IProps {
  title: string;
  desc: string;
}

export function Metatags({ title, desc }: IProps) {
  return (
    <Helmet>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <title>{title}</title>
    </Helmet>
  );
}
