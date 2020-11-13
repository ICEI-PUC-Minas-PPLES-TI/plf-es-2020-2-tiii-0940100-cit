var mysql      = require('mysql');
module.exports = class Database {
    connect() { 
        var connection = mysql.createConnection({
            host     : 'localhost',//'13.68.187.238',
            user     : 'lucas',
            password : 'lucas',
            database : 'cit'
        });
        connection.connect();
        return connection;
    }
}