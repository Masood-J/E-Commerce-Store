"use client"
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-8 font-inter text-white">
            <div className=" grid grid-cols-3 gap-8 px-4">

                {/* Left Column */}
                <div className="flex flex-col gap-3 align-self-start text-sm">
                    <Link href="" className="hover:underline">FAQ'S</Link>
                    <Link href="" className="hover:underline">Log In/Sign Up</Link>
                    <Link href="" className="hover:underline">How To Buy</Link>
                    <Link href="" className="hover:underline">Payment</Link>
                    <Link href="" className="hover:underline">Shipping & Deliveries</Link>
                    <Link href="" className="hover:underline">Exchange & Returns</Link>
                </div>

                {/* Center Column */}
                <div className="flex flex-col items-center gap-9">
                    <Image
                        src="/U1.png"
                        alt="logo"
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                    <h2 className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        © Copyrights Reserved by Urban Aura 2025
                    </h2>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-3 justify-self-end text-sm">
                    <Link href="" className="hover:underline">About Us</Link>
                    <Link href="" className="hover:underline">Retail Stores</Link>
                    <Link href="" className="hover:underline">Contact Us</Link>
                    <Link href="" className="hover:underline">Work with us</Link>
                </div>

            </div>
        </footer>
    );
}
