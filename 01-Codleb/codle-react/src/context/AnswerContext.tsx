import { createContext, useContext } from "react";

interface AnswerContextType {
	answer: string;
}

// Create the context with an initial undefined value
const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export function useAnswerContext() {
	const context = useContext(AnswerContext);
	if (!context) {
		throw new Error("Error at the useAnswerContext");
	}
	return context;
}

interface AnswerProviderProps {
	children: React.ReactNode;
	answer: string;
}

export function AnswerProvider({ children, answer }: AnswerProviderProps) {
	return (
		<AnswerContext.Provider value={{ answer }}>
			{children}
		</AnswerContext.Provider>
	);
}
