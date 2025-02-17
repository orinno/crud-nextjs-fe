import { NextApiRequest, NextApiResponse } from 'next';
//import db from '../../db'
import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { comparePassword } from '@/app/authentication/auth/auth';

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({success: false, message: 'method are not allowed'})
    }

    const {username, password} = req.body;//ini pindahin ke atas sebelum try

      try{
        console.log('data diterima: ', {username, password});

        const connection = await mysql.createConnection(db);
        
        const[rows] = await connection.execute<RowDataPacket[]>(
           'SELECT * FROM users WHERE username = ?', [username]
        );

        if(rows.length === 0){
            return res.status(401).json({success: false, message: 'username ga ada di database'});
        }
        const user = rows[0];
        const isPasswordValid = await comparePassword(password, user.hashedPassword);
        if(!isPasswordValid){
          return res.status(401).json({message:'invalid password'});
        }
        return res.status(200).json({success: true, message: 'login sukses', user});
      } catch ( error){
        console.error('error di api', error);
        return res.status(500).json({success: false, message: 'internal server error'})
      }
    }
    //kemarin error karena pas di success nya ada 3 c, terus di if method nya juga malah triple equal, harusnya !==
    // that's why sebenernya bisa run tapi salah declare what to run di method aja