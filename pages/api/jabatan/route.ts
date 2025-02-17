import { NextResponse } from "next/server";
import db from '../../../db';

export async function GET(){
    try{
        const jabatan = await db.query("SELECT * FROM jabatan_fungsionalitas");
        return NextResponse.json(jabatan);
    } catch (error){
        return NextResponse.json({error: "Gagal mengambil jabatan"}, {status: 500});
    }
}