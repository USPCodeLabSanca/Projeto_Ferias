const ExemploLetra = ({letra, status}) =>
{
    const statusStyles = 
    {
        vazio: "border-4 border-[#1D3D35]",
        correto: "bg-[#5dc8ae] border-4 border-[#5dc8ae] text-white",
        quase: "bg-amber-400 border-4 border-amber-400 text-white",
        incorreto: "bg-black border-4 border-black text-white",
    }
    const style = `text-white w-10 h-10 rounded flex items-center justify-center text-2xl ${statusStyles[status]}`;
    
    return <div className={style}>{letra}</div>;
}

function ModalInstruções ({onClose})
{
    return (
        <div 
            onClick={onClose}
            className="bg-black/50 flex justify-center items-center py-4 fixed inset-0 z-1"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-[#282828] h-full w-[28em] md:w-[40em] p-3 md:p-6 rounded-lg shadow-white/10 shadow-md flex flex-col z-20">
                
                <div className="flex justify-center items-center relative mb-5 md:mb-10">
                    <h1 className="text-3xl md:text-4xl text-[#5dc8ae]">
                        Como jogar ?
                    </h1>
                    <button 
                        onClick={onClose}
                        className="bg-black/50 text-[#5dc8ae] w-8 h-8 md:w-12 md:h-12 md:text-xl rounded-full absolute right-0 flex justify-center items-center hover:scale-[1.1] duration-500 cursor-pointer">
                        X
                    </button>
                </div>

                <div>
                    <h1 className="text-white text-lg md:text-xl mb-3 md:mb-5">
                        O objetivo do jogo é que você acerte uma palavra de 5 letras em 6 tentativas
                    </h1>
                    <h1 className="text-white text-lg md:text-xl">
                        Para isso temos um esquema de cores que vai te ajudar!
                    </h1>
                    <div className="flex gap-1 my-3 md:my-5">
                        <ExemploLetra letra="P" status="incorreto"/>
                        <ExemploLetra letra="A" status="quase"/>
                        <ExemploLetra letra="V" status="quase"/>
                        <ExemploLetra letra="I" status="quase"/>
                        <ExemploLetra letra="O" status="correto"/>
                    </div>
                    <h1 className="text-white text-lg md:text-xl ">
                        Na palavra acima a letra "O" (verde) existe e está na posição correta, as letras "A", "V" e "I" (amarelas) existem mas estão nas posições erradas e a letra "P" (preta) não existe
                    </h1>
                    <div className="flex gap-1 my-3 md:my-5">
                        <ExemploLetra letra="A" status="correto"/>
                        <ExemploLetra letra="V" status="correto"/>
                        <ExemploLetra letra="I" status="correto"/>
                        <ExemploLetra letra="A" status="correto"/>
                        <ExemploLetra letra="O" status="correto"/>
                    </div>
                    <h1 className="text-white text-lg md:text-xl ">
                        Agora a palavra está correta e o jogo foi vencido, repare que não há distinção de acentos e as palavras podem ter mais de 1 letra igual
                    </h1>
                    <h1 className="text-[#5dc8ae] text-lg md:text-xl mt-3 md:mt-5">
                        Divirta-se!
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default ModalInstruções