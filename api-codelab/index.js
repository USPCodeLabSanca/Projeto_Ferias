// Importa o framework Express
const express = require('express');
const fs = require('fs');

// Cria uma instância do aplicativo Express
const app = express();
const PORT = 3001; // Define a porta em que o servidor vai rodar

// Cria uma rota GET simples para a raiz do site ("/")
app.get('/', (req, res) => {
  res.send('Minha primeira API do CodeLab está no ar!');
});

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Funcionalidade 1 - Aleatório
app.get('/nomes/aleatorio', (req, res) => {
    try {
        const jsonData = JSON.parse(fs.readFileSync("json/erros.json"));
        const palavras = Object.keys(jsonData.erros);
        const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
        
        // Retorna a palavra como resposta
        res.json({ palavra: palavraAleatoria });
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
});

// Funcionalidade 2 - Verificar
app.post('/verificar/:palavra', (req, res) => {
    try {
        const jsonData = JSON.parse(fs.readFileSync("json/validos.json"));
        ehValido = jsonData.validos.includes(req.params.palavra); // Checa se a palavra está na lista de válidas
        
        // Se não for válido, coloca no arquivo de erros e atualiza o contador de gafes
        if (!ehValido) {
            const jsonErro = JSON.parse(fs.readFileSync("json/erros.json"));
            jsonErro.erros[req.params.palavra] = (jsonErro.erros[req.params.palavra] || 0) + 1;
            fs.writeFileSync("json/erros.json", JSON.stringify(jsonErro, null, 4))
        }

        // Retorna um booleano se está certo ou não.
        res.send(ehValido.toString())
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
});

// Funcionalidade 3 - Atualizar lista de válidos
app.post('/nomes/validos/:palavra', (req, res) => {
    try {
        const jsonData = JSON.parse(fs.readFileSync("json/validos.json"));
        
        // Se não tiver a palavra, inclui na lista
        if(!jsonData.validos.includes(req.params.palavra)) {
            jsonData.validos.push(req.params.palavra);
            fs.writeFileSync("json/validos.json", JSON.stringify(jsonData, null, 4));
            res.send(`Adicionado à lista de válidos: ${req.params.palavra}`);
        } else {
            res.send(`Palavra já está na lista de válidos: ${req.params.palavra}`);
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
});

// Funcionalidade 4 - Mostrar as maiores gafes
app.get('/estatisticas/erros', (req, res) => {
    try {
        const jsonData = JSON.parse(fs.readFileSync("json/erros.json"));
        const entries = Object.entries(jsonData.erros);
    
        const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
        
        // Enviar os dados ordenados como JSON
        res.json(sortedEntries);
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
});

