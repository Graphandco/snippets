"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	dracula,
	darcula,
	atomDark,
	vs2015,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function CodeBlock({ snippet }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(snippet.content);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Échec de la copie :", err);
		}
	};

	return (
		<div className="relative">
			<Button
				variant="secondary"
				size="icon"
				className="absolute top-2 right-4 cursor-pointer rounded-full"
				onClick={handleCopy}
			>
				<Copy size={16} />
			</Button>

			<SyntaxHighlighter
				language={snippet.language.name.toLowerCase()}
				style={dracula}
				customStyle={{
					borderRadius: "0.5rem",
					padding: "1rem",
					fontSize: "0.875rem",
					backgroundColor: "hsl(232deg 17.24% 13%)",
				}}
			>
				{snippet.content}
			</SyntaxHighlighter>

			{copied && (
				<span className="absolute top-2 right-14 text-xs font-medium text-green-500">
					Copié !
				</span>
			)}
		</div>
	);
}
