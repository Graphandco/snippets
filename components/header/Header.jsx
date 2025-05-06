import Image from "next/image";
import AddSnippet from "../AddSnippet";
import { HomeIcon, Settings } from "lucide-react";
import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-black/30">
			<div className="wrapper py-3 flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Image
						src="/logo.svg"
						width={30}
						height={30}
						alt="Logo Graph and Co"
					/>
					<div className="text-white font-semibold">Cheat Sheets</div>
				</div>
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="text-white cursor-pointer scale-100 hover:scale-110 transition-transform"
					>
						<HomeIcon />
					</Link>
					<Link
						href="/categories"
						className="text-white cursor-pointer scale-100 hover:scale-110 transition-transform"
					>
						<Settings />
					</Link>
					<AddSnippet />
				</div>
			</div>
		</header>
	);
};

export default Header;
