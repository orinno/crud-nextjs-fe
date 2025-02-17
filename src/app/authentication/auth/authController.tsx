 import { NextApiRequest, NextApiResponse } from 'next';
 import bcrypt from 'bcrypt';
import pool from '../../../../db';
import mysql from 'mysql2/promise';

interface User{
    id: number;
    username: string;
    password: string;
}

/*interface QueryResult {
    rows: any[];
}

let result: QueryResult;*/

export async function registerUser(name: string, email: string, password: string){//ini proses masukin data regis ke db
     try{
         const [result]:  any = await pool.query(
             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]
         );
         return {success: true, userId: result.insertId};
     } catch (error : unknown){
         const errorMessage = error instanceof Error ? error.message : 'unknown error';
         console.error('error during register ', errorMessage);
         return {success: false, error: (error as Error).message};
     }
 }


 export async function loginUser(username: string, password: string){//ini proses nyari akun di db
     try{
         const [rows]: any = await pool.query(
             'SELECT * FROM users WHERE username = ? AND password = ?', [username, password]
         );
         if (rows.length > 0){
             return {success: true, user: rows[0]}; //kalo ada satu baris yg ketentuannya sama, berarti akunnya ada
         } else {
             return {success: false, message: 'invalid'}//kalo gaada baris yg ketentuannya memenuhi, berarti invalid ga bisa login karena akunnya ga kedaftar
         }
     } catch (error : unknown){
         const errorMessage = error instanceof Error ? error.message : 'unknown error';
         console.error('error during login ', errorMessage)
         return {success: false, error: (error as Error).message};
     }
 }

