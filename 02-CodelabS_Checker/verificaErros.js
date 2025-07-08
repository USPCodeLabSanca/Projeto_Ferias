//verificador de nomes corretos
    const fs= require('fs').promises;

    async function leitorDeJSON(nomeArq){
        try{
            const dados = await fs.readFile(nomeArq, 'utf8');
            return (JSON.parse(dados));
        }

        catch(error) {
            console.error(`Deu ruim pra ler "${nomeArq}"`, error);
            return [];
        }
    };

    module.exports = { leitorDeJSON }; 

    async function editorJSON(nomeArq, vaiEscreverOque){
        try{
            await fs.writeFile(nomeArq, JSON.stringify(vaiEscreverOque, null, 2));
        }

        catch(error) {
            console.error('Deu ruim pra editar:', error);
        }
    }

    module.exports = { editorJSON }; 

    function estatisticas(aray){
        //isso aqui atualiza a estatistica de erro de cada objeto no aray
            let contagem=0;
            aray.forEach(coisa =>{
                contagem = contagem + coisa.numVezes;});

                aray.forEach(coisa =>{
                    coisa.estatistica = (100 * coisa.numVezes/contagem).toFixed(2);
                });

        //isso aq põe em ordem de mais frequente até menos frequente
            aray.sort( (a,b)= b.numVezes - a.numVezes);
            
            for(let j=0; j<aray.length; j++)
                aray[j].id=j+1;
    }
    
    async function verificaCorretos(palavra){

        const errados= await leitorDeJSON("erros.json");
        const corretos=  await leitorDeJSON("validos.json");

        if (!corretos){
            console.error('não consegui ler "validos.json');
            return false;
        }

        if (!errados) {
            console.error('não consegui ler "erros.json"');
            return false;
        }

        let alguemJaErrou=false;
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
                        "id": idNovo+1, 
                        "palavra": palavra, 
                        "numVezes": 1, 
                        "estatistica":0}
                    errados.push(novoErro);
            }
            estatisticas(errados);
        }

        //reecreve o JSON
        await editorJSON("erros.json", errados);
        return false;    

    }

    module.exports = { verificaCorretos }; 