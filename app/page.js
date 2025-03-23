"use client";
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  const [productForm, setProductForm] = useState({
    productName: "",
    quantity: "",
    price: "",
    category: "",
    status: ""
  });
  const [alert, setAlert] = useState("");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      setLoading(true);
      
      const response = await fetch('/api/product');
      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        setProducts([]);
        setLoading(false);
        return;
      }
      
      console.log("Products data:", data);
      
      // Handle different response formats more gracefully
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
        console.log("Products state updated with data.products:", data.products);
      } else if (Array.isArray(data)) {
        setProducts(data);
        console.log("Products state updated with array:", data);
      } else if (data && typeof data === 'object') {
        // If data is an object but not in expected format, convert to array if possible
        const productsArray = Object.values(data).filter(item => 
          item && typeof item === 'object' && 'productName' in item
        );
        
        if (productsArray.length > 0) {
          setProducts(productsArray);
          console.log("Products state updated from object:", productsArray);
        } else {
          console.log("Data is an object but couldn't extract products, using empty array");
          setProducts([]);
        }
      } else {
        console.log("Invalid data format, using empty array:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!productForm.productName || !productForm.quantity || !productForm.price || !productForm.category || !productForm.status) {
      setAlert("Please fill in all fields");
      return;
    }
    
    try {
      console.log("Adding product:", productForm);
      setAlert("");
      
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
      });
  
      if (response.ok) {
        console.log("Product added successfully");
        setAlert("Your Product has been Added!!");
        
        // Create a new product object with a temporary unique ID
        const newProduct = {
          ...productForm,
          tempId: Date.now() // Add a temporary identifier
        };
        
        // Add the new product to the local state immediately
        setProducts(prevProducts => [...prevProducts, newProduct]);
        
        // Reset form
        setProductForm({
          productName: "",
          quantity: "",
          price: "",
          category: "",
          status: ""
        });
        
        // Fetch the updated product list (optional, since we already updated locally)
        // Uncomment if you need to ensure server-side consistency
        // await fetchProducts();
      } else {
        const errorText = await response.text();
        console.error('Error adding product:', errorText);
        setAlert("Error adding product: " + (errorText || response.statusText));
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert("Error: " + error.message);
    }
  };
  
  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // More robust filtering with proper null checks
  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product && 
    typeof product === 'object' &&
    (product.productName?.toLowerCase?.() || "").includes((searchQuery || "").toLowerCase()) &&
    (categoryFilter === "all" || product.category === categoryFilter)
  ) : [];
  
  console.log("Current products:", products);
  console.log("Filtered products:", filteredProducts);

  return (
    <>
      <Header />
      <div className="container mx-auto my-8">
        {alert && <div className="text-green-800 text-center p-2 bg-green-100 rounded">{alert}</div>}
      </div>

      <div className="container bg-blue-50 mx-auto p-10">
        <h1 className="text-xl font-bold mb-4">Search a Product</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
          <input 
            type="text" 
            placeholder="Search by product name..." 
            className="border p-2 rounded w-full" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="border p-2 rounded" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="groceries">Groceries</option>
          </select>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={(e) => e.preventDefault()}
          >
            Search
          </button>
        </div>

        <h1 className="text-xl font-bold mb-4">Add a Product</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form onSubmit={addProduct}>
            <input 
              name="productName" 
              value={productForm.productName} 
              onChange={handleChange} 
              placeholder="Product Name" 
              className="border p-2 rounded w-full mb-4" 
              required
            />
            <input 
              name="quantity" 
              value={productForm.quantity} 
              onChange={handleChange} 
              type="number" 
              placeholder="Quantity" 
              className="border p-2 rounded w-full mb-4" 
              required
              min="0"
            />
            <input 
              name="price" 
              value={productForm.price} 
              onChange={handleChange} 
              type="number" 
              placeholder="Price" 
              className="border p-2 rounded w-full mb-4" 
              required
              min="0"
              step="0.01"
            />
            <select 
              name="category" 
              value={productForm.category} 
              onChange={handleChange} 
              className="border p-2 rounded w-full mb-4"
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="groceries">Groceries</option>
            </select>
            <select 
              name="status" 
              value={productForm.status} 
              onChange={handleChange} 
              className="border p-2 rounded w-full mb-4"
              required
            >
              <option value="">Select Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pending">Pending</option>
            </select>
            <button 
              type="submit" 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </form>
        </div>

        <h1 className="text-xl font-bold my-6 mb-4">Display Current Stock</h1>
        {loading ? (
          <div className="text-center py-4">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Product Name</th>
                  <th className="py-3 px-6 text-left">Category</th>
                  <th className="py-3 px-6 text-left">Quantity</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={product.tempId || `${product.productName}-${index}`}>
                      <td className="border px-4 py-2">{product.productName}</td>
                      <td className="border px-4 py-2">{product.category}</td>
                      <td className="border px-4 py-2">{product.quantity}</td>
                      <td className="border px-4 py-2">₹{product.price}</td>
                      <td className="border px-4 py-2">{product.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}