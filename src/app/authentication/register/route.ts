import { NextResponse } from "next/server";
import { registerUser } from "../auth/authController";

export async function POST(request: Request){
    const {name, email, password} = await request.json();

    try{
        const result = await registerUser(name, email, password);
        if(result.success){
            return NextResponse.json({succes: true, userId: result.userId});
        } else {
            return NextResponse.json({success: false, message: result.error});
        }
    } catch (error){
        const errorMessage = error instanceof Error ? error.message : 'unknown error';
        console.error('error during register ', errorMessage)
        return NextResponse.json({succes: false, error: errorMessage});
    }
}