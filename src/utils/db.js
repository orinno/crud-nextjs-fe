const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nextapp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export function query(arg0, arg1) {
    throw new Error('Function not implemented.');
}
export default pool;