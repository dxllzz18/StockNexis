import crypto from "crypto";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Function to hash a password
function hashPassword(password, salt) {
    const hashedPassword = crypto.pbkdf2Sync(
        password,
        salt,
        10000,      // iterations - adjust for security
        64,         // key length
        'sha512'    // digest algorithm
    ).toString('hex');
    return hashedPassword;
}

export async function POST(req) {
    try {
        const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern"; //Ensure the URI is server
        const client = new MongoClient(uri);

        // Connect to MongoDB
        await client.connect();
        console.log("Successfully connected to MongoDB");

        const db = client.db("Stock"); //Ensure to call the database
        const users = db.collection("login"); //Ensure to call the correct collection

        // Parse request body
        const body = await req.json();
        const { name, email, password, confirmPassword } = body;

        // Validate input
        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json({
                message: "All fields are required"
            }, { status: 400 });
        }

        // Check password match
        if (password !== confirmPassword) {
            return NextResponse.json({
                message: "Passwords do not match"
            }, { status: 400 });
        }

        // Normalize email
        const trimmedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const existingUser = await users.findOne({ email: trimmedEmail });
        if (existingUser) {
            return NextResponse.json({
                message: "Email already registered"
            }, { status: 400 });
        }

        // Generate a random salt
        const salt = crypto.randomBytes(16).toString('hex');

        // Hash the password
        const hashedPassword = hashPassword(password, salt);

        // Create new user object
        const newUser = {
            name,
            email: trimmedEmail,
            password: confirmPassword,
            salt: salt,  // Store the salt
            createdAt: new Date()
        };

        // Insert user
        const result = await users.insertOne(newUser);

        // Check insertion result
        if (!result.insertedId) {
            return NextResponse.json({
                message: "Failed to register user"
            }, { status: 500 });
        }

        return NextResponse.json({
            message: "User registered successfully",
            userId: result.insertedId
        }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    } finally {
        try {
            const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
            const client = new MongoClient(uri);
            await client.close();
            console.log("MongoDB connection closed");
        } catch (closeError) {
            console.error("Error closing MongoDB connection:", closeError);
        }
    }
}