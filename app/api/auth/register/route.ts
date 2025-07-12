import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";


// get data from frontend
// validation
// existing user check
// create user in DB
// return success massage


export async function POST(request: NextRequest) {
    try {
        // get data from frontend
        const { email, password } = await request.json();
        // validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "email and password are requied" },
                { status: 400 }
           )
        }
        // existing user check
        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already registered" },
                {status:400}
            )
        }
        // create user in DB
        await User.create({ email, password })
        
        // return success massage
        return NextResponse.json(
            { error: "User registered successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Register error",error)
        return NextResponse.json(
            { error: "failed to registerd user" },
            { status: 400 }
        )
    }
}