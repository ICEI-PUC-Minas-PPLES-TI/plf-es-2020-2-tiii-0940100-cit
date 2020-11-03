var mysql      = require('mysql');
module.exports = class Database {
    connect() { 
        var connection = mysql.createConnection({
            host     : '20.185.248.255',
            user     : 'lucas',
            password : 'lucas',
            database : 'cit'
        });
        connection.connect();
        return connection;
    }
}