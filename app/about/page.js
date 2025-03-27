"use client";
import Link from "next/link";

export default function AboutUs() {
    return (
        <main className="min-h-screen text-2xl flex flex-col items-center justify-center bg-gray-100 px-6">
            {/* Navbar */}
            <nav className="text-4xl absolute top-5 left-10 right-10 flex justify-between items-center">
                <h1 className="text-4xl font-bold italic text-gray-900">
                    Stock<span className="text-purple-600">Nexis</span>
                </h1>
                <div className="space-x-6 flex">
                    <Link href="/" className="text-gray-700 font-serif hover:text-purple-600">
                        Home
                    </Link>
                    <Link href="/dashboard" className="text-gray-700 font-serif  hover:text-purple-600">
                        Dashboard
                    </Link>
                    <Link href="/contact" className="text-gray-700 font-serif  hover:text-purple-600">
                        Contact
                    </Link>
                </div>
            </nav>

            {/* About Us Content */}
            <div className="max-w-4x1 mx-auto flex flex-col  bg-white shadow-2xl rounded-2xl p-10 mt-18 text-center">
                <h2 className="text-5xl font-extrabold text-gray-900">Welcome to <span className="text-purple-700">Inventory Management System</span></h2>
                <p className="mt-6 text-3xl text-gray-700 leading-relaxed">
                    Your efficient solution for organizing and tracking your stock with ease. Our platform allows businesses and individuals to manage their inventory seamlessly, ensuring accurate stock levels and smooth operations.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xxl font-semibold text-gray-900">✔ Add new products</h3>
                        <p className="text-gray-600">Easily add new products to your inventory.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xxl font-semibold text-gray-900">✔ Update stock & pricing</h3>
                        <p className="text-gray-600">Keep stock levels and prices updated at all times.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xxl font-semibold text-gray-900">✔ Delete obsolete products</h3>
                        <p className="text-gray-600">Remove old or outdated inventory items effortlessly.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xxl font-semibold text-gray-900">✔ Track stock status</h3>
                        <p className="text-gray-600">Monitor stock status (In Stock / Out of Stock) in real-time.</p>
                    </div>
                </div>

                <p className="mt-8 text-3xl text-gray-700">
                    Our mission is to simplify inventory management, reduce errors, and enhance productivity.
                </p>
                <Link href="/register">
                    <button className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800">
                        Start Managing Now
                    </button>
                </Link>
            </div>
        </main>
    );
}
