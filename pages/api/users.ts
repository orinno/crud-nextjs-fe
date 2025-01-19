import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db';
import { RowDataPacket } from 'mysql2'; // Import tipe data RowDataPacket

type User = {
    id: number;
    name: string;
    email: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Ambil semua data dari tabel "users"
        const [rows] = await db.query<User[] & RowDataPacket[]>('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
