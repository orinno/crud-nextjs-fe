import { db } from "../../db";

export default async function handler(req, res) {
    if (req.method === 'GET') { // Tangani hanya metode GET
        try {
            const connection = await db.getConnection();
            res.status(200).json({ status: 'success', message: 'Koneksi berhasil' });
            connection.release(); // Lepaskan koneksi
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Koneksi gagal', error: error.message });
        }
    } else {
        res.status(405).json({ status: 'error', message: 'Metode tidak diizinkan' });
    }
}
