import { NextResponse } from "next/server";
import db from '../../../db';

export async function GET(req: Request, {params}: {params : {jabatan_id: string}}){
    try{
        const {jabatan_id} = params;
        const golongan = await db.query("SELECT * FROM golongan where jabatan_id = ?", [jabatan_id]);
        return NextResponse.json(golongan);
    } catch (error) {
        return NextResponse.json({error: "Gagal ngambil data golongan"}, {status : 500});
    }
}