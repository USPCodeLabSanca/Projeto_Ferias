import Bloco from './Bloco'

export default function Linha({ tentativa, atualTentativa, shake }) {
  
  const classeShake = shake ? "animate-shake" : ""; // variável para o efeito de "tremer" a linha em tentativa inválida

  // se for uma linha de uma tentativa já feita
  if (tentativa) {
    return (
        <div className="flex gap-1">
        {tentativa.map((letra, i) => (
          <Bloco key={i} letra={letra.key} cor={letra.color} />
        ))}
      </div>
    );
  }

  // se for a linha da tentativa atual
  if (atualTentativa) {
    let letras = atualTentativa.split('');
    return (
      <div className={`flex gap-1 ${classeShake}`}>
        {letras.map((letra, i) => (
          <Bloco key={i} letra={letra} />
        ))}
        {/* preenche os blocos vazios */}
        {[...Array(5 - letras.length)].map((_, i) => (
          <Bloco key={i} />
        ))}
      </div>
    );
  }

  // caso contrário
  return (
    <div className="flex gap-1">
      <Bloco /><Bloco /><Bloco /><Bloco /><Bloco />
    </div>
  )

}