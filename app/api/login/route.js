import crypto from "crypto";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = "mongodb+srv://naturalpearl05:Database18@projectmern.hsdrf.mongodb.net/?retryWrites=true&w=majority&appName=ProjectMern";
const client = new MongoClient(uri);

// Function to hash a password - uses Node.js crypto
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

// Timing-safe comparison function - modified to handle hashed and salted passwords
function safeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
        return false;
    }
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}

export async function POST(req) {
    try {
        await client.connect();
        const db = client.db("Stock"); // Call database
        const users = db.collection("login"); // Call collection

        const { email, password } = await req.json();

        // Trim whitespace and enforce lowercase
        const trimmedEmail = email.trim().toLowerCase();

        // Find user by email
        const user = await users.findOne({ email: trimmedEmail });

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }
        //Retrieve stored salt
        const storedSalt = user.salt
        //Hash the given password from user with that stored salt.
        const hashedInputPassword = hashPassword(password, storedSalt);
        // Compare hashed passwords
        const passwordMatch = safeCompare(hashedInputPassword, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        return NextResponse.json({
            message: "Login successful",
            user: {
                email: user.email,
                name: user.name,
                password: user.password
            },
        }, { status: 200 });

    } catch (e) {
        console.error("Login error:", e);
        return NextResponse.json({ message: "Login failed" }, { status: 500 });
    } finally {
        await client.close();
    }
}