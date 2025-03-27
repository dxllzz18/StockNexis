# StockNexis - Inventory Management System

## Overview

StockNexis is a simple web application built with Next.js to manage your product inventory. It allows you to:

*   **View Current Inventory:** See a list of all your products, their quantities, prices, categories, and status.
*   **Add New Products:** Easily add new items to your inventory using a form.
*   **Search Products:** Quickly find specific products by name.
*   **Update Quantity:** Modify the quantity of existing products.
*   **Edit Products:** Modify the details of existing products directly in the table.
*   **Delete Products:** Remove products from your inventory.
*   **Logout:** Log out of your account to secure access.

## Technologies Used

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (React framework)
    *   [Tailwind CSS](https://tailwindcss.com/) (CSS framework)
    *   [Lucide React](https://lucide.dev/) (Icons)
*   **Backend:**
    *   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
    *   [MongoDB Atlas](https://www.mongodb.com/atlas/database) (Cloud database)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone [your_repository_url]
    cd [your_repository_name]
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # Or yarn install
    ```

3.  **Configure Environment Variables:**

    *   Create a `.env.local` file in the root of your project.
    *   Add the following environment variables:

        ```
        MONGODB_URI="your_mongodb_atlas_connection_string"
        ```

        Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection string.

4.  **Run the development server:**

    ```bash
    npm run dev  # Or yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Backend API Endpoints

*   `/api/product`:
    *   `GET`: Retrieves all products from the database. Returns a JSON object with a `products` array.
    *   `POST`: Adds a new product to the database. Accepts a JSON object with product details in the request body.
*   `/api/product/[id]`:
    *   `GET`: Retrieves a specific product by ID.
    *   `PUT`: Updates an existing product with the specified ID. Accepts a JSON object with product details in the request body.
    *   `DELETE`: Deletes a product with the specified ID from the database. `[id]` is a dynamic segment representing the product ID.
*   `/api/product/updateQuantity`:
    *   `POST`: Updates the quantity of a product. Accepts a JSON object with `productId` and `quantity` in the request body.
*   `/api/search`:
    *   `GET`: Searches for products by name. Accepts a `query` parameter in the URL (e.g., `/api/search?query=sweater`). Returns a JSON object with a `products` array of matching products.

## Frontend Components and Features

*   **Dashboard (app/dashboard/page.js):**
    *   **Add New Product:** A form for creating new products, including fields for name, quantity, price, category, and status.
    *   **Current Inventory:** Displays a table of products with editable fields for quantity and buttons for edit and delete. Clicking the "Edit" button transforms the row into an editable form, allowing modification of all product properties.
    *   **Search Bar:** A search input field for filtering products by name.
    *   **Logout Button:** A logout button in the header that clears local authentication and redirects to the login page.
*   **Edit Functionality:**
    *   Click the "Edit" button in the product row to open the form.
    *   Modify the values in the `Product Name`, `Quantity`, `Price`, `Category`, and `Status` fields.
    *   Click "Update" to save changes to the database and the display. Click "Cancel" to revert to the original product data.