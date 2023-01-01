import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import {FaGalacticRepublic} from "react-icons/fa";

function Navbar(props) {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className="fixed w-full h-20 z-[100]">
            <div className="flex justify-between items-center w-full h-full px-10 2xl:px-16 bg-secondary">

                <Link scroll={false} href="/#home">
                    <FaGalacticRepublic className="text-5xl text-white cursor-pointer"/>
                </Link>

                <div>
                    <ul className="hidden md:flex">
                        <Link href="/#home" scroll={false}>
                            <li className="ml-10 text-sm text-base-100 uppercase hover:text-accent">
                                Home
                            </li>
                        </Link>
                        <Link href="/#about" scroll={false}>
                            <li className="ml-10 text-sm text-base-100 uppercase  hover:text-accent">
                                About
                            </li>
                        </Link>
                        <Link href="/#contact" scroll={false}>
                            <li className="ml-10 text-sm text-base-100 uppercase hover:text-accent">
                                Contact
                            </li>
                        </Link>
                    </ul>

                    <div className="md:hidden text-base-100" onClick={handleNav}>
                        <AiOutlineMenu size={25}/>
                    </div>
                </div>
            </div>

            <div
                className={
                    nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/60" : ""
                }
            >
                <div
                    className={
                        nav
                            ? "fixed right-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-secondary p-10 ease-in duration-500"
                            : "fixed h-screen right-[-150%] top-0 p-10 ease-in duration-500"
                    }
                >
                    <div>
                        <div className="flex w-full items-center justify-between">
                            <Link scroll={false} href="/#home">
                                <FaGalacticRepublic className="text-5xl text-white cursor-pointer"/>
                            </Link>
                            <div className=" cursor-pointer text-base-100" onClick={handleNav}>
                                <AiOutlineClose size={30} />
                            </div>
                        </div>

                    </div>

                    <div className="py-8 flex flex-col text-base-100">
                        <ul className="uppercase">
                            <Link href="/" scroll={false}>
                                <li className="py-4 text-lg" onClick={handleNav}>
                                    Home
                                </li>
                            </Link>
                            <Link href="/about" scroll={false}>
                                <li className="py-4 text-lg" onClick={handleNav}>
                                    About
                                </li>
                            </Link>
                            <Link href="/contact" scroll={false}>
                                <li className="py-4 text-lg" onClick={handleNav}>
                                    Contact
                                </li>
                            </Link>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
