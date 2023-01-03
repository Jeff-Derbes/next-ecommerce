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
    console.log(res.products.edges)
    const allProducts = res.products.edges;

    return allProducts
}

export async function getProductSlugs(){
    const query = `
{
  products(first: 250) {
    edges {
      node {
        handle
      }
    }
  }
}
 `

    const res = await shopifyCall(query);
    return res.products.edges
}

export async function getProduct(handle){
    const query = `
    query SingleProduct{
  productByHandle(handle: "${handle}") {
    id
    title
    handle
    description
    images(first: 250) {
      edges {
        node {
          id
          originalSrc
          height
          width
          altText
        }
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          price{
    amount
          }
          }
      }
    }
  }
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
    const res = await shopifyCall(query);

    return res
}