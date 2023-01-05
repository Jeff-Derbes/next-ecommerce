import React from 'react';
import Link from "next/link";

function ProductList({products}) {
    return (
        <div>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.products.map((item) => {
                        const product = item.node
                        const image = product.images.edges[0].node

                        return (
                            <Link key={product.handle} href={`/products/${product.handle}`} className="group">

                                <div
                                    className=" overflow-hidden rounded-lg border ">
                                    <img
                                        src={image.transformedSrc}
                                        alt={image.altText}
                                        className="w-full object-contain object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm">{product.title}</h3>
                                <p className="mt-1 text-lg font-mediumf">${product.priceRange.minVariantPrice.amount}</p>

                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductList;