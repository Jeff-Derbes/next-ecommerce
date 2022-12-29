import Head from 'next/head'
import Image from 'next/image'
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import {storefront} from "../utils/storefront";


export default function Home(products) {
    console.log(products)
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="relative">
                <section>
                    <Hero/>
                </section>

                <section>
                    <ProductList/>
                </section>

            </main>
        </>
    )
}

export async function getStaticProps() {
    const {data} = await storefront(productQuery)

    return {
        props: {
            products: data.products
        }
    }
}

const productQuery = `
query Products {
  products(first:6){
    edges{
      node{
        title
        handle
        tags
        priceRange{
          minVariantPrice{
            amount
          }
        }
        images(first: 1){
          edges{
            node{
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
}
`