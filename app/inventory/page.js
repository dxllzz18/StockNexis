"use client";
import {
    Edit,
    Home,
    Layers,
    Package,
    Package2,
    Search,
    Settings
} from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');

                if (!response.ok) {
                    console.error("Failed to fetch products:", response.status);
                    setProducts([]);
                    return;
                }

                const data = await response.json();

                if (!data || !data.products || !Array.isArray(data.products)) {
                    console.warn("Invalid product data received:", data);
                    setProducts([]);
                    return;
                }

                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    // Function to handle search
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/search?query=${searchQuery}`);

            if (!response.ok) {
                console.error("Search failed:", response.status);
                return;
            }

            const data = await response.json();
            if (data && data.products) {
                setProducts(data.products);
            } else {
                console.warn("No products found for search query:", searchQuery);
                setProducts([]);
            }
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/product/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
                setAlert("Product deleted successfully!");
                setAlertType("success");
            } else {
                setAlert("Failed to delete product.");
                setAlertType("error");
            }
        } catch (error) {
            setAlert("Error deleting product.");
            setAlertType("error");
            console.error("Error deleting product:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('yourAuthTokenKey');
        router.push('/login');
    };

    const Header = () => (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search anything..."
                    className="border border-gray-300 rounded-md px-3 py-2 w-64 mr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button onClick={handleSearch} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <Search className="w-5 h-5" />
                </button>
            </div>
            <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                Logout
            </button>
        </header>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                    <p className="text-xl text-gray-600">Loading Inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar - Same as Dashboard but with Inventory highlighted */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-xl transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center">
                            <Package2 className="w-8 h-8 text-indigo-600 mr-2" />
                            {isSidebarOpen && (
                                <span className="text-xl font-bold text-gray-800">StockNexis</span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <Layers className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Sidebar Navigation - Only keep Dashboard and Inventory */}
                    <nav className="flex-1 p-4 space-y-2">
                        <Link href="/dashboard">
                            <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-600">
                                <Home className="w-5 h-5" />
                                {isSidebarOpen && (
                                    <span className="ml-3 text-sm font-medium text-gray-700">
                                        Dashboard
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Inventory - Active */}
                        <div className="flex items-center p-2 rounded-lg cursor-pointer bg-indigo-600 text-white">
                            <Package className="w-5 h-5" />
                            {isSidebarOpen && (
                                <span className="ml-3 text-sm font-medium">
                                    Inventory
                                </span>
                            )}
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t">
                        <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-600">
                            <Settings className="w-5 h-5" />
                            {isSidebarOpen && (
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    Settings
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                {/* Alert Notification */}
                {alert && (
                    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 ${alertType === 'success' ? 'bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'} p-4 rounded-lg shadow-lg`}>
                        <div className="flex items-center">
                            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <p>{alert}</p>
                        </div>
                    </div>
                )}

                <div className="p-8 space-y-8">
                    {/* Inventory Management Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Package className="w-6 h-6 mr-2 text-indigo-600" />
                            Inventory Management
                        </h2>

                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {product.productName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => router.push(`/dashboard?edit=${product._id}`)}
                                                        className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                                    >
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProduct(product._id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No products found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}