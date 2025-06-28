# BandejãoQuality

> **Área:** Web Scraping | Tecnologias-alvo: **Python (Beautiful Soup) ou JavaScript (Puppeteer)**

Olá Codelaber!! Aqui inicia um linda jornada ao grupo da alegria, o USP Codelab! 

Você agora que entrou no grupo, mergulhou de cabeça nos nossos materiais produzidos e se encantou com o poder do Web Scraping, uma forma de obter dados da internet. Com esse novo "superpoder", você começou a buscar uma chance de colocar seu conhecimento em prática. E a oportunidade perfeita apareceu...

Em uma reunião da **Dev.Hack** (nossa frente de eventos e hackathons), você viu de perto o planejamento do nosso próximo grande evento na USP. Tudo ia bem, até que a equipe esbarrou no inimigo mortal de qualquer projeto universitário: **o orçamento apertado.**

A maior vítima? Ele, o momento mais esperado, o que mantém todos de pé durante horas de código... **o coffee break.**

A solução para salvar o caixa foi criativa: em vez de um coffee break caro, vamos usar a força do nosso querido bandejão para a galera recarregar as energias! Mas isso criou um novo desafio: como garantir que o evento aconteça em um dia de cardápio excelente, para manter a moral dos membros elevada?

Foi aí que, com o conhecimento de scraping ainda fresco na memória, você levantou a mão e apresentou a ideia que salvou o dia: um sistema que vigia o cardápio automaticamente! A proposta: construir um sistema que analisa o cardápio do bandejão todos os dias. Ao encontrar palavras-chave mágicas como "strogonoff", "batata palha" ou "pudim", o sistema dispara um alerta para a equipe: **"É HOJE! O dia perfeito para o hackathon chegou!"**

A ideia foi um sucesso instantâneo. Agora, essa missão brilhante é sua. O sucesso do nosso próximo evento depende da sua habilidade de transformar o HTML do site do bandejão em um veredito gastronômico.

---
## 1. O que vamos construir?

Sua missão neste projeto é criar um **script de automação** (um "robô") que acessa a internet, lê o conteúdo de uma página específica e extrai informações úteis dela.

Especificamente, nosso robô irá:

1. Visitar a página do cardápio do Bandejão da USP São Carlos: [Cardápio PUSP-SC](https://www.puspsc.usp.br/cardapio/)
2. Analisar o código da página para encontrar o menu da semana.
3. Verificar se o menu contém alguma das nossas "comidas favoritas".
4. Se encontrar, disparar um alerta para nos avisar.

---
## 2. Conceitos: O que é Web Scraping?

Web Scraping é a técnica de extrair dados de sites de forma automatizada. Em vez de você, humano, abrir um navegador e copiar-colar informações, você escreve um programa que faz isso por você.

O site do cardápio do Bandejão é um ótimo alvo, pois é um site **estático**. Isso significa que todo o conteúdo que vemos na tela (o cardápio completo) já está presente no arquivo HTML que recebemos na primeira requisição, o que simplifica muito nosso trabalho. O processo fundamental envolve três passos:

1. **Acessar a Página:** Seu código faz uma requisição HTTP para a URL do Bandejão e baixa o seu código-fonte HTML.

2. **Analisar o Conteúdo (Parse):** Usando uma biblioteca, seu programa consegue "ler" e entender a estrutura do HTML. Você usará **seletores** para dizer ao seu robô exatamente onde olhar. Por exemplo: _"encontre a `div` com a classe `cardapio-almoco` e, dentro dela, pegue o texto de todas as tags `<p>`"_.

3. **Extrair os Dados:** Uma vez que os elementos são localizados, você extrai o texto deles e o armazena em variáveis para análise

> 
>**Você sabia que a tecnologia por trás do Folki é web scraping?**
>
> * O folki utiliza scraping internamente para obter os dados a serem dispostos no app


---
## 3. Requisitos e Funcionalidades

| Item | Descrição da Funcionalidade                                                                                                          | Status |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 1    | Fazer o script acessar e baixar o conteúdo da URL do cardápio do Bandejão.                                                           | ☐      |
| 2    | Analisar o HTML da página para encontrar e extrair o texto do cardápio do almoço e do jantar.                                        | ☐      |
| 3    | Ter uma lista de "palavras-chave" (ex: `['frango', 'batata', 'lasanha', 'pudim']`).                                                  | ☐      |
| 4    | Criar uma lógica que verifique se alguma das palavras-chave está presente no texto do cardápio extraído.                             | ☐      |
| 5    | Se uma palavra-chave for encontrada, exibir uma mensagem de alerta no console (ex: "Alerta! Essa semana tem Strogonoff! no dia _ "). | ☐      |
| 6    | **(Desafio Opcional)** Em vez de um alerta no console, enviar uma notificação para um canal externo, como um bot no telegram.        | ☐      |

---

## 4. Inspecionando o Alvo

Antes de escrever qualquer linha de código, o primeiro passo de todo projeto de scraping é **investigar o site manualmente**.

1. Abra o site do cardápio do bandejão: [https://www.puspsc.usp.br/cardapio/](https://www.puspsc.usp.br/cardapio/).

2. Clique com o botão direito do mouse sobre a página e selecione **"Inspecionar"** (ou "Inspect").

3. O painel de desenvolvedor do seu navegador irá se abrir, mostrando o código HTML da página. Navegue pelas tags e tente encontrar o padrão.
	* ***Dica:** Você vai notar que o cardápio segue um padrão nesse formato:
```HTMl
	
		<td class="column-1"> <!-- Se refere ao dia da semana-->
			<strong>Segunda-feira</strong>
		</td>
		<td class="column-2"> <!-- Se refere ao bandeco do almoço-->
			Arroz/Feijão/ Arroz integral<br>
			Saladas: Diversas<br>
			Carne em cubos ao molho ferrugem<br>
			Opção do Prato Principal: Quibe de brócolis<br>
			com requeijão<br>
			Legumes sauté<br>
			Sobremesa: Torrone/ Mexerica<br>
			Mini Pão e Suco
		</td>
		<td class="column-3"> <!-- Se refere ao bandeco da janta-->
			Arroz/Feijão/ Arroz integral<br>
			Saladas: Diversas<br>
			Filé de frango empanado<br>
			Opção do Prato Principal: Almôndega de aveia e<br>
			espinafre ao molho ferrugem<br>
			Creme de milho<br>
			Sobremesa: Barra de cereal chocolate e frutas/Maçã<br>
			Mini Pão e Suco
		</td>
		

```


---
## 5. Tecnologias Sugeridas

Como o site é estático, a abordagem clássica com Python é a mais direta e eficiente. A abordagem com JavaScript/Puppeteer também funciona e é ótima para aprender uma nova ferramenta.

#### Opção 1: Python (Recomendada)

> Se você não sabe nada de Python, pode ser uma oportunidade para entrar em contato com essa lang.

| Tecnologia         | Por que usar?                                                                                                                                                                                                                   | Documentação                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Requests**       | Para fazer a requisição HTTP e obter o HTML da página de forma simples e rápida.                                                                                                                                                |                                                                                           |
| **Beautiful Soup** | Controla um navegador Chrome de verdade. É mais lento e complexo que a opção 1, mas é uma ferramenta extremamente poderosa para sites dinâmicos (que carregam conteúdo com JS) e uma ótima habilidade para se ter no currículo. | [beautiful-soup-4.readthedocs.io](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) |

#### Opção 2: JavaScript (com Node.js)

| Tecnologia    | Por que usar?                                                                                                                                                                                                                   | Documentação                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Puppeteer** | Controla um navegador Chrome de verdade. É mais lento e complexo que a opção 1, mas é uma ferramenta extremamente poderosa para sites dinâmicos (que carregam conteúdo com JS) e uma ótima habilidade para se ter no currículo. | [axios-http.com](https://axios-http.com/docs/intro) |

---
## 6. Ambiente e Configuração

#### Para quem escolher Python:

1. **Instale o Python:** Se não tiver, baixe do site [python.org](https://python.org).

2. **Instale as bibliotecas:**

    ``` BASH
	pip install requests beautifulsoup4
    ```

3. **Crie seu script** (ex: `scraper.py`) e comece a codificar!
	* exemplo
	```Python
	import requests
	from bs4 import BeautifulSoup
	
	response = requests.get('http://example.com')
	soup = BeautifulSoup(response.content, 'html.parser')
	titulo = soup.find('h1').text
	print(f"Teste OK! Título da página: {titulo}")
	```


#### Para quem escolher JavaScript (Node.js):

1. **Instale o Node.js:** Se não tiver, baixe do site [nodejs.org](https://nodejs.org/).

2. **Inicie um projeto** em uma pasta criada por você:

    ```Bash
    npm init -y
    ```

3. **Instale as bibliotecas:**

    ```Bash
	npm install puppeteer
    ```

4. **Crie seu script** (ex: `scraper.js`) e comece a codificar!
	* Exemplo
	
	```Js

	const puppeteer = require('puppeteer');
	
	(async () => {
	  const browser = await puppeteer.launch();
	  const page = await browser.newPage();
	  await page.goto('http://example.com');
	  const titulo = await page.$eval('h1', el => el.textContent);
	  console.log(`Teste OK! Título da página: ${titulo}`);
	  await browser.close();
	})();
	```
---

## 7. Onde posso aprender?

Você pode estar se perguntando: "Eu não sei nada de Web Scraping, como vou fazer isso?". E a resposta é: **Está tudo bem!** A ideia central deste projeto é justamente te introduzir a novas tecnologias. Pode parecer um desafio no início, mas tenha certeza de que, conforme você for se acostumando e praticando com essas ferramentas, tudo se tornará muito mais fácil e intuitivo. Lembre-se, estamos aqui para te dar todo o suporte necessário!
Não se preocupe se esses conceitos são novos! A ideia é aprender fazendo.

- **CodeLab:** No Codelab ja fizemos grupo de estudos de Web Scraping, com material estudado anotado em: [Material de webscraping](https://uclsanca.gitbook.io/learn/testando-testando-123)!

- **Beautiful Soup:** [Guia Rápido Oficial](https://www.crummy.com/software/BeautifulSoup/bs4/doc.ptbr/)

* **Vídeo de web scraping com Beautiful Soup:** [Video](https://www.youtube.com/watch?v=nvpNj5kqTn0)

- **Puppeteer:** [Exemplos no site oficial](https://pptr.dev/guides/getting-started)


---
## 🚀 Bom Desenvolvimento !!

Desejamos a você uma **ótima "caçada" aos dados!** Este projeto é uma porta de entrada para o mundo da automação e coleta de dados na web. Divirta-se! Caso necessite, não hesite em buscar ajuda, compartilhar seu progresso e tirar dúvidas com os membros do Codelab.