// lib/db.js
import mysql from 'mysql2';

const db = createPool({
    host: 'localhost', 
    user: 'root',      
    password: '',      
    database: 'nextapp', 
});

export function connectToDatabase() {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Koneksi berhasil terhubung');
            }
        });
    });
}
