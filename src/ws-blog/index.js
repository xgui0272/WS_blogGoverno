const cheerio = require('cheerio');
const axios = require('axios');

const urlPai = 'https://www.gov.br/pt-br/noticias';

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

        console.log(dados);
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