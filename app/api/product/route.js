import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
const client = new MongoClient(uri);
    try {
        const database = client.db('management');
        const inventory = database.collection('inventory');
        const query = {};
        const allProducts = await inventory.find(query).toArray();
        return NextResponse.json({allProducts});
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function POST(request) {
    let body=await request.json();
    console.log(body);

    const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
    const client = new MongoClient(uri);
        try {
            const database = client.db('Stock');
            const inventory = database.collection('inventory');
            const query = {};
            const product = await inventory.insertOne(body);
            return NextResponse.json({product , ok:true});
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }