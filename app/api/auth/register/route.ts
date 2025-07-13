import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //Get data
    const { email, password } = await request.json();

    //Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email & password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User is already registered" },
        { status: 400 }
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error");
    return NextResponse.json(
        { error: "Failed to register user" },
        { status: 400 }
      );
  }
}
