//TITULO
//LINKIMG
//DATA PUBLICAÇÃO
//TEXTO


const cheerio = require('cheerio');
const axios = require('axios');

const urlFilho = 'https://www.gov.br/pt-br/noticias/meio-ambiente-e-clima/2023/01/marina-silva-anuncia-a-criacao-da-autoridade-nacional-de-seguranca-climatica';
const urlFilho2 = 'https://www.gov.br/pt-br/noticias/cultura-artes-historia-e-esportes/2023/01/com-meta-de-revolucao-no-direito-ao-esporte-para-todos-ana-moser-assume-o-ministerio-do-esporte'

axios.get(urlFilho2)
.then((resp) => {
    const dadosHtml = resp.data;
    const $ = cheerio.load(dadosHtml);

    const titulo = $('h1').text();
    const linkImg =$('img').attr('src');
    const dataPubli = $('span[class="value"]').text();
    const texto = $('div[property="rnews:articleBody"]').text();

    const dados = {titulo, linkImg, dataPubli, texto}

    console.log(dados);
})

