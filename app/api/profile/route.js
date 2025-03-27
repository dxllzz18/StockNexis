// Backend API route (api/profile/route.js)
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
const client = new MongoClient(uri);

export async function GET(req) {
    try {
        await client.connect();
        const database = client.db('Stock');
        const users = database.collection('login'); // Replace with your collection name

        // Assuming you have a way to identify the user (e.g., from a session or JWT)
        // Replace "someUserID" with the actual user ID
        const userID = "someUserID";
        const userProfile = await users.findOne({ _id: userID });

        if (!userProfile) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }

        return new NextResponse(JSON.stringify(userProfile), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error("Database error:", error);
        return new NextResponse(JSON.stringify({ message: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    } finally {
        await client.close();
    }
}