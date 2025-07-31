export default function TutorialModalContent() {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <h3 className="font-bold mb-2 text-gray-800">Como Jogar</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• Adivinhe a palavra secreta de 5 letras</li>
          <li>• Você tem 6 tentativas</li>
          <li>• Digite as letras ou use o teclado virtual</li>
          <li>• Pressione ENTER para confirmar</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-2 text-gray-800">Significado das Cores</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-gray-600">
              Letra correta na posição correta
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">
              Letra correta na posição errada
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-500 rounded"></div>
            <span className="text-gray-600">Letra não está na palavra</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2 text-gray-800">Dicas</h3>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>• Comece com palavras que têm vogais comuns</li>
          <li>• Use as cores para eliminar ou confirmar letras</li>
          <li>• Preste atenção nas letras amarelas - elas estão na palavra</li>
          <li>• Uma nova palavra é sorteada a cada jogo</li>
        </ul>
      </div>
    </div>
  );
}
