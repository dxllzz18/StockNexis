import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query= request.NextUrl.searchParams.query;
    
const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
const client = new MongoClient(uri);
    try {
        const database = client.db('management');
        const inventory = database.collection('inventory');
        
        const product = await inventory.aggregate([
            {
                "$match": {
                    "$or": [
                        { "productName": { "$regex": query, "$options": "i" } },
                    ]
                }
            }
        ]);
        return NextResponse.json({allProducts});
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
