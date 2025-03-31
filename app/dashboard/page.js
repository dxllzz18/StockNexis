"use client";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Home,
  Layers,
  Package,
  Package2,
  PlusCircle,
  Search,
  Settings
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [productForm, setProductForm] = useState({ productName: '', quantity: '', price: '', category: '', status: 'In Stock' });
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [expandedSearchProductId, setExpandedSearchProductId] = useState(null);
  const [initialProducts, setInitialProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);

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
        setInitialProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const { productName, quantity, price, category } = productForm;
    if (!productName || !quantity || !price || !category) {
      setAlert("Please fill all fields");
      setAlertType("error");
      return;
    }

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          status: parseInt(quantity) > 0 ? "In Stock" : "Out of Stock"
        })
      });

      if (response.ok) {
        const data = await response.json();

        setProducts(prev => [...prev, data.product]);
        setInitialProducts(prev => [...prev, data.product]);//Update initial product
        setAlert("Your Product has been added!");
        setAlertType("success");
        setProductForm({ productName: '', quantity: '', price: '', category: '', status: 'In Stock' });
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));// parse the response body to check if server is returning an error message
        setAlert(`Error adding product: ${errorData.message}`); //Show error message
        setAlertType("error");
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert("Error adding product. Please try again.");
      setAlertType("error");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      setProducts(initialProducts);
      return;
    }

    setLoading(true);
    try {
      const filteredProducts = initialProducts.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredProducts);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setAlert("Error during search.");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const toggleSearchProductDetails = (productId) => {
    if (expandedSearchProductId === productId) {
      setExpandedSearchProductId(null);
    } else {
      setExpandedSearchProductId(productId);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
    setExpandedSearchProductId(null);
  };

  const selectSearchProduct = (product) => {
    const index = products.findIndex(p => p._id === product._id);
    if (index !== -1) {
      closeSearchResults();
    }
  };

  //Delete product method
  const deleteProduct = async (productId) => {
    if (!productId) {
      setAlert("Error: Invalid product ID");
      setAlertType("error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        setInitialProducts(prevProducts => prevProducts.filter(product => product._id !== productId));

        setAlert("Product deleted successfully!");
        setAlertType("success");
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        setAlert(`Failed to delete product: ${errorData.message}`);
        setAlertType("error");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setAlert(`Error deleting product: ${error.message}`);
      setAlertType("error");
    }
  };

  // Edit Product
  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductForm({
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      category: product.category,
      status: product.status
    });
  };

  const handleUpdateProduct = async () => {
    const productId = editingProductId;

    // Store current product data for potential rollback
    const originalProducts = [...products];
    const productIndex = products.findIndex(p => p._id === productId);
    const originalProduct = products[productIndex];

    if (!originalProduct) {
      setAlert("Product not found for update.");
      setAlertType("error");
      setEditingProductId(null);
      return;
    }

    // Optimistically update the UI
    const updatedProductData = {
      ...originalProduct,
      ...productForm,
      status: parseInt(productForm.quantity) > 0 ? "In Stock" : "Out of Stock"
    };

    const newProducts = [...products];
    newProducts[productIndex] = updatedProductData;
    setProducts(newProducts);

    //update inital products
    const initalProductIndex = initialProducts.findIndex(p => p._id === productId);
    const newInitalProducts = [...initialProducts];
    newInitalProducts[initalProductIndex] = updatedProductData;
    setInitialProducts(newInitalProducts);

    setEditingProductId(null); // Close the edit form

    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          status: parseInt(productForm.quantity) > 0 ? "In Stock" : "Out of Stock"
        })
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setAlert("Product updated successfully!");
        setAlertType("success");
      } else {
        // Revert the UI update if the backend failed
        setProducts(originalProducts);
        setInitialProducts(initialProducts); // Revert initial products as well

        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        setAlert(`Failed to update product: ${errorData.message}`);
        setAlertType("error");
        console.error("Failed to update product:", response.status);
      }
    } catch (error) {
      // Revert the UI update if there was a network error
      setProducts(originalProducts);
      setInitialProducts(initialProducts); // Revert initial products as well

      setAlert("Error updating product.");
      setAlertType("error");
      console.error("Error updating product:", error);
    } finally {
      setProductForm({ productName: '', quantity: '', price: '', category: '', status: 'In Stock' }); // Reset form
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
      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/profile')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-xl text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <SidebarItem
              icon={<Home className="w-5 h-5" />}
              label="Dashboard"
              isOpen={isSidebarOpen}
              href="/dashboard"
              active={router.pathname === "/dashboard"}
              router={router}
            />
            <SidebarItem
              icon={<Package className="w-5 h-5" />}
              label="Inventory"
              isOpen={isSidebarOpen}
              href="/inventory"
              active={router.pathname === "/inventory"}
              router={router}
            />
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <SidebarItem
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
              isOpen={isSidebarOpen}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Search Results Dropdown */}
        {showSearchResults && (
          <div className="relative z-50">
            <div className="absolute top-0 left-0 right-0 mt-2 mx-6">
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Search Results ({searchResults.length})
                  </h3>
                  <button
                    onClick={closeSearchResults}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No products found matching "{searchQuery}"
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((product) => (
                      <li key={product._id} className="hover:bg-gray-50">
                        <div
                          className="p-4 cursor-pointer"
                          onClick={() => selectSearchProduct(product)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium text-gray-900">{product.productName}</h4>
                              <p className="text-sm text-gray-500">Category: {product.category}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product.status}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSearchProductDetails(product._id);
                                }}
                                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                              >
                                {expandedSearchProductId === product._id ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Product Details Dropdown */}
                          {expandedSearchProductId === product._id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn bg-indigo-50 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">ID</h4>
                                  <p className="text-gray-800">{product._id}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Price</h4>
                                  <p className="text-gray-800">${product.price}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                                  <p className="text-gray-800">{product.quantity}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Total Value</h4>
                                  <p className="text-gray-800">${parseInt(product.price) * parseInt(product.quantity)}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditProduct(product);
                                    closeSearchResults();
                                  }}
                                  className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProduct(product._id);
                                    closeSearchResults();
                                  }}
                                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

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
          {/* Add Product Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PlusCircle className="w-6 h-6 mr-2 text-indigo-600" />
              Add New Product
            </h2>

            <form onSubmit={addProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={productForm.productName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={productForm.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productForm.price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter price"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={productForm.category}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="groceries">Groceries</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={productForm.status}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Product
                </button>
              </div>
            </form>
          </div>

          {/* Current Inventory Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Package className="w-6 h-6 mr-2 text-indigo-600" />
              Current Inventory
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
                  {products.map((product) => (
                    editingProductId === product._id ? (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <input
                            type="text"
                            name="productName"
                            value={productForm.productName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            name="quantity"
                            value={productForm.quantity}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-2 py-1 w-24"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <input
                            type="number"
                            name="price"
                            value={productForm.price}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-2 py-1 w-24"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            name="category"
                            value={productForm.category}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-2 py-1 w-full"
                          >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="groceries">Groceries</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            name="status"
                            value={productForm.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-2 py-1 w-full"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={handleUpdateProduct}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => setEditingProductId(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
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
                            onClick={() =>
                              handleEditProduct(product)}
                            className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isOpen, href, active = false, router }) {
  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition duration-200
        ${active ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-600'}
      `}
    >
      <div className={active ? 'text-white' : ''}>{icon}</div>
      {isOpen && (
        <span className={`ml-3 text-sm font-medium ${active ? 'text-white' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </div>
  );
}