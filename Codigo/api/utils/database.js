var mysql      = require('mysql');
module.exports = class Database {
    connect() { 
        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,//'13.68.187.238',
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE
        });
        connection.connect();
        return connection;
    }
}