import { useAnswerContext } from "../context/AnswerContext";

interface LetterProps {
	value: string;
	index: number;
	isBeingGuessed: boolean;
	isSubmitted: boolean;
}

function Letter({ value, index, isSubmitted, isBeingGuessed }: LetterProps) {
	const { answer } = useAnswerContext();

	const baseColor = "bg-[#1D3D35]";
	const green = "bg-[#357465]";
	const yellow = "bg-[#8B8F4D]";
	const gray = "bg-[#404040]";
	const darkGrey = "bg-[#282828]";
	const border = "border-2 border-[#5EC8AE]";

	let classLetter =
		"w-14 h-14 font-montserrat font-bold text-white text-[30px] flex items-center justify-center text-2xl font-bold uppercase ";

	if (isSubmitted && value) {
		if (answer[index] === value) {
			classLetter += green;
		} else if (answer.includes(value)) {
			classLetter += yellow;
		} else {
			classLetter += gray;
		}
	} else if (isBeingGuessed) {
		classLetter += darkGrey + " " + border;
	} else {
		classLetter += baseColor;
	}

	return <div className={`${classLetter}`}>{value}</div>;
}

export default Letter;
