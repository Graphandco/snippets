"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	dracula,
	darcula,
	atomDark,
	vs2015,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";

export default function CodeBlock({ snippet }) {
	return (
		<SyntaxHighlighter
			language={snippet.language.name.toLowerCase()}
			style={dracula}
			customStyle={{
				borderRadius: "0.5rem",
				padding: "1rem",
				fontSize: "0.875rem",
				backgroundColor: "hsl(232deg 17.24% 13%)",
				backgroundColor: "transparent",
			}}
		>
			{snippet.content}
		</SyntaxHighlighter>
	);
}
