import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    // Connection URI
    const uri = "mongodb+srv://naturalpearl05:Database18@inventory@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";

    const client = new MongoClient(uri);

    try {
        const body = await request.json();
        const { action, slug, initialQuantity } = body;

        await client.connect();
        const database = client.db('management');
        const inventory = database.collection('inventory');

        let newQuantity;
        if (action === "plus") {
            newQuantity = (parseInt(initialQuantity) + 1).toString();
        } else {
            newQuantity = Math.max(0, parseInt(initialQuantity) - 1).toString();
        }

        // Update the product quantity
        const result = await inventory.updateOne(
            { productName: slug },
            { $set: { quantity: newQuantity } }
        );

        if (result.modifiedCount === 1) {
            return NextResponse.json({
                success: true,
                message: "Product quantity updated",
                newQuantity
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Product not found or not updated"
            }, { status: 404 });
        }
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    } finally {
        await client.close();
    }
}

