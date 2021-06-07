const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user:'root',
    password: 'root',
    database: 'library',
    connectionLimit: 5
});


async function run() {
    let conn;
    try {

        conn = await pool.getConnection();
        let arg = process.argv[2];
        const book = await conn.query
        ("SELECT books.name AS book, libraries.name AS library FROM books JOIN libraries ON books.book_id = libraries.library_FK where books.name =?", [arg]);

        console.log(book);

    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

run();
