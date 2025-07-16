import Bloco from './Bloco'

export default function Linha({ tentativa, atualTentativa }) {
  
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
      <div className="flex gap-1">
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

  return (
    <div className="flex gap-1">
      <Bloco /><Bloco /><Bloco /><Bloco /><Bloco />
    </div>
  )

}