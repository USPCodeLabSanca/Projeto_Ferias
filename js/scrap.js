const puppeteer = require('puppeteer');

(async () => {
  // Abre a página do cardápio do bandejão
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.puspsc.usp.br/cardapio/');
  
  const cardapio = await page.$eval('.row-striping', tabela => {
    // Pegar todas as linhas da tabela
    const linhas = tabela.querySelectorAll('tr');

    // Retorna uma lista de listas de dia, almoco, jantar
    return Array.from(linhas)
    .filter(tr => {
      // Filtra linhas não vazias
      return tr.textContent?.trim() !== '';
    })
    .map(tr => {
      // Aplica um map nas linhas não vazias para extrair as informações
      const dia = tr.querySelector('strong')?.textContent
      const almoco = tr.querySelector('.column-2')?.textContent;
      const jantar = tr.querySelector('.column-3')?.textContent;

      // Retorna uma lista com dia, almoco, jantar
      return [dia, almoco, jantar];
    });
  });

  // Printa os cardápios dos dias
  cardapio.forEach(([dia, almoco, jantar]) => {
    console.log('----> ' + dia);
    console.log('\n----------Almoço--------')
    console.log(almoco || "INDISPONÍVEL")

    console.log('\n----------Jantar--------')
    console.log(jantar || "INDISPONÍVEL")

    console.log('\n')
  });

  // Dado o array de cardapio, procura as comidas favoritas na semana
  favoritas = ['lasanha', 'gelatina', 'estrogonofe', 'frango empanado']
  cardapio.forEach(([dia, almoco, jantar]) => {
    favoritas.forEach(comida => {
        if (almoco.toLowerCase().includes(comida)) {
          console.log(`\n----> ${dia}: Encontrado '${comida}' no almoço!`);
          console.log('\n----------Almoço--------');
          console.log(almoco);
        }

        if (jantar.toLowerCase().includes(comida)) {
          console.log(`\n----> ${dia}: Encontrado '${comida}' no jantar!`);
          console.log('\n----------Jantar--------');
          console.log(jantar);
        }

    });
  });

  await browser.close();
})();