export function getColors(answer: string, guess: string): string[] {
	const green = "bg-[#357465]";
	const yellow = "bg-[#8B8F4D]";
	const gray = "bg-[#404040]";

	const answerArray = answer.split("");
	const guessArray = guess.split("");

	const colors = Array(guessArray.length).fill(gray);

	const letterCount: Record<string, number> = {};
	answerArray.forEach((letter) => {
		letterCount[letter] = (letterCount[letter] || 0) + 1;
	});

	for (let i = 0; i < guessArray.length; i++) {
		if (guessArray[i] === answerArray[i]) {
			colors[i] = green;
			letterCount[guessArray[i]] -= 1;
		}
	}

	for (let i = 0; i < guessArray.length; i++) {
		if (colors[i] === gray && letterCount[guessArray[i]] > 0) {
			colors[i] = yellow;
			letterCount[guessArray[i]] -= 1;
		}
	}

	return colors;
}
