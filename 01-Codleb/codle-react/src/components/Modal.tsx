interface ModalProps {
	isWinner: boolean;
	answer: string;
	onRestart: () => void;
}

function Modal({ isWinner, answer, onRestart }: ModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-1000">
			<div className="bg-white p-6 rounded-lg text-center shadow-lg transform transition-transform duration-1000 scale-95 animate-fade-in">
				<h2 className="text-2xl font-montserrat font-bold mb-4">
					{isWinner ? "🎉 Você acertou!" : "😢 Fim de jogo"}
				</h2>
				<p className="font-montserrat mb-4">
					A palavra era:{" "}
					<span className="font-montserrat font-bold">{answer}</span>
				</p>
				<button
					onClick={onRestart}
					className="font-montserrat bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
					Jogar novamente
				</button>
			</div>
		</div>
	);
}

export default Modal;
