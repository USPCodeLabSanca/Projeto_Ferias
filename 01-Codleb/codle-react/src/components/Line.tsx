import Letter from "./Letter";
import { useAnswerContext } from "../context/AnswerContext";
import { getColors } from "../utils/Utils";
interface LineProps {
	word: string;
	length: number;
	isSubmitted: boolean;
	isBeingGuessed: boolean;
}

function Line({ word, length, isSubmitted, isBeingGuessed }: LineProps) {
	const { answer } = useAnswerContext();
	const letters = word.split("");
	const baseColor = "bg-[#1D3D35]";
	const beingGuessedColor = "bg-[#282828] border-2 border-[#5EC8AE]";

	const colors = isSubmitted
		? getColors(answer, word)
		: Array(length).fill(isBeingGuessed ? beingGuessedColor : baseColor);

	return (
		<div className="flex space-x-3 mb-3">
			{Array.from({ length }).map((_, i) => (
				<Letter
					key={i}
					value={letters[i]}
					index={i}
					color={colors[i]}
				/>
			))}
		</div>
	);
}

export default Line;