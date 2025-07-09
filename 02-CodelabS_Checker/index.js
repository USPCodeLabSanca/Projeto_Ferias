// Importa o framework Express
    const express = require('express');

// Cria uma instância do aplicativo Express
    const app = express();
    const PORT = 5000; // Define a porta em que o servidor vai rodar´

    app.use(express.json());

//Cria uma rota GET para pegar nome aleatório errado
    const { geradorDePalavras } = require('./geradorAleatorio.js');
    app.get('/nomes/aleatorio', (req, res) => {
        const codzlebs=geradorDePalavras();
        res.send(codzlebs);
});

//Cria uma rota POST para verificar se a grafia de codelab do usuário está correta
    const { verificaCorretos } = require('./verificaErros.js');

    //para usar a url direto no browser, tem essa versão com GET
        //app.get(`/verificar/:bob`, async (req, res)=>{
            //const { bob } = req.params;
            //const estaCorreto= await verificaCorretos(bob);
            //res.send(estaCorreto);
        //});

    //aqui é com POST mesmo
        app.post(`/verificar`, async(req,res)=>{
            const { grafia }= req.body;

            if (!grafia)
                return res.status(400).json({"mensagem": "sem uma palavra pra verificar, como é que eu vou testar se ela pertence à lista de corretos, ein patrão?"});
        
            try{
                const estaCorreto= await verificaCorretos(grafia);
                console.log("a função verificaCorretos retornou:", estaCorreto);
                console.log("começando a enviar a resposta, fica esperto ein");

                res.on('finish', ()=> console.log("muitos (eu) duvidaram da nossa capacidade, mas o trem foi enviado com sucesso!"));
                res.on('error', ()=> console.log("como era de se esperar, deu ruim na hora de enviar a resposta"));

                res.status(201).json(estaCorreto);

            }catch(error){
                console.log("erro ao enviar grafia", error)
                res.status(500).json({"erro": error.message});
            }
        }
    )

//Cria uma rota POST para adicionar uma nova grafia de codelab
    const { addCorreto } = require('./adicionarGrafiaCerta.js');
    app.get(`/nomes/validos/:bob`, async (req, res)=>{
        const { bob } = req.params;
        await addCorreto(bob);
        res.send("funcionou que é uma maravilha!");
    });

//Cria uma rota GET para ver estatisticas de erro
    const { leitorDeJSON } = require('./verificaErros.js');
    app.get(`/estatisticas/erros`, async (req, res)=>{
        const lista= await leitorDeJSON("erros.json");
        res.send(lista);
    });

// Inicia o servidor e o faz "ouvir" na porta definida 
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});