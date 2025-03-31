import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Update Product (PUT)
export async function PUT(request, { params }) {
    const productId = params.id;
    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Stock");
        const inventory = database.collection("inventory");

        if (!ObjectId.isValid(productId)) {
            console.warn("Invalid ObjectId:", productId);
            return NextResponse.json({ message: "Invalid product ID format" }, { status: 400 });  // Changed 'error' to 'message' for consistency
        }

        const body = await request.json();

        const result = await inventory.updateOne(
            { _id: new ObjectId(productId) },
            { $set: body }
        );

        if (result.matchedCount === 0) {  // Use matchedCount to check if product exists
            console.warn("Product not found for update:", productId);
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        if (result.modifiedCount === 0) {
            console.warn("No changes applied to product:", productId);
            return NextResponse.json({ message: "No changes applied to product", }, { status: 200 });
        }

        const updatedProduct = await inventory.findOne({ _id: new ObjectId(productId) });

        if (!updatedProduct) {
            console.error("Failed to retrieve updated product after updateOne:", productId);
            return NextResponse.json({ message: "Failed to retrieve updated product" }, { status: 500 });
        }

        console.log("Product updated successfully:", updatedProduct);
        return NextResponse.json(updatedProduct, { status: 200 }); // Return only the product
    } catch (error) {
        console.error("Database Error (PUT):", error);
        return NextResponse.json({ message: "Failed to update product", error: error.message }, { status: 500 }); // Consistent message
    } finally {
        await client.close();
    }
}

// Delete Product (DELETE)
export async function DELETE(request, { params }) {
    const productId = params.id;  // Moved productId retrieval to the top
    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Stock");
        const inventory = database.collection("inventory");

        if (!ObjectId.isValid(productId)) {
            console.warn("Invalid ObjectId:", productId);
            return NextResponse.json({ message: "Invalid product ID format" }, { status: 400 });
        }

        const result = await inventory.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 0) {
            console.warn("Product not found for deletion:", productId);
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        console.log("Product deleted successfully:", productId);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });  // Simplified success response
    } catch (error) {
        console.error("Database Error (DELETE):", error);
        return NextResponse.json({ message: "Failed to delete product", error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}