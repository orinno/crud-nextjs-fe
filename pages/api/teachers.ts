import { NextApiRequest, NextApiResponse } from "next";
import db from '../../db';
import bcrypt from 'bcrypt';

interface ResultSetHeader{
    insertId: number;
    affectedRows: number;
    fieldCount: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
}

export default async function inputTeacher(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        console.log("body is accepted", req.body);
        const {
            nip, nuptk, name, gender, email, password, birth_place, birth_date, village, address, city, district,
            no_karpeg, province, jabatan_fungsionalitas, nrg, pangkat, tmt_jabatan_fungsionalitas, tmt_pangkat, golongan,
            jenis_guru, status_pegawai, 
        } = req.body;

        try{
            const hashedPassword = await bcrypt.hash(password, 10);

            const connection = await db.getConnection();

            const [result] = await db.execute(
                `INSERT INTO teachers (nip, nuptk, name, gender, email, password, birth_place, birth_date, village, address, city, district, no_karpeg, province, jabatan_fungsionalitas, nrg, pangkat, tmt_jabatan_fungsional, tmt_pangkat, golongan, jenis_guru, status_pegawai) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    nip,
                    nuptk,
                    name,
                    gender,
                    email,
                    hashedPassword, 
                    birth_place,
                    birth_date,
                    village,
                    address,
                    city,
                    district,
                    no_karpeg,
                    province,
                    jabatan_fungsionalitas,
                    nrg,
                    pangkat,
                    tmt_jabatan_fungsionalitas,
                    tmt_pangkat,
                    golongan,
                    jenis_guru,
                    status_pegawai,
                ]
            );
            const insertId = (result as any).insertId;
            console.log("teacher created with ID: ", insertId);
            res.status(201).json({id: insertId, message: 'Teacher created successfully'});
        } catch (error){
            console.error('Database error: ', error);
            res.status(500).json({message: 'Internal server error'})
        }
    } else {
        res.setHeader('allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
