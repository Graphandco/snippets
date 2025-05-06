import Image from "next/image";
import AddSnippet from "../AddSnippet";

const Header = () => {
	return (
		<header className="bg-black/30">
			<div className="wrapper py-2 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Image
						src="/logo.svg"
						width={40}
						height={40}
						alt="Logo Graph and Co"
						priority
					/>
					<div className="text-white font-semibold">Cheat Sheets</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
