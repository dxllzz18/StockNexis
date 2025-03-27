import { MongoClient, ObjectId, } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const productId = params.id;
    console.log("Attempting to update product with ID:", productId);

    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("Stock");
        const inventory = database.collection("inventory");

        // Check if productId is a valid ObjectId
        if (!ObjectId.isValid(productId)) {
            console.warn("Invalid ObjectId:", productId);
            return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
        }

        const body = await request.json();
        const updateDoc = {
            $set: body,
        };

        const result = await inventory.updateOne(
            { _id: new ObjectId(productId) },
            updateDoc
        );

        if (result.modifiedCount === 1) {
            const updatedProduct = await inventory.findOne({ _id: new ObjectId(productId) });
            console.log("Product updated successfully:", updatedProduct);
            return NextResponse.json({ product: updatedProduct, message: "Product updated successfully" });
        } else {
            console.warn("Product not found or update failed:", productId);
            return NextResponse.json({ error: "Product not found or update failed" }, { status: 404 });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json(
            { error: "Failed to update product", message: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}