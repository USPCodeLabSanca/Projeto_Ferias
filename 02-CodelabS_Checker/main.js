// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
var fs = require('fs').promises; 
const PORT = 3000; // Define a porta em que o servidor vai rodar

//Insere novos nomes 
app.post('/nomes/validos', async (req, res) => {
    const {name} = req.body; 

    if(!name){
        return res.status(400).json({erro: "É necessário inserir um nome"}); 
    }

    try {
        const validData = await fs.readFile("validos.json", "utf-8"); 
        const validNames = JSON.parse(validData); 

        const isValid = validNames.some(n => n.ToLoweCase() === realName.ToLoweCase()); 

        if(isValid){
            
        }



    }
    catch(error){
        console.error(error); 
        return res.status(500).json({ erro: "Ocorreu um erro no servidor." });


    }

    //Verificar se nome já existe no BD 
    //CP -> RETURN : NOME JÁ EXISTE 
    //CC -> ADICIONAR NOME AO BD 


});


//TODO: coletar estatística de erro 
//Verificar nomes 
app.post('/verificar', async (req, res) => {
    const {name} = req.body; 

    if(!name){
        return res.status(400).json({erro: "É necessário um nome"}); 

    }

    const realName = name.trim() //Tirando os espaços 

    //Verifica na lista se o nome é válido 
    try{
        const validData = await fs.readFile("validos.json", "utf-8"); 
        const validNames = JSON.parse(validData); 

        const isValid = validNames.some(n => n.ToLoweCase() === realName.ToLoweCase()); 

        if(isValid){
            return res.json({valido: true}); 
        }
        else{
            return res.json({valido: false}); 
        }

    }

    catch(error){
        console.error(error); 
        return res.status(500).json({ erro: "Ocorreu um erro no servidor." });


    }
})


