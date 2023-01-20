const cheerio = require('cheerio');
const axios = require('axios');
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit:15,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'

});

const salvandodados = (dt) => {

    pool.getConnection(function (err, connection) {

        if(err) throw err;
        connection.query('INSERT INTO noticias set ?', dt, function(error, result, fields) {
            console.log('CADASTRANDO NOTICIAS!')
            connection.release()

            if(error) throw error;
        })

    })
    
    
}

function gravando(linhas) {
    const dados = {
        titulo: linhas.titulo,
        linkimg: linhas.linkimg,
        texto: linhas.texto,
    }
    
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query('SELECT * FROM `noticias` WHERE `titulo` = ?', dados.titulo, function(error, result, fields) {
            let countResult =  result.length
            if(countResult === 0) {
                salvandodados(dados);

            } else {
                console.log('Titulo cadastrado!')
            }

            if(error) throw error;
        });
    })

    
}

const urlPai = 'https://www.gov.br/pt-br/noticias';

function extraiDados (link) {
    axios.get(link)
    .then((resp) => {
        const dadosHtml = resp.data;
        const $ = cheerio.load(dadosHtml);

        const titulo = $('h1').text();
        const linkimg =$('img').attr('src');
        const dataPubli = $('span[class="value"]').text();
        const texto = $('div[property="rnews:articleBody"]').text();

        const dados = {titulo, linkimg, texto}

        gravando(dados);
    });

};

const links = axios.get(urlPai)
        .then((resp) => {
        const dadosHtml = resp.data;
        const $ = cheerio.load(dadosHtml);
        const dados = []

        $('a[class="summary url"]').each((i, e) => {
            const link = $(e).attr('href');

            dados.push(link)

        });

        return dados;

});

async function main() {
    const lnks = await links;

    lnks.map((i, e) => {
        extraiDados(i);
    })
}

main();

setTimeout(()=> {
    pool.end();
}, 25000);