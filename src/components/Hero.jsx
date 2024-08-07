import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

const Hero = () => {
    return (
        <section
            className="absolute top-0 w-full bg-cover h-screen bg-center"
            style={{backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
        >
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <div className="relative">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mt-[10rem] mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
                        Discover Timeless Beauty: Jewelry for the Modern Soul   
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl">
                        Discover jewelry that embodies the perfect blend of passion and precision, with each handcrafted piece reflecting a commitment to exceptional quality and unique design.
                        </p>
                        <Link
                            to="#"
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-yellow-500 focus:ring-4 focus:ring-primary-300"
                        >
                            Get started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Hero;
