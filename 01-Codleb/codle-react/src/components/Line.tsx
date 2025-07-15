interface LineProps {
  word: string;
  len: number;
}

function Line({word, len}: LineProps) {
  return (
    <div>
      Linha de string: {word} e Tamanho: {len}
    </div>
  );
}

export default Line;
