import { client } from "@/lib/prismic";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";

interface CategoriProps {
  category: Document;
  products: Document[];
}

export default function Product({ category, products }: CategoriProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando ...</p>;
  }
  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(category.data.title)}</h1>
      <ul>
        {products.map((products) => {
          return (
            <li key={products.id}>
              <Link href={`/catalog/product/${products.uid}`}>
                <a>{PrismicDOM.RichText.asText(products.data.title)}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);
  const paths = categories.results.map((categorie) => {
    return {
      params: { slug: categorie.uid },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoriProps> = async (
  context
) => {
  const { slug } = context.params;

  const category = await client().getByUID("category", String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at("document.type", "product"),
    Prismic.Predicates.at("my.product.category", category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
