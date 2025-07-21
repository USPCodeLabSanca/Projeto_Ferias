//importando a api
const puppeteer = require('puppeteer');

console.log("---PROGRAMA RODANDO---");


// funcao ASYNC que permite comandos await
async function bot() {
    //abrindo a pagina
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.puspsc.usp.br/cardapio/', {
    waitUntil: 'networkidle2',
    });
    
    //criando uma string com o cardapio, dividido em objetos com elementos: dia da semana, almoco e janta
    const texto = await page.evaluate (() => {
        let i = 3;
        const textosInteiro = document.querySelectorAll('#tablepress-4');
        const meuArray = [];

        for (const textoInteiro of textosInteiro){
            for (let j = 0; j < 6; j ++){
                const filas = textoInteiro.querySelectorAll(`.row-${i}`);
                i = i + 2;

                for (const fila of filas) {
                    const diaS = fila.querySelector('.column-1').innerText;
                    const cardapioAlmoco = fila.querySelector('.column-2').innerText;
                    const cardapioJanta = fila.querySelector('.column-3').innerText;
                    
                    meuArray.push({ Dia: diaS, Almoco: cardapioAlmoco, Janta: cardapioJanta });
                }
            }
        }
        
        return meuArray;
    })

    //verificando se ha o que desejo no cardapio e alertando
    texto.forEach(diaS => {
        if (diaS.Almoco.search(/estrogonofe/i) != -1) {
            console.log(`ALERTA!! Na ${diaS.Dia} tem estrogonofe!`);
        }
        if (diaS.Almoco.search(/lasanha/i) != -1) {
            console.log(`ALERTA!! Na ${diaS.Dia} tem lasanha!`);
        }
        if (diaS.Almoco.search(/pudim/i) != -1) {
            console.log(`ALERTA!! Na ${diaS.Dia} tem pudim!`);
        }
        if (diaS.Almoco.search(/sorvete/i) != -1) {
            console.log(`ALERTA!! Na ${diaS.Dia} tem sorvete!`);
        }
        if (diaS.Almoco.search(/cocada/i) != -1) {
            console.log(`ALERTA!! Na ${diaS.Dia} tem cocada!`);
        }
    });

    //console.log(texto);
    await browser.close();
}

bot();