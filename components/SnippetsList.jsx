"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSnippets } from "@/contexts/SnippetsContext";
import AddSnippet from "./AddSnippet";
import SnippetItem from "./SnippetItem";

export default function SnippetsList() {
	const { snippets, categories, languages } = useSnippets();
	const [selectedCategoryId, setSelectedCategoryId] = useState("favorites");
	const [selectedSnippetId, setSelectedSnippetId] = useState(null);

	const filteredSnippets =
		selectedCategoryId === "favorites"
			? snippets.filter((s) => s.isFavorite)
			: snippets.filter((s) => s.categoryId === selectedCategoryId);

	const selectedSnippet = snippets.find((s) => s.id === selectedSnippetId);

	return (
		<>
			<div className="grid grid-cols-[200px_300px_1fr]">
				{/* Colonne 1 : Catégories + Favoris */}
				<div className="px-3 border-r border-white/10">
					<ul className="">
						<li>
							<Button
								variant="ghost"
								className={`w-full justify-start hover:bg-transparent cursor-pointer p-0 ${
									selectedCategoryId === "favorites"
										? "text-white font-bold"
										: "text-foreground"
								}`}
								onClick={() =>
									setSelectedCategoryId("favorites")
								}
							>
								Favoris
							</Button>
						</li>
						{categories.map((cat) => (
							<li key={cat.id}>
								<Button
									variant="ghost"
									className={`w-full justify-start hover:bg-transparent cursor-pointer p-0 ${
										selectedCategoryId === cat.id
											? "text-white font-bold"
											: "text-foreground"
									}`}
									onClick={() =>
										setSelectedCategoryId(cat.id)
									}
								>
									<span>{cat.name}</span>
								</Button>
							</li>
						))}
					</ul>
				</div>

				{/* Colonne 2 : Liste des snippets */}
				<div className="px-3 border-r border-white/10">
					{/* <div className="text-2xl">Catégories</div> */}
					{filteredSnippets.length === 0 ? (
						<p className="text-gray-500 text-sm">
							Aucun snippet pour cette catégorie.
						</p>
					) : (
						<ul className="space-y-2">
							{filteredSnippets.map((snippet) => (
								<li key={snippet.id}>
									<Button
										variant="ghost"
										className={`w-full justify-start hover:bg-transparent cursor-pointer p-0 ${
											selectedSnippetId === snippet.id
												? "text-white font-bold"
												: "text-foreground"
										}`}
										onClick={() =>
											setSelectedSnippetId(snippet.id)
										}
									>
										{snippet.title}
									</Button>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Colonne 3 : Détail du snippet */}

				<div className="px-3">
					{selectedSnippet ? (
						<SnippetItem snippet={selectedSnippet} />
					) : (
						<p className="text-gray-500 text-sm">
							Sélectionnez un snippet pour voir les détails.
						</p>
					)}
				</div>
			</div>
			<AddSnippet />
		</>
	);
}
