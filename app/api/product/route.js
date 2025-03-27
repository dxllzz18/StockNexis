// /api/product/route.js
import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {

    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const database = client.db("Stock");
        const inventory = database.collection("inventory");

        // Fetch data
        let products = await inventory.find().toArray();
        console.log("📦 Query Results:", products);

        return NextResponse.json({ products });

    } catch (error) {
        console.error("❌ Database Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products", message: error.message },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}

//Post
export async function POST(request) {
    let body = await request.json()
    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const database = client.db("Stock");
        const inventory = database.collection("inventory");

        const product = await inventory.insertOne(body);
        const insertedId = product.insertedId; // Get the inserted ID
        const newProduct = await inventory.findOne({ _id: new ObjectId(insertedId) });  // Fetch the newly inserted document

        return NextResponse.json({ product: newProduct, ok: true });  // Return the complete newProduct

    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error connecting to DB", status: 500 })
    }
    finally {
        await client.close();
    }
}

