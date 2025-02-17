import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';
import { hashPassword } from "@/app/authentication/auth/auth";
import bcrypt from 'bcrypt';
//import db from '../../db';

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({message: 'method are not allowed'});
    }
    try{
        const {username, email, password} = req.body;
        const hashedPassword = await hashPassword(password);
        console.log('data diterima:', {username, email});

        const connection = await mysql.createConnection(db);

        const [result] = await connection.execute(
            'INSERT INTO users (username, email, password) value (?, ?, ?)',
            [username, email, hashedPassword]
        );

        console.log('Hasil insert, ', result);
        await connection.end();
        return res.status(201).json({message: 'registrasi berhasil'});
    } catch (error){
        console.error('error di api', error);
        return res.status(500).json({message: 'salahnya di server'})
    }
}