import { GetServerSideProps } from "next";
import Link from "next/link";
import { Document } from "prismic-javascript/types/documents";
import { client } from "@/lib/prismic";
import PrismicDOM from "prismic-dom";
import Prismic from "prismic-javascript";

import { Title } from "../styles/pages/Home";
import SEO from "@/components/SEO";

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <section>
        <SEO title="bem vindo" image="1635303.png" />
        <Title>Loja</Title>
        <ul>
          {recommendedProducts.map((recommendedProducts) => {
            return (
              <li key={recommendedProducts.id}>
                <Link href={`/catalog/product/${recommendedProducts.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProducts.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);
  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
