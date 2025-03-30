"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Analytics() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analyticsData, setAnalyticsData] = useState({
        sales: {
            monthly: [12500, 15000, 17500, 16000, 19000, 22000],
            labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
        },
        topProducts: [
            { name: "Wireless Headphones", sales: 124, revenue: 12400 },
            { name: "Smart Watch", sales: 98, revenue: 19600 },
            { name: "Bluetooth Speaker", sales: 87, revenue: 8700 },
            { name: "Laptop Stand", sales: 76, revenue: 3800 },
            { name: "USB-C Cable", sales: 65, revenue: 1950 }
        ],
        inventoryStatus: {
            inStock: 156,
            lowStock: 32,
            outOfStock: 14
        }
    });
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
            // Here you would fetch actual analytics data from your backend
            // For now, we're using the mock data defined above
            setLoading(false);
        } catch (error) {
            console.error("Error parsing user data:", error);
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/dashboard"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/analytics"
                                    className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Analytics
                                </Link>
                                <Link
                                    href="/settings"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Analytics Dashboard
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Monitor your business performance and track key metrics.
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Export Report
                        </button>
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Custom Report
                        </button>
                    </div>
                </div>

                {/* Date Range Selector */}
                <div className="bg-white shadow rounded-lg mb-8 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Date Range
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Current: Last 6 months (October 2024 - March 2025)
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                Last Month
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                3 Months
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                6 Months
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                Year
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                Custom
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {/* Total Revenue Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">$102,450</div>
                                            <div className="mt-1 flex items-baseline text-sm">
                                                <span className="text-green-600">↑ 18.2%</span>
                                                <span className="ml-2 text-gray-500">vs previous period</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Sales Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">874</div>
                                            <div className="mt-1 flex items-baseline text-sm">
                                                <span className="text-green-600">↑ 12.5%</span>
                                                <span className="ml-2 text-gray-500">vs previous period</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Value Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Inventory Value</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">$78,650</div>
                                            <div className="mt-1 flex items-baseline text-sm">
                                                <span className="text-yellow-600">↑ 4.3%</span>
                                                <span className="ml-2 text-gray-500">vs previous period</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Average Order Value Card */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Avg. Order Value</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">$117.22</div>
                                            <div className="mt-1 flex items-baseline text-sm">
                                                <span className="text-green-600">↑ 5.1%</span>
                                                <span className="ml-2 text-gray-500">vs previous period</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
                    {/* Sales Trend Chart */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Monthly Sales Trend</h3>
                        </div>
                        <div className="p-4 h-64 flex items-center justify-center">
                            {/* This would be replaced with an actual chart component */}
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-gray-500">Sales Chart Visualization</p>
                                    <p className="text-sm text-gray-400">Line chart showing sales over time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Status Chart */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Inventory Status</h3>
                        </div>
                        <div className="p-4 h-64 flex items-center justify-center">
                            {/* This would be replaced with an actual chart component */}
                            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-gray-500">Inventory Status Visualization</p>
                                    <p className="text-sm text-gray-400">Pie chart showing inventory status breakdown</p>
                                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                                        <div>
                                            <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                            In Stock: {analyticsData.inventoryStatus.inStock}
                                        </div>
                                        <div>
                                            <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                                            Low Stock: {analyticsData.inventoryStatus.lowStock}
                                        </div>
                                        <div>
                                            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                                            Out of Stock: {analyticsData.inventoryStatus.outOfStock}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Products Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Top Selling Products</h3>
                        <Link
                            href="/products"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            View all products
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Units Sold
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revenue
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {analyticsData.topProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{product.sales}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">${product.revenue.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                In Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sales by Category */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Sales by Category</h3>
                    </div>
                    <div className="p-4 h-64 flex items-center justify-center">
                        {/* This would be replaced with an actual chart component */}
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-gray-500">Sales by Category Visualization</p>
                                <p className="text-sm text-gray-400">Bar chart showing sales by product category</p>
                            </div>
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