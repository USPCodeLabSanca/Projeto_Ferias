import Linha from './Linha';

export default function Tabuleiro({ atualTentativa, tentativas, turno, shake }) {
  return (
    <div className="grid grid-rows-6 gap-1 my-4">
      
      {tentativas.map((tentativa, i) => {
        // se a linha atual for a do turno, mostre o que o usuário está digitando
        if (turno === i) {
          return <Linha key={i} atualTentativa={atualTentativa} shake={shake}/>;
        }
        // para as outras linhas, mostre as tentativas anteriores
        return <Linha key={i} tentativa={tentativa} />;
      })}
      
    </div>
  );
}