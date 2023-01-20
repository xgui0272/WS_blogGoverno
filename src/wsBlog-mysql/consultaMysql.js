const mysql = require('mysql');

const titulo = 'Discurso do vice-presidente Geraldo Alckmin';
const teste = 'ois'


const pool = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'

});

const consulta = (msg) => {
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query('SELECT * FROM `noticias` WHERE `titulo` = ?', msg, function(error, result, fields) {
            let countResult =  result.length
            if(countResult === 0) {
                console.log('TITULO NÃO CADASTRADO');

            } else {
                console.log('Titulo cadastrado!')
            }

            if(error) throw error;
        });
    })
}

consulta(teste);