export async function storefront(query, variables = {}) {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_STOREFRONT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN
            },
            body: JSON.stringify({query, variables}),
        })
        return response.json()
    } catch (e) {
        console.log(e)
    }
}