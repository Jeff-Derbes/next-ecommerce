import Head from 'next/head'
import Image from 'next/image'
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import {getAllProducts, shopifyCall} from "../utils/storefront";


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
                    <ProductList products={products}/>
                </section>

            </main>
        </>
    )
}

export async function getStaticProps() {
    const products = await shopifyCall(allProductsQuery)
    console.log(products)

    return {
        props: {
            products
        }
    }
}


const allProductsQuery = `
query Products {
  products(first:8){
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