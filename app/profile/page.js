"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } catch (error) {
            console.error("Error parsing user data:", error);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-semibold italic">Stock<span className="font-bold">Nexis</span></h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application access.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Inventory Management Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Inventory Management</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage your inventory, track products, and monitor stock levels.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
                                >
                                    Access Inventory
                                    <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Analytics</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        View sales reports, product performance, and other metrics.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/analytics"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                                >
                                    View Analytics
                                    <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Settings Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage your account settings and preferences.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href="/settings"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                                >
                                    Manage Settings
                                    <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="mt-10">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your latest actions and updates.</p>
                            </div>
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Active
                            </span>
                        </div>
                        <div className="border-t border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                <li className="px-4 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                                                <span className="text-sm font-medium leading-none text-purple-800">IN</span>
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Added new product to inventory
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Product: Wireless Headphones
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            2 hours ago
                                        </div>
                                    </div>
                                </li>
                                <li className="px-4 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
                                                <span className="text-sm font-medium leading-none text-indigo-800">AN</span>
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Viewed monthly sales report
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                March 2025
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Yesterday
                                        </div>
                                    </div>
                                </li>
                                <li className="px-4 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                                <span className="text-sm font-medium leading-none text-blue-800">ST</span>
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                Updated account password
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                Security settings changed
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            3 days ago
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <Link
                                href="/activity"
                                className="text-sm font-medium text-purple-600 hover:text-purple-500"
                            >
                                View all activity<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex space-x-6 md:order-2">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Help Center
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                Terms of Service
                            </a>
                        </div>
                        <div className="mt-8 md:mt-0 md:order-1">
                            <p className="text-center text-sm text-gray-400">
                                &copy; 2025 Your Company. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}