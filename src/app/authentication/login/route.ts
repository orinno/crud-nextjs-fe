import { NextResponse } from "next/server";
import { loginUser } from "../auth/authController";

export async function POST(request: Request){
    const {email, password} = await request.json();

    try{
        const result = await loginUser(email, password);
        if(result.success){
            return NextResponse.json({success: true, user: result.user});
        } else {
            return NextResponse.json({success: false, message: result.message});
        }
    } catch (error : unknown){
        const errorMessage = error instanceof Error ? error.message : 'unknown error';
        console.error('error during login ', errorMessage)
        return NextResponse.json({success: false, error: errorMessage});
    }
}