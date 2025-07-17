import { FaSyncAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

interface HeaderProps {
	modes: { name: string; value: number }[];
	currentMode: string;
	setCurrentMode: (mode: string) => void;
	onReset: () => void;
}

function Header({ modes, currentMode, setCurrentMode, onReset }: HeaderProps) {
	const [showModes, setShowModes] = useState(false);

	const handleModeChange = (mode: { name: string; value: number }) => {
		setCurrentMode(mode.name);
		setShowModes(false);
	};

	return (
		<div className="bg-[#1D3D35] text-white">
			{showModes && (
				<div className="flex justify-center items-center relative p-2 bg-[#282828] border-b border-[#5EC8AE]">
					<div className="flex gap-6">
						{modes.map((mode) => (
							<button
								key={mode.value}
								className={`px-4 py-1 rounded-md transition-colors ${
									currentMode === mode.name
										? "bg-[#5EC8AE] text-[#1D3D35] font-bold"
										: "hover:bg-[#1D3D35]"
								}`}
								onClick={() => handleModeChange(mode)}>
								{mode.name}
							</button>
						))}
					</div>
				</div>
			)}

			<div className="flex items-center justify-center p-4 relative">
				<div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
					<img
						src="/src/assets/images/logo.png"
						alt="CODLE Logo"
						className="h-10 mr-3"
					/>
					<h1 className="text-3xl font-bold font-montserrat text-[#ffffff]">
						CODLE
					</h1>
				</div>
				<button
					type="button"
					tabIndex={-1}
					className="flex items-center gap-2 px-3 py-2 rounded-md border border-[#5EC8AE] hover:bg-[#282828] transition-colors mr-auto"
					onClick={(e) => {
						setShowModes(!showModes);
						e.currentTarget.blur();
					}}>
					{showModes ? (
						<FaChevronUp size={14} />
					) : (
						<FaChevronDown size={14} />
					)}
				</button>
				<form onSubmit={(e) => e.preventDefault()}>
					<button
						type="button"
						tabIndex={-1}
						onClick={(e) => {
							onReset();
							e.currentTarget.blur();
						}}
						className="p-2 rounded-full hover:bg-[#282828] transition-colors ml-auto">
						<FaSyncAlt
							size={20}
							className="text-white"
						/>
					</button>
				</form>
			</div>
		</div>
	);
}

export default Header;
