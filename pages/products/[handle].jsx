import {getProduct, getProductSlugs} from "../../utils/storefront";
import React, { useState } from "react";
import Link from "next/link";

// TODO: Make this page dynamic with the correct product variant

function ProductPage({productData, products})  {
    const relatedProducts = products.edges.filter(item => item.node.handle !== productData.handle).slice(0, 4)

    console.log(relatedProducts)

    const [rotate, setRotate] = useState(false);
    const [count, setCount] = useState(1);

    const addCount = () => {
        setCount((prev) => prev + 1);
    };

    const minusCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    };

    return (
        <div className="container mx-auto px-6 py-[180px]">
            <div className="md:flex md:items-center">
                <div className="w-full h-64 md:w-1/2 lg:h-96">
                    <img className="h-full w-full rounded-md object-contain max-w-lg mx-auto"
                         src={productData.images.edges[0].node.originalSrc}
                         alt="Nike Air" />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                    <h3 className="text-gray-700 uppercase text-lg">{productData.title}</h3>
                    <span className="text-gray-500 mt-3">{productData.variants.edges[0].node.price.amount}</span>
                    <hr className="my-3" />
                        <div className="mt-2">
                            <label className="text-gray-700 text-sm" htmlFor="count">Count:</label>
                            <div className="flex items-center mt-1">
                                <button onClick={minusCount} className="text-gray-500 focus:outline-none focus:text-gray-600">

                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                                <span className="text-gray-700 text-lg mx-2">{count}</span>
                                <button onClick={addCount} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label className="text-gray-700 text-sm" htmlFor="count">Description:</label>
                            <h3 className="text-gray-500">
                                {productData.description}
                            </h3>
                        </div>
                        <div className="flex items-center mt-6">
                            <button
                                className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order
                                Now
                            </button>
                            <button
                                className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </button>
                        </div>
                </div>
            </div>
            <div className="mt-16">
                <h3 className="text-gray-600 text-2xl font-medium">More Products</h3>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">

                    {relatedProducts.map((item) => (
                        <div key={item.node.id} className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden bg-white">
                            <div className="flex items-end justify-end h-56 w-full bg-contain bg-center bg-no-repeat"
                                 style={{backgroundImage: `url(${item.node.images.edges[0].node.transformedSrc})`}}>
                                <Link
                                    href={`/products/${item.node.handle}`}
                                    className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                         strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                </Link>
                            </div>
                            <div className="px-5 py-3">
                                <h3 className="text-gray-900 uppercase">{item.node.title}</h3>
                                <span className="text-gray-800 mt-2">$12</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}



export async function getStaticPaths() {
    const productSlugs = await getProductSlugs()

    const paths = productSlugs.map((slug) => {
        const product = slug.node.handle.toString()

        return {
            params: { handle: product }
        }
    })

    return {
        paths,
        fallback: false,
    }
}
export async function getStaticProps({ params }) {
    const productData = await getProduct(params.handle)

    return {
        props: {
            productData: productData.productByHandle,
            products: productData.products
        },
    }
}



export default ProductPage;
