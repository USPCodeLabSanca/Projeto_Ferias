import { useState } from 'react'
import './App.css'
import { palavrasValidas } from './palavras'

function LetraCaixa ({letra= '', status=''}){
  let classe = 'letra'
  if (status==='correto') classe +=' correto'
  else if (status==='presente') classe +=' presente'
  else if (status==='ausente') classe +=' ausente'

  return <div className={classe}>{letra}</div>
}

function verificarStatus(letra, indice, resposta){
  if (letra===resposta[indice]) return 'correto'
  if (resposta.includes(letra)) return 'presente'
  return 'ausente'
}

function Tabuleiro ({ tentativas, resposta, maxTentativas}) {
  const linhasVazias = Array(maxTentativas - tentativas.length).fill(null)

return (
  <div className="tabuleiro">
    
    {/* Renderiza as linhas com as tentativas já feitas */}
    {tentativas.map((palavraTentada, indiceLinha) => {
      // Quebra a palavra em letras
      const letrasDaPalavra = [...palavraTentada]

      return (
        <div key={indiceLinha} className="linha">
          {letrasDaPalavra.map((letra, indiceColuna) => {
            // Determina o status da Letra (correta, presente, ausente)
            const statusDaLetra = verificarStatus(letra, indiceColuna, resposta)
            return <LetraCaixa key={indiceColuna} letra={letra} status={statusDaLetra} />
          })}
        </div>
      )
    })}

    {/* Renderiza as linhas vazias restantes */}
    {linhasVazias.map((_, indiceLinhaVazia) => (
      <div key={indiceLinhaVazia} className="linha">
        {[...Array(5)].map((_, indiceColuna) => (
          <LetraCaixa key={indiceColuna} />
        ))}
      </div>
    ))}
  </div>
)
}

function Teclado({ letrasPressionadas, onLetraClick, onEnter, onBackspace }) {
  const teclas = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'
  ] 
  function obterClasseTecla(tecla) {
    if (tecla==='enter' || tecla==='backspace') return 'botao-tecla'
    if (!letrasPressionadas[tecla]) return 'botao-tecla'
    if (letrasPressionadas[tecla]==='correto') return 'bota-tecla correto'
    if (letrasPressionadas[tecla] === 'presente') return 'botao-tecla presente'
    if (letrasPressionadas[tecla] === 'ausente') return 'botao-tecla ausente'
    return 'botao-tecla'
  }

  function Digitar(tecla){
    if (tecla==='enter') onEnter()
    else if(tecla==='backspace') onBackspace()
    else onLetraClick(tecla)
  }

  return (
  <div className="teclado">
    {teclas.map((tecla) => {
      const classeDoBotao = obterClasseTecla(tecla)

      // Define o texto a ser exibido no botão
      let textoExibido = tecla.toUpperCase()
      if (tecla === 'enter') textoExibido = 'Enter'
      else if (tecla === 'backspace') textoExibido = '←'

      return (
        <button
          key={tecla}
          className={classeDoBotao}
          onClick={() => Digitar(tecla)}
        >
          {textoExibido}
        </button>
      )
    })}
  </div>
)
  }

export default function App() {
  const MAXIMO_TENTATIVAS = 6

  const [resposta, setResposta] = useState(sorteiaPalavra())
  const [tentativas, setTentativas] = useState([])
  const [tentativaAtual, setTentativaAtual] = useState('')
  const [letrasStatus, setLetrasStatus] = useState({})
  const [mensagem, setMensagem] = useState('')

  function sorteiaPalavra(){
    const aleatoria = palavrasValidas[Math.floor(Math.random() *  palavrasValidas.length)]
    return aleatoria.toUpperCase()
  }

  function reiniciarJogo(){
    setResposta(sorteiaPalavra())
    setTentativas([])
    setTentativaAtual('')
    setLetrasStatus({})
    setMensagem('')
  }

  function atualizarStatusLetra(palavra){
    const novoStatus = { ...letrasStatus}

    palavra.split('').forEach((letra, i) => {
      if (letra === resposta[i]) novoStatus[letra] = 'correto'
      else if (resposta.includes(letra)){
        if (novoStatus[letra] !== 'correto') novoStatus[letra] = 'presente'
      }
      else{
        if (!novoStatus[letra]) novoStatus[letra] = 'ausente'
      }
    })
    setLetrasStatus(novoStatus)
  }

  function aoEnviar(){
    const palavra = tentativaAtual.toLowerCase()

    if(tentativaAtual.length !== 5){
      setMensagem('A palavra deve ter 5 letras')
      return
    }
    
    if (!palavrasValidas.includes(palavra)){
      setMensagem('Essa palavra nao existe no nosso dicionario')
      return
    }

    if (tentativas.length >= MAXIMO_TENTATIVAS){
      setMensagem('Voce ja usou todas suas tentativas')
      return
    }

    const novaTentativa = tentativaAtual.toUpperCase()
    const novasTentativas = [ ...tentativas, novaTentativa]

    setTentativas(novasTentativas)
    atualizarStatusLetra(novaTentativa)
    setTentativaAtual('')
    setMensagem('')

    if (novaTentativa === resposta){
      setMensagem('Parabens!!! Voce acertou :)')
      setTimeout(reiniciarJogo, 3000)
    }
    else if (novasTentativas.length === MAXIMO_TENTATIVAS){
      setMensagem('Fim de jogo! A palavra era ${resposta}')
      setTimeout(reiniciarJogo, 4000)
    }
  }

  function aoApertarLetra(letra){
    if (tentativaAtual >= 5) return
    setTentativaAtual(tentativaAtual + letra)
  }

  function aoApagar(){
    setTentativaAtual(tentativaAtual.slice(0, -1))
  }

  return (
    <div className="container">
      <h1>Codle</h1>

      <Tabuleiro tentativas={tentativas} resposta={resposta} maxTentativas={MAXIMO_TENTATIVAS} />

      <div className='linha' style={{marginBottom: '20px'}}>
        {[ ...tentativaAtual.padEnd(5, '')].map((letra, i)=> (
          <LetraCaixa key={i} letra={letra} />
        ))}
      </div>

      <Teclado
      letrasPressionadas={letrasStatus}
      onLetraClick={aoApertarLetra}
      onEnter={aoEnviar}
      onBackspace={aoApagar}
      />

      <div className="mensagem">{mensagem}</div>
    </div>
  )

}