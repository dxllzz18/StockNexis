"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex justify-center items-center relative w-full min-h-screen">
            {/* Background Image with Next/Image */}
            <Image
                src={'/bg.jpg'}
                fill
                priority
                style={{
                    objectFit: 'cover',
                    zIndex: -1
                }}
            />

                {/* Content Container - Increased Height & Width */}
                <div className=" z-10 h-[1000px] w-[95%] max-w-[2000px] bg-white shadow-2xl rounded-2xl p-20 flex flex-col items-center">

                    {/* Navbar */}
                    <nav className="w-full flex justify-between items-center text-lg mb-12">
                        <h1 className="text-4xl font-bold italic text-gray-900">
                            Stock<span className="text-yellow-600">Nexis</span>
                        </h1>
                        <div className="space-x-10 hidden md:flex ">
                            <Link href="/login" className="text-gray-800 text-4xl text-sans hover:text-purple-600">
                                Login
                            </Link>
                            <Link href="/register" className="text-gray-800 text-sans hover:text-purple-600 text-4xl">
                                Register
                            </Link>
                            <Link href="/about" className="text-gray-800 text-sans hover:text-purple-600 text-4xl">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-gray-800 text-sans hover:text-purple-600 text-4xl">
                                Contact
                            </Link>
                        </div>
                    </nav>

                    {/* Hero Section */}
                    <div className="flex flex-col xl:flex-row justify-centre items-center w-full">
                        <div className="lg:w-1/2 text-center margin-10 lg:text-left">
                            <h2 className="text-7xl font-bold text-gray-900 leading-tight">
                                Inventory <span className="text-orange-600">Management</span>
                            </h2>
                            <p className="mt-8 text-gray-700 text-3xl">
                                Manage your inventory seamlessly with our innovative solution.
                                Track stock, orders, and shipments in real-time.
                            </p>
                            <Link
                                href="/register"
                                className="inline-block bottom-10 left-10 mt-10 px-10 py-5 bg-yellow-600 text-white rounded-lg   shadow-lg text-2xl hover:bg-purple-700"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Home Image - Correct Positioning */}
                        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                            <Image
                                src="/home.png"
                                width={1200} // Increased size
                                height={1200}
                                alt="Inventory Illustration"
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </div>
                </div>
        </main>
    );
}