# CodelabS Checker

> **Área: Backend (Desenvolvimento de API) | Tecnologias: NodeJs + ExpressJs**

Bem-vindo, Codelaber! Você agora está se preparando para participar do melhor grupo de extensão da USP: **o USP CodeLab**.

Mas, antes de colocar a mão na massa, você precisa nos ajudar a combater uma praga. Todos sabem que somos o melhor grupo, mas uma quantidade alarmante de pessoas simplesmente não consegue acertar como nos chamamos. Fontes oficiais, e-mails e até mesmo nossos amigos cometem gafes infinitas, como:
* Code labe
* Cod lab
* Codalab
* Codeslab
* Codeleb
* e o mais propagado socialmente o Codelab*S*

Em sua reunião do **Boost**, nossa frente focada em desenvolvimento prático, você presenciou o desabafo de seus responsáveis de frente, Shogo e Otavio: eles estão exaustos de ver o nome do grupo ser distorcido de tantas formas.
Para combater este mal, eles propuseram um novo projeto: o desenvolvimento de uma API focada no problema. E você, um(a) Codelaber extremamente engajado(a) com a causa de ver o nome do grupo ser respeitado, decidiu aceitar o desafio.

Sua missão é construir a API definitiva para monitorar, registrar e analisar essa onda de erros, transformando a frustração em dados.

![image](https://i.imgflip.com/9y2o3c.jpg)


## 1. O que vamos construir?

Neste projeto, sua missão é desenvolver o cérebro por trás do nosso sistema de para garantir o nome do grupo: uma **API REST** em Node.js. Pense nela como um serviço: ela não tem uma "cara" (interface gráfica), mas trabalha coletando dados, processando e fornecendo informações para outros sistemas (como um site ou um bot do telegram, por exemplo).

O objetivo é criar um serviço centralizado, robusto e divertido que lide com o problema crônico dos erros de grafia do nome do nosso grupo.

#### Sua Tarefa Como Desenvolvedor(a)

Como a pessoa desenvolvedora desta API, você será responsável por:

1. **Definir os `endpoints`:** Criar as diferentes "portas" de comunicação da API, cada uma com uma responsabilidade específica.
2. **Escrever a Lógica de Negócio:** Implementar em JavaScript as regras que governam o funcionamento de cada endpoint. Por exemplo, "como gerar um nome errado?" ou "como calcular a frequência de erros?".
3. **Gerenciar os Dados:** Estruturar e manipular a nossa "base de dados" (que, para este projeto, serão arquivos `.json` simples) para armazenar a lista de nomes corretos e o registro de todos os erros submetidos.

---
## 2. Conceitos: O que é uma API REST?

Se você nunca ouviu falar de API, não se preocupe! Uma analogia fácil é a de um **restaurante**.

- **Você (o Cliente):** É quem quer alguma coisa (um prato de comida). No nosso caso, o "cliente" pode ser um site, um aplicativo ou outra ferramenta.
* ***A Cozinha (o Servidor):** É o sistema central que armazena os dados (como um estoque de ingredientes) e contém a lógica de negócio (as receitas) para processar os pedidos. O código da nossa API roda aqui.**
- **O Garçom (A API):** Você não entra na cozinha para pegar sua comida. Você interage através de uma interface padronizada, o garçom. A API é essa interface de comunicação que define como o cliente pode interagir com o servidor. Ela recebe pedidos (Requests) e devolve respostas (Responses) de forma estruturada, sem que o cliente precise saber _como_ a "cozinha" funciona por dentro.

Uma **API REST** é simplesmente um conjunto de regras e padrões de arquitetura para que essa conversa entre o cliente e o servidor seja padronizada e previsível. Ela usa os métodos do protocolo HTTP que já conhecemos da web:

|            |                                                        |                                                                 |
| ---------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| **Método** | **Ação**                                              | **Exemplo no Restaurante**                                      |
| **GET**    | **"Me dê um dado."**                                   | "Garçom, me traga o cardápio."                                  |
| **POST**   | **"Tome estes dados e crie algo novo."**               | "Garçom, anote meu pedido para um novo prato."                  |
| **PUT**    | **"Pegue estes dados e atualize algo que já existe."** | "Garçom, quero trocar a batata frita por salada no meu pedido." |
| **DELETE** | **"Apague este dado."**                                | "Garçom, pode cancelar o pedido da sobremesa."                  |
Outro exemplo seria:

| **Método** | **Ação** | **Exemplo num Sistema**                     |
| ---------- | --------- | ------------------------------------------- |
| **GET**    | Read      | "Me entregue os dados de todos os usuários" |
| **POST**   | Create    | "Cadastre um novo usuário"                  |
| **PUT**    | Update    | "Nesse usuário, mude estes dados: ..."      |
| **DELETE** | Delete    | "Apague esse usuário"                       |

---
### 3. Requisitos e funcionalidades:

Vamos detalhar as funcionalidades que sua API terá, ou seja, os problemas que cada endpoint irá resolver:

|                               |                           |                                                                            |                                                                                                                                                                                            |            |
| ----------------------------- | ------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| **Funcionalidade**            | **Endpoint e Método**     | Funcionalidade                                                             | **Descrição e Propósito**                                                                                                                                                                  | **Status** |
| **Gerador de Nomes Errados**  | `GET /nomes/aleatorio`    | Gera e retorna um nome de CodeLab incorreto.                               | Cria programaticamente nomes incorretos, combinando sílabas e erros comuns. Use sua criatividade para fazer erros no nome do grupo.                                                        | ☐          |
| **Verificador de Nomes**      | `POST /verificar`         | Recebe um nome e diz se ele é valido.                                      | Recebe um nome e o compara com uma lista de nomes válidos, retornando `true` ou `false`. **Importante:** Se o nome estiver errado, ele deve ser registrado em um log para as estatísticas. | ☐          |
| **Cadastro de Nomes Válidos** | `POST /nomes/validos`     | Adiciona uma nova versão "correta" do nome do CodeLab.                     | Permite adicionar novas grafias corretas (ex: "USPCodeLab") à base de dados. Garante que o sistema seja flexível e atualizável sem mexer no código.                                        | ☐          |
| **Painel de Estatísticas**    | `GET /estatisticas/erros` | Retorna uma lista dos nomes errados que os usuários mais tentaram validar. | Analisa o log de erros e retorna um ranking com as gafes mais frequentes e suas contagens. Transforma a frustração do grupo em dados interessantes.                                        | ☐          |

> **Dica:** Para as funcionalidades 3 e 4, você precisará salvar dados. Para este projeto, recomendamos começar usando arquivos `.json` locais (`validos.json`, `erros.json`) como um "banco de dados" simples!

> Note que nesse material não explicamos como deve ser feito a geração de nomes aleatórios, coletas de estatísticas e outros pontos  de desenvolvimento. Esses itens são requisitos que você deve pensar em como desenvolve-los.


---
## 4. Ferramentas Essenciais: Insomnia

Como testar uma API se ela não tem tela? Usando uma ferramenta que age como um "cliente" para fazer os pedidos por você! Uma famosa é o **Insomnia**.

O Insomnia é como um "controle remoto" para a sua API. Com ele, você pode facilmente enviar requisições GET, POST, etc., para os seus endpoints, ver a resposta em JSON e garantir que tudo está funcionando antes mesmo de ter um site para consumi-la.

* Você pode baixar nesse link: [Download Insomnia](https://insomnia.rest/download)

---
## 5. Tecnologias Sugeridas

| **Tecnologia**         | **Por que usar?**                                                                                                                                                              | **Documentação**                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Node.js**            | É o ambiente que permite executar JavaScript do lado do servidor. É a base de tudo.                                                                                            | [nodejs.org](https://nodejs.org/)                                  |
| **Express.js**         | É o framework mais popular para construir APIs com Node.js. Ele simplifica a criação de rotas (endpoints) e a gestão de requisições e respostas. É o nosso "chefe de cozinha". | [expressjs.com](https://expressjs.com/pt-br/)                      |
| **Nodemon** (opcional) | Ferramenta que reinicia seu servidor automaticamente toda vez que você salva uma alteração no código. Economiza muito tempo!                                                   | [npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon) |

---
## 6. Ambiente e Configuração

1. **Instale o Node.js:** Se ainda não tiver, baixe no [site oficial](https://nodejs.org/en).

2. **Crie a pasta do projeto:** Abra o terminal, crie uma pasta (ex: `api-codelab`) e entre nela.

3. **Inicie o projeto Node.js:**

``` bash
npm init -y
```
* Isso criará um arquivo `package.json`.

4. **Instale o Express:**

``` bash
npm install express
```

* **Instale o Nodemon (recomendado):**

``` bash
npm install -D nodemon
```
* O `-D`  instala o Nodemon como uma **dependência de desenvolvimento**. Isso significa que ele só é necessário enquanto estamos codificando, e não na versão final da API que iria para um servidor.

5. **Crie o arquivo principal:** Crie um arquivo chamado `index.js`.

6. **Crie seu primeiro servidor "Hello World":** Cole este código no seu `index.js`.

``` javascript
// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
const PORT = 3000; // Define a porta em que o servidor vai rodar

// Cria uma rota GET simples para a raiz do site ("/")
app.get('/', (req, res) => {
  res.send('Minha primeira API do CodeLab está no ar!');
});

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
```

7. **Configure os Scripts no `package.json`:**
* Para facilitar nossa vida, vamos configurar atalhos no `package.json` para iniciar o servidor. Abra o arquivo `package.json` e encontre a seção `"scripts"`. Modifique-a para que fique assim:

``` json
...
"scripts": {
  "start": "node index.js", 
  "dev": "nodemon index.js"
},
...
```
* `"start"`: É o comando padrão para iniciar a aplicação (usando o Node puro).
* `"dev"`: É o comando que usaremos durante o desenvolvimento (usando o Nodemon), assim o Nodemon verificará toda vez que você salvar um alteração no projeto.

7. **Rode o servidor:**

``` bash
npm run dev #caso estiver com nodemon
npm run start #sem nodemon
```

Abra `http://localhost:3000` no seu navegador e você verá a mensagem! Parabéns, você tem uma API no ar!

---
## 7. Onde posso aprender?

Você pode estar se perguntando: "Eu não sei nada de NodeJS e API, como vou fazer isso?". E a resposta é: **Está tudo bem!** A ideia central deste projeto é justamente te introduzir a novas tecnologias de desenvolvimento backend. Pode parecer um desafio no início, mas tenha certeza de que, conforme você for se acostumando e praticando com essas ferramentas, tudo se tornará muito mais fácil e intuitivo. Lembre-se, estamos aqui para te dar todo o suporte necessário!
Não se preocupe se esses conceitos são novos! A ideia é aprender fazendo.

### Materiais de apoio recomendados:

- [**Curso de Node do CodeLab:** ](https://uclsanca.gitbook.io/learn/web-avancado/node-js-1/node-js): Curso do grupo ensinado NodeJs
- [**Documentação do Express.js:**](https://expressjs.com/) A documentação oficial de boa qualidade!
- [**O que é API? REST e RESTfull - Video**](https://www.youtube.com/watch?v=ghTrp1x_1As).
- [**Build an API from Scratch with Node.js Express - Video**](https://www.youtube.com/watch?v=-MTSQjw5DrM)
* [**How to use Insomnia**](https://apidog.com/articles/how-to-use-insomnia-test-api/): Material ensinando a usar o Insomnia para fazer requisições.
---
## 🚀 Bom Desenvolvimento !!

Desejamos a você um **ótimo desenvolvimento!** Este é um projeto desafiador, mas incrivelmente recompensador, que irá expandir suas habilidades em desenvolvimento web frontend. Não hesite em buscar ajuda, compartilhar seu progresso e tirar dúvidas com os membros do Codelab.

