interface LetterProps {
	value: string;
	index: number;
	color: string;
}

function Letter({ value, index, color }: LetterProps) {
	const classLetter =
		"w-14 h-14 font-montserrat font-bold text-white text-[30px] flex items-center justify-center text-2xl font-bold uppercase " +
		color;

	return (
		<div
			key={index}
			className={`${classLetter}`}>
			{value}
		</div>
	);
}

export default Letter;
