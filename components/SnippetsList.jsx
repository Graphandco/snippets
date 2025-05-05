"use client";

import AddSnippet from "./AddSnippet";
import SnippetItem from "./SnippetItem";

export default function SnippetsList({ snippets, categories, languages }) {
	if (snippets.length === 0) {
		return <p className="text-gray-500">Aucun snippet pour le moment.</p>;
	}

	return (
		<>
			<AddSnippet categories={categories} languages={languages} />
			<ul className="space-y-4">
				{snippets.map((snippet) => (
					<SnippetItem key={snippet.id} snippet={snippet} />
				))}
			</ul>
		</>
	);
}
