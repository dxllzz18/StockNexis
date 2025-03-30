import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectMongoDB();

        // Fetch all products for inventory display
        const products = await Product.find().sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            products
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to fetch inventory"
        }, { status: 500 });
    }
}


export async function POST(request) {
    try {
        const { action, productIds } = await request.json();

        await connectMongoDB();

        if (action === "restock") {
            // Example of a bulk action on inventory
            await Product.updateMany(
                { _id: { $in: productIds } },
                { $set: { status: "In Stock" } }
            );

            return NextResponse.json({
                success: true,
                message: "Products restocked successfully"
            }, { status: 200 });
        }

        return NextResponse.json({
            success: false,
            error: "Invalid action"
        }, { status: 400 });
    } catch (error) {
        console.error("Error performing inventory action:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to perform inventory action"
        }, { status: 500 });
    }
}