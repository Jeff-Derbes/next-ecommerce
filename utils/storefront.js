const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN


 export async function shopifyCall(query, variables = {}) {
     try {
         const result = await fetch(process.env.NEXT_PUBLIC_STOREFRONT_API_URL, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-Shopify-Storefront-Access-Token':
                 process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
             },
             body: JSON.stringify({ query, variables }),
         }).then((res) => res.json());

         if (result.errors) {
             console.log({ errors: result.errors });
         } else if (!result || !result.data) {
             console.log({ result });
             return 'No results found.';
         }

         return result.data;
     } catch (error) {
         console.log(error);
     }
}


 export async function getAllProducts() {
    const query = `
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

    const res = await shopifyCall(query);
    const allProducts = res.data.products.edges;

    return allProducts
}


