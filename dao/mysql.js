const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host     : '127.0.0.1',     // 数据库地址
//     user     : 'root',          // 数据库用户
//     password : '',        // 数据库密码
//     database : 'my_database'    // 选中数据库
// });
//
// // 执行sql脚本对数据库进行读写
// connection.query('SELECT * FROM my_table',  (error, results, fields) => {
//     if (error) throw error;
//     // connected!
//
//     // 结束会话
//     connection.release();
// });

// // 创建数据池
// const pool  = mysql.createPool({
//     host     : '127.0.0.1',     // 数据库地址
//     user     : 'root',          // 数据库用户
//     password : '',              // 数据库密码
//     database : 'my_database'    // 选中数据库
// });
//
// // 在数据池中进行会话操作
// pool.getConnection(function(err, connection) {
//
//     connection.query('SELECT * FROM my_table',  (error, results, fields) => {
//
//         // 结束会话
//         connection.release();
//
//         // 如果有错误就抛出
//         if (error) throw error;
//     })
// });

const pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '12345678',
    database :  'my_database'
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        });
    });
};

module.exports = { query };