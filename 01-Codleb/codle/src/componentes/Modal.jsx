export default function Modal({ ganhou, solucao, resetaJogo }) {
    return (
      // fundo escurecido do modal
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        
        {/* caixa de diálogo do modal */}
        <div className="bg-gray-800 rounded-lg p-8 text-center shadow-2xl">
          {ganhou ? (
            // mensagem de vitória
            <>
              <h2 className="text-3xl font-bold text-green-500 mb-4">Você venceu!</h2>
              <p className="text-lg">Jogue denovo e prove sua habilidade ainda mais!</p>
            </>
          ) : (
            // mensagem de derrota
            <>
              <h2 className="text-3xl font-bold text-red-500 mb-4">Você perdeu... mas pode tentar novamente!</h2>
              <p className="text-lg">A palavra correta era:</p>
              <p className="text-2xl font-bold tracking-widest my-2 p-2 bg-gray-700 rounded">
                {solucao}
              </p>
            </>
          )}
  
          {/* botão para jogar novamente*/}
          <button
            onClick={resetaJogo} // quando o botão for clicado, chama a função de resetar jogo
            className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }