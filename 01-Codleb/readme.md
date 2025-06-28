# Codleb

> Área: **Frontend** | Tecnologias-alvo: **React** + Tailwind CSS (opcional)

Bem-vindo(a) ao CodeLab! E, mais especificamente, uma das frentes mais queridas de todas: a **Dev.Learn**, nossa frente de ensino.

Você agora vai ajudar a preparar e ministrar os melhores conteúdos de desenvolvimento para todos os tipos de alunos. Mas, atenção, essa é apenas a sua missão _secundária_. Antes de tudo, você precisa conhecer a nossa Regra de Ouro, o ritual sagrado que realmente une esta frente.

A prioridade máxima? Garantir as melhores aulas da face da Terra? Não! É algo muito, **muito** mais sério...

**JOGAR O TERMO DO DIA.**

Não se engane, isso é um assunto de segurança máxima. Quando o Termo não é feito em uma reunião, o caos reina:
- Membros entram em parafuso e começam a quebrar as salas do ICMC.
- Surgem conspirações para depor a liderança da frente.
- Novas frentes aleatórias são criadas do nada, apenas para se opor à Dev.Learn.

Tudo permanece bem, desde que o termo esteja lá! Porém, o Ganesh, em um de seus pentests quebrou o site do TERMO. Deixando ele inutilizável... O pânico se instalou, todas as reuniões do Learn foram canceladas e as aulas interrompidas.

É aqui que você entra, Codelaber. Com seus novos conhecimentos de web, sua missão é nos salvar dessa escuridão. Você precisa construir um novo Termo, o **Codle**, uma fortaleza digital para que a paz volte a reinar em nossas reuniões.

Mãos a obra! O destino do Learn está nas suas mãos.

---

## 1. O Codle:

O **Codle** é uma releitura do clássico jogo de palavras “Termo”/“Wordle”, em que o usuário tenta adivinhar uma palavra de 5 letras em até 6 tentativas.  

**IMAGEM AQUI!**

Sua principal missão neste projeto é **desenvolver uma interface web que recrie a experiência de um jogo de palavras no estilo "Termo" ou "Wordle"**. Se por acaso você viveu em uma caverna nos últimos anos e ainda não sabe do que se trata, recomendamos fortemente que jogue o desafio de hoje e se divirta aprendendo: [Termo.ooo](https://term.ooo/).

---
## 3. Requisitos e funcionalidades

A ideia é que você construa uma interface interativa com as seguintes funcionalidades:

| Item | Descrição                                                                            | Status |
| ---- | ------------------------------------------------------------------------------------ | ------ |
| 1    | Campo de entrada ou captura de teclas para as tentativas                             | ☐      |
| 2    | Cálculo de feedback por letra (posição certa, letra certa local errada, inexistente) | ☐      |
| 3    | Gerenciar o número de tentativas disponíveis.                                        | ☐      |
| 4    | Controle de 6 linhas de tentativa.                                                   | ☐      |
| 5    | Mecanismo para detectar vitória ou derrota.                                          | ☐      |
| 6    | Possibilidade de começar um novo jogo com uma nova palavra aleatória                 | ☐      |
*(use como base durante o desenvolvimento)*

> Certas funcionalidades podem ser um desafio ao implementa-las. Tome seu tempo... Se achar certa funcionalidade muito difícil, tente fazer uma versão mais fácil e deixar essa para depois.

---
### 4. Layout e assets

#### Figma:

Para te auxiliar no desenvolvimento e garantir que você tenha tudo à mão para começar a codificar, preparamos alguns recursos importantes:

Para que você visualize exatamente como a página web deve se parecer, criamos um protótipo interativo no Figma. Ele detalha a disposição dos elementos, as cores, fontes e ideia geral da interface.

Acesse o Figma do projeto aqui: [FIGMA DO PROJETO](https://www.figma.com/design/ZJHTEVLvimVgAXFi9u1WGm/CODLE?node-id=0-1&t=WYpkB07kh6efHvg1-1)

> Lembre-se de estar logado para ter saber qual fonte usamos, as cores em hexadecimal e outros fatores importantes.

**Ao explorar o Figma, você encontrará:**

- **Esquema de Cores**
- **Tipografia**
- **Disposição dos Elementos**
- **Estados dos Blocos:** Observe como os blocos das letras mudam de cor para indicar se uma letra está correta na posição certa (verde), correta na posição errada (amarelo) ou não existe na palavra (cinza).

*(Você pode realizar mudanças no projeto conforme desejar! Por sinal encorajamos para que você vá além!)*


#### Arquivos Uteis:

Para que você não precise se preocupar em criar alguns recursos do zero, disponibilizamos os seguintes assets diretamente neste repositório do GitHub:

- **Logo do Grupo:** localizada na pasta `assets/images/logo.png`.

- **Dicionário de Palavras (JSON):** Para economizar seu tempo na busca por palavras válidas de 5 letras, incluímos um arquivo JSON completo com uma lista extensa de palavras possíveis. Este arquivo, nomeado como `words.json`, estará na pasta `assets/data/`. Você poderá importá-lo diretamente para a sua aplicação React e utilizá-lo para **selecionar uma a palavra secreta valida**.

*Com esses recursos, você terá uma base sólida para focar na lógica de programação e na interatividade, sem se preocupar com os aspectos de design e dados iniciais.*

---
## 5. Tecnologias Sugeridas:

Neste projeto, você terá a oportunidade de mergulhar no desenvolvimento web moderno, as tecnologias escolhidas foram pensadas para proporcionar uma experiência de aprendizado prática e relevante. Inclusive usamos muito aqui no Codelab. Para esse projeto as tecnologias escolhidas foram:

| Tecnologia                  | Por que usar?                                                                                                                                                                      | Documentação            |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **React**                   | Será a biblioteca JavaScript principal para a construção da interface de usuário, permitindo criar componentes reutilizáveis e gerenciar o estado da aplicação de forma eficiente. | https://react.dev       |
| **Tailwind CSS** (opcional) | Para estilização e layout, encorajamos o uso do Tailwind CSS. Ele e agiliza muito o processo de design e garante responsividade.                                                   | https://tailwindcss.com |
| **Vite**                    | Dev-server rápido e build moderno.                                                                                                                                                 | https://vitejs.dev      |

### Um pouco sobre as tecnologias.

Apresentaremos adiante uma breve explicação das tecnologias do projeto:
##### ReactJS:

React é uma **biblioteca JavaScript declarativa, eficiente e flexível para a construção de interfaces de usuário (UIs)**. Desenvolvido e mantido pelo Facebook (agora Meta), ele permite que você crie componentes de UI reutilizáveis, gerenciando o estado da sua aplicação de forma eficiente e reativa.

**Por que React?**

- **Componentização:** React incentiva a construção de interfaces através de pequenos blocos independentes e reutilizáveis, chamados componentes. Isso torna o código mais organizado, modular e fácil de manter.
- **Abordagem Declarativa:** Em vez de manipular o DOM (Document Object Model) diretamente, você descreve como a UI deve parecer para um determinado estado. O React se encarrega de atualizar o DOM de forma eficiente quando o estado muda, simplificando muito a lógica de interação.
- **Ecossistema Amplo:** Possui uma vasta comunidade, uma rica coleção de bibliotecas e ferramentas de desenvolvimento que aceleram a construção de aplicações complexas.

### Tailwind CSS

[Site Oficial Tailwind](https://tailwindcss.com/)

> **NOTA:**  Tailwind nesse projeto é opcional! porém recomendamos fortemente
 
Tailwind CSS é um **framework CSS "utility-first"** que oferece uma vasta gama de classes utilitárias de baixo nível diretamente no seu HTML (ou JSX, no caso do React). Em vez de escrever CSS tradicional em arquivos separados, você constrói designs complexos aplicando essas classes diretamente aos seus elementos.

**Por que recomendamos Tailwind CSS em vez de CSS puro?**

- **Velocidade de Desenvolvimento Acelerada:** Com o Tailwind, você raramente precisa sair do seu arquivo HTML/JSX para estilizar elementos. Isso elimina o contexto-switching e acelera drasticamente o processo de construção e prototipagem de interfaces.
- **Design Consistente e Reutilizável:** Ao invés de inventar novos nomes de classes para cada componente, você usa um conjunto predefinido de utilitários, o que leva a um design mais coeso e a uma maior reutilização de estilos.
- **Menos CSS Personalizado:** Com a vasta gama de utilitários, você escreverá muito menos CSS personalizado, reduzindo o tamanho final do seu arquivo CSS e as chances de conflitos de estilos.
- **Responsividade Integrada:** O Tailwind possui utilitários responsivos embutidos que facilitam a criação de designs que se adaptam perfeitamente a diferentes tamanhos de tela (mobile, tablet, desktop).
- **Fácil Manutenção:** Quando você precisa alterar um estilo, a alteração é feita diretamente no componente relevante, sem a necessidade de procurar em arquivos CSS extensos e potencialmente afetar outros elementos.
- **Curva de Aprendizagem Rápida:** Embora pareça diferente no início, a lógica de composição de classes utilitárias é intuitiva e permite que você comece a criar layouts impressionantes em pouco tempo.

**Exemplo Simples:**

Para ilustrar a abordagem do Tailwind CSS, veja como estilizaríamos um botão simples com um fundo azul, texto branco, padding e cantos arredondados, comparando com o CSS tradicional:

``` HTML
<button className="meu-botao">
  Clique Aqui
</button>
```

``` CSS
/* No seu arquivo CSS  */ 
.meu-botao { 
	background-color: #3b82f6; 
	color: white; padding: 0.75rem 1.5rem; 
	border-radius: 0.5rem;  
	border: none; 
	cursor: pointer; 
}
```

**Com Tailwind CSS:**
``` HTML
<button 
	className="bg-blue-500 text-white py-3 px-6 rounded-lg border-none cursor-pointer"
>
  Clique Aqui
</button>
```
---

## 6. Ambiente e configuração

Para que você possa rodar e desenvolver o projeto **CODLE** utilizando React e Tailwind CSS, siga as instruções abaixo para configurar seu ambiente.

#### Pré-requisitos Essenciais

Certifique-se de que você tem os seguintes softwares instalados em sua máquina:

| Tecnologia                              | Por que usar?                                                                                                                                                                                                    | Onde baixar?                                            |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Node.js:**                            | É o ambiente de tempo de execução JavaScript que permite que você execute código JavaScript fora do navegador. Ele inclui o npm (Node Package Manager), que será usado para instalar as dependências do projeto. | [nodejs.org](https://nodejs.org/en/download/)           |
| **npm (Node Package Manager) ou Yarn:** | Npm é um gerenciador de pacotes do Node                                                                                                                                                                          | já vem instalado junto ao node                          |
| **VisualStudioCode**                    | IDE já conhecida por nós programadores, altamente recomendado devido ao seu vasto ecossistema de extensões para React, JavaScript e Tawilwind.                                                                   | [code.visualstudio.com](https://code.visualstudio.com/) |

#### Iniciando o Projeto React com Vite

Para iniciar este projeto React, utilizaremos o **Vite** (pronuncia-se "Vít"), uma ferramenta de build de frontend moderna que oferece uma experiência de desenvolvimento extremamente rápida.

>[!info] 
>**Por que Vite e não Create React App (CRA)?**
>
>Historicamente, o **Create React App (CRA)** foi a ferramenta padrão para iniciar novos projetos React, oferecendo uma configuração "zero" e abstraindo a complexidade. No entanto, o CRA pode ser lento para iniciar, compilar e hot-reload em projetos maiores.
>
O **Vite** surgiu como uma alternativa mais moderna e performática por diversos motivos:
>
> - **Velocidade Superior**
> - **Melhor Experiência de Desenvolvedor**
> - **Moderno** 

**Passos para Configurar e Rodar o Projeto:**

1. **Crie um Novo Projeto Vite:** Abra o terminal ou prompt de comando na pasta onde você deseja que o seu novo projeto seja criado e execute:

``` BASH
npm create vite@latest
```

Você será guiado por algumas perguntas:

- `Project name:` Digite o nome do seu projeto (ex: `codle-react`).
- `Select a framework:` Use as setas para selecionar `React` e pressione Enter.
- `Select a variant:` Selecione `JavaScript` (ou `TypeScript` se preferir e tiver conhecimento).

2. **Navegue para a Pasta do Projeto e Instale as Dependências:** Após a criação, navegue para a nova pasta do projeto e instale as dependências:

``` BASH
cd codle-react # Substitua pelo nome que você deu ao projeto npm install
```

3. **Instale e Configure o Tailwind CSS (Neste Novo Projeto):**
Para adicionar o Tailwind CSS ao seu novo projeto Vite + React, siga estes comandos:

``` BASH
npm install -D tailwindcss postcss autoprefixer 
npx tailwindcss init -p
```

> Dúvidas comuns sobre instalação? Consulte a [documentação oficial do Vite](https://vitejs.dev/guide/).

4. **Iniciar o Servidor de Desenvolvimento:** Com as dependências instaladas, você pode iniciar o servidor de desenvolvimento para ver seu projeto em ação. Execute um dos comandos:

- **Usando npm:**

``` BASH
npm run dev
```

Após executar o comando, o terminal indicará o endereço local onde sua aplicação estará rodando (normalmente `http://localhost:3000/` ou similar). Abra este endereço no seu navegador.

---

### 7. Onde posso aprender? 

Você pode estar se perguntando: "Eu não sei nada de React e Tailwind CSS! Como posso fazer este projeto?". E a resposta é: **Está tudo bem!** A ideia central deste projeto é justamente te introduzir a novas tecnologias de desenvolvimento web. Pode parecer um desafio no início, mas tenha certeza de que, conforme você for se acostumando e praticando com essas ferramentas, tudo se tornará muito mais fácil e intuitivo. Lembre-se, estamos aqui para te dar todo o suporte necessário!

### Recursos para Aprender React

React é uma tecnologia vastamente utilizada, o que significa que existe uma enorme quantidade de material de estudo disponível. Aqui estão algumas sugestões, incluindo nossos próprios materiais e fontes externas:

* O Codelab já fez um Curso de React e você pode estudar pelo nosso material
	* [Curso de ReactJS CODELAB](https://uclsanca.gitbook.io/learn/web-avancado/reactjs)

* Você também pode estudar React por meio da documentação oficial:
	* [Documentação oficial do React](https://pt-br.react.dev/learn)

Tutoriais extras em vídeo:
* [Curso React (em ingles)](https://www.youtube.com/watch?v=U2Wltnv-doo&list=PLpPqplz6dKxW5ZfERUPoYTtNUNvrEebAR)
* [Curso introdutorio de React 1 hora (em ingles)](https://www.youtube.com/watch?v=SqcY0GlETPk)
* [Videos do Codelab de React](https://www.youtube.com/watch?v=qBdj2MqxY5E&list=PLOnQ0LgtGan_MIhQmwdiwF6kXZwYu7PVW&index=4)


### Recursos para Aprender Tailwind CSS

Assim como o React, o Tailwind CSS possui uma comunidade ativa e muitos materiais educativos

você pode destrinchar na documentação oficial do Tailwind ou vídeos e sites, aqui vão alguns materiais recomendados:
* [Ótimo video ensinando Tailwind (em ingles) ](https://www.youtube.com/watch?v=6biMWgD6_JY)
* [Video 1](https://www.youtube.com/watch?v=7mt89PPWhaY)
* [Video 2](https://www.youtube.com/watch?v=SUavcwCCLN8)

---
## 🚀 Bom Desenvolvimento !!

Desejamos a você um **ótimo desenvolvimento!** Este é um projeto desafiador, mas incrivelmente recompensador, que irá expandir suas habilidades em desenvolvimento web frontend. Não hesite em buscar ajuda, compartilhar seu progresso e tirar dúvidas com os membros do Codelab.

**Estamos empolgados para ver o seu Codle ganhar vida!!!** 
