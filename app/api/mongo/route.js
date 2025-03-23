import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const uri = "mongodb+srv://naturalpearl05:Database@inventory@projectmern.hsdrf.mongodb.net/?appName=ProjectMern";
const client = new MongoClient(uri);
    try {
        const database = client.db('management');
        const movies = database.collection('inventory');
        const query = {};
        const movie = await movies.find(query).toArray();
        return NextResponse.json({"a": 34});
    } finally {
        await client.close();
    }
}

