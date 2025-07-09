
async function addCorreto(palavra){
const { leitorDeJSON } = require('./verificaErros.js');
const { editorJSON } = require('./verificaErros.js');

const corretos = await leitorDeJSON("validos.json");

if (!corretos){
    console.error('o "validos.json" não abriu de jeito nenhum');
    return;}

else {
    const jaTaNoArq = corretos.some(coisa => palavra === coisa);
    
    if (!jaTaNoArq){
        corretos.push(palavra);
        await editorJSON(corretos);}

    return;
}
}

module.exports= { addCorreto };

