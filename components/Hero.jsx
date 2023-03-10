import React from 'react';

function Hero() {
    return (
        <section className="bg-base-100 ">
            <div
                className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading-none sm:text-5xl">NextJS
                    <span className="text-accent"> Shopify Starter</span>
                </h1>
                <p className="px-8 mt-8 mb-12 text-lg">A starting point for a NextJS and Shopify ecommerce project</p>
                <div className="flex flex-wrap justify-center">
                    <button
                        className="px-8 py-3 m-2 text-lg rounded bg-primary hover:bg-primary-focus">Get
                        started
                    </button>
                    <button
                        className="px-8 py-3 m-2 text-lg border rounded text-base-content border-base-content hover:border-accent">Learn
                        more
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;