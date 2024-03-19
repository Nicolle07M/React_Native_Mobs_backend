const mysql = require('mysql2'); // npm install mysql2

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1031647462Nm',
    database: 'delivery_react',
    authPlugins : {
        mysql_clear_password: () => Buffer.from('1031647462Nm', 'utf-8'),
        caching_sh2_password : true,
    }
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;