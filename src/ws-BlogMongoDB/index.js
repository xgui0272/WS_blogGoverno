const cheerio = require('cheerio');
const axios = require('axios');
const mongoose = require('mongoose');
const blog = require('./schema-blog');

const urlPai = 'https://www.gov.br/pt-br/noticias';

mongoose.connect('mongodb+srv://xgui0272:0272uu0272@cluster0.nwtsz4i.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('Conexão Funcionando!')
})
.catch((error) => console.log('Deu problema!' + error));


function salvandoDados(dt) {
    const novodado = new blog({
        titulo: dt.titulo,
        linkimg: dt.linkImg,
        datapublicacao: dt.dataPubli,
        texto: dt.texto
    })

    blog.find({'titulo':dt.titulo}, function(err, otitulo) {
        if(err) throw(err);
        if(otitulo.length === 0) {
            novodado.save();
            console.log('Cadastrando Noticias!')
        } else {
            console.log('Dado já cadastrado!')
        }
    });

    
}


function extraiDados (link) {
    axios.get(link)
    .then((resp) => {
        const dadosHtml = resp.data;
        const $ = cheerio.load(dadosHtml);

        const titulo = $('h1').text();
        const linkImg =$('img').attr('src');
        const dataPubli = $('span[class="value"]').text();
        const texto = $('div[property="rnews:articleBody"]').text();

        const dados = {titulo, linkImg, dataPubli, texto}

        //console.log(dados);
        salvandoDados(dados);
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

setTimeout(() => {
    mongoose.connection.close();
    console.log('Conexão encerrada!')
}, 15000)
