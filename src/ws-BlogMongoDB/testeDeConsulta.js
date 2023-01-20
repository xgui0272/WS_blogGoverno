const mongoose = require('mongoose');
const blog = require('./schema-blog');

const frase = 'Discurso do vice-presidente Geraldo Alckmin';

mongoose.connect('mongodb+srv://xgui0272:0272uu0272@cluster0.nwtsz4i.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result) => {
    console.log('Conexão Funcionando!')
})
.catch((error) => console.log('Deu problema!' + error));

blog.find({'titulo':frase}, function(err, otitulo) {
    if(err) throw(err);
    if(otitulo.length === 0) {
        console.log('NÃO CADASTRADO!')
    } else {
        console.log('Dado já cadastrado!')
    }
});

setTimeout(() => {
    mongoose.connection.close();
    console.log('Conexão encerrada!')
}, 15000)