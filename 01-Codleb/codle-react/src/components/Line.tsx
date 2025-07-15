import Letter from "./Letter";

interface LineProps {
	word: string;
	length: number;
	isSubmitted: boolean;
	isBeingGuessed: boolean;
}

export default function Line({
	word,
	length,
	isSubmitted,
	isBeingGuessed,
}: LineProps) {
	const letters = word.split("");

	return (
		<div className="flex space-x-3 mb-3">
			{Array.from({ length }).map((_, i) => (
				<Letter
					key={i}
					value={letters[i] || ""}
					index={i}
					isSubmitted={isSubmitted}
					isBeingGuessed={isBeingGuessed}
				/>
			))}
		</div>
	);
}
