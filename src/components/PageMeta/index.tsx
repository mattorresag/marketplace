/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { useEffect, useState } from "react";
import { pageTitle } from "../../utils/constants/envs";

interface Props {
  subtitle?: string;
}

const PageMeta = ({ subtitle }: Props) => {
  const [title, setTitle] = useState<string>(pageTitle);

  useEffect(() => {
    if (subtitle) {
      setTitle(`${pageTitle} | ${subtitle}`);
    } else {
      setTitle(pageTitle);
    }
  }, [subtitle]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Painel de pedidos da ecommerce" />
      <link rel="icon" href="/assets/images/logos/favicon.png" />
    </Head>
  );
};

export default PageMeta;
