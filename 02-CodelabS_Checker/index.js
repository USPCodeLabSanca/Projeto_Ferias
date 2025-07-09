// Importa o framework Express
    const express = require('express');

// Cria uma instância do aplicativo Express
    const app = express();
    const PORT = 5000; // Define a porta em que o servidor vai rodar´

    app.use(express.json());

//Cria uma rota GET para pegar nome aleatório errado
    const { geradorDePalavras } = require('./geradorAleatorio.js');

    app.get('/nomes/aleatorio', (req, res) => {
        try{
            const codzlebs=geradorDePalavras();
            res.json(codzlebs);
    
        }catch(error){
            res.status(500).json({"erro": error});
        }
    });

//Cria uma rota POST para verificar se a grafia de codelab do usuário está correta
    const { verificaCorretos } = require('./verificaErros.js');

    //para usar a url direto no browser, tem essa versão simples com GET
        //app.get(`/verificar/:bob`, async (req, res)=>{
            //const { bob } = req.params;
            //const estaCorreto= await verificaCorretos(bob);
            //res.send(estaCorreto);
        //});

    //aqui é com POST mesmo
        app.post(`/verificar`, async(req,res)=>{
            const { grafia }= req.body;

            if (!grafia)
                return res.status(400).json({"mensagem": "favor incluir uma grafia para verificar!"});
        
            try{
                const estaCorreto= await verificaCorretos(grafia);
                res.status(201).json({"sucesso": true, "resposta": estaCorreto});

            }catch(error){
                console.log("erro ao enviar grafia", error)
                res.status(500).json({"sucesso": false, "erro": error});
            }
        });

//Cria uma rota POST para adicionar uma nova grafia de codelab
    const { addCorreto } = require('./adicionarGrafiaCerta.js');

    //para usar a url direto no browser, tem essa versão simples com GET
        //app.get(`/nomes/validos/:bob`, async (req, res)=>{
            //const { bob } = req.params;
            //await addCorreto(bob);
            //res.send("funcionou que é uma maravilha!");
        //});

    //com o POST
         app.post(`/nomes/validos`, async(req,res)=>{
            const { grafia }= req.body;

            if (!grafia)
                return res.status(400).json({"mensagem": "favor incluir uma grafia para adicionar à lista de corretos"});
        
            try{
                const funcionou=await addCorreto(grafia);
                if (funcionou)
                    res.status(201).json({"sucesso": true, "mensagem": "Sua palavra foi adicionada com sucesso!"});
                else
                    res.status(500).json({"sucesso": false,"erro": "não conseguimos editar o validos.json"});

            }catch(error){
                console.log("erro ao enviar grafia", error);
                res.status(500).json({"sucesso": false,"erro": error});
            }
        });

//Cria uma rota GET para ver estatisticas de erro
    const { leitorDeJSON } = require('./verificaErros.js');
    app.get(`/estatisticas/erros`, async (req, res)=>{
        try{
            const lista= await leitorDeJSON("erros.json");
            res.json(lista);

        }catch(error){
            console.log("erro ao enviar lista", error);
            res.status(500).json({"erro": error});
        }
    });

// Inicia o servidor e o faz "ouvir" na porta definida 
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});