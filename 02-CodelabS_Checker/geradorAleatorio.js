//gerador de  palavras aleatórias
    function randomInt(max){
        return Math.floor(Math.random()*max);
    }

    const USP= [`USP `, ``, ``, `` ];
    const primeiraSilaba=[ `Co`, `Cô` ];
    const segundaSilaba= [ `de`, `d`, `dí`, `di`, `da`];
    const spaceBar= [ ` `, ``];
    const labs= [`Lab`,`Leb`, `Léb`, `Labe`, `lab`, `leb`, `léb`, `labe`];
    const plurais= [``, `s`, ``, `s`, `x`, `z`];

    function geradorDePalavras(){
        let codeLabFinal= '';
    
        codeLabFinal += USP[randomInt(USP.length)];           
        codeLabFinal += primeiraSilaba[randomInt(primeiraSilaba.length)]; 
        codeLabFinal += segundaSilaba[randomInt(segundaSilaba.length)]; 
        codeLabFinal += plurais[randomInt(plurais.length)];  
        codeLabFinal += spaceBar[randomInt(spaceBar.length)];             
        codeLabFinal += labs[randomInt(labs.length)];  
        codeLabFinal += plurais[randomInt(plurais.length)];                    

        return codeLabFinal;
    }

    module.exports = { geradorDePalavras };