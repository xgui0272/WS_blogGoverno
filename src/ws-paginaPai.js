const cheerio = require('cheerio');
const axios = require('axios');

const urlPai = 'https://www.gov.br/pt-br/noticias';

axios.get(urlPai)
.then((resp) => {
    const dadosHtml = resp.data;
    const $ = cheerio.load(dadosHtml);
    const dados = []

    $('a[class="summary url"]').each((i, e) => {
        const link = $(e).attr('href');

        dados.push(link)

    })

    console.log(dados);

})