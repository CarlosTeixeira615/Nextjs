import { useRouter } from "next/router";
import { client } from "@/lib/prismic";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  console.log();
  if (router.isFallback) {
    return <p>Carregando ...</p>;
  }
  return (
    <div>
      <a href="/">Tela inicial</a>

      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      <img src={product.data.thumbnail.url} alt={product.data.description} />
      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      />
      <p>Price: ${product.data.price}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 15,
  };
};
