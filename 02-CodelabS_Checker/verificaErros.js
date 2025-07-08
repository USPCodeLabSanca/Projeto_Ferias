//verificador de nomes corretos
    const fs= require('fs').promises;

    async function leitorDeJSON(nomeArq){
        try{
            const dados = await fs.readFile(nomeArq, 'utf8');
            return (JSON.parse(dados));
        }

        catch(error) {
            console.error(`Deu ruim pra ler ${nomeArq}`, error);
        }
    };

    async function editorJSON(nomeArq, vaiEscreverOque){
        try{
            await fs.writeFile(nomeArq, JSON.stringify(vaiEscreverOque, null, 2));
        }

        catch(error) {
            console.error('Deu ruim pra editar:', error);
        }
    }
    
    async function verificaCorretos(palavra){

        const errados=[];
        errados.push(await leitorDeJSON("erros.json"));

        const corretos=  await leitorDeJSON("validos.json");

        if (!errados || !corretos) {
            console.error('Simplemente não carregou os arquivos JSON família');
            return false;
        }

        let alguemJaErrou=false;
        let contagem=0;

        const correto = corretos.some(coisa => palavra === coisa);

        if (correto)
            return true;

        else{
            //verifica se alguem já tentou aquela palavra errada
                for (let i = 0; i < errados.length; i++) {
                    if (palavra === errados[i].palavra) {
                    alguemJaErrou = true;
                    errados[i].numVezes++;
                    break;
        }
    }
                if(!alguemJaErrou){                  //se ninguém nunca cometeu esse erro, ele é guardado como um novo objeto
                    const idNovo= errados.length;
                    const novoErro= {
                        "id": idNovo, 
                        "palavra": palavra, 
                        "numVezes": 1, 
                        "estatística":0}
                    errados.push(novoErro);
            }

            //isso aqui atualiza a estatistica de erro de cada objeto no array errados
                errados.forEach(coisa =>{
                    contagem = contagem + coisa.numVezes;});

                errados.forEach(coisa =>{
                    coisa.estatística = (100 * coisa.numVezes/contagem).toFixed(2);
                });
        
        }

        //reecreve o JSON
            editorJSON("erros.json", errados);
        return false;    

    }

    module.exports = { verificaCorretos }; 