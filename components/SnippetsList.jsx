"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSnippets } from "@/contexts/SnippetsContext";
import SnippetItem from "./SnippetItem";
import { Folder, Heart } from "lucide-react";
import { Input } from "./ui/input";

export default function SnippetsList() {
	const { snippets, categories, languages } = useSnippets();
	const [selectedCategoryId, setSelectedCategoryId] = useState("favorites");
	const [selectedSnippetId, setSelectedSnippetId] = useState(null);
	const [searchText, setSearchText] = useState("");

	const filteredSnippets = searchText.trim()
		? snippets.filter(
				(s) =>
					s.title.toLowerCase().includes(searchText.toLowerCase()) ||
					s.content.toLowerCase().includes(searchText.toLowerCase())
		  )
		: selectedCategoryId === "favorites"
		? snippets.filter((s) => s.isFavorite)
		: snippets.filter((s) => s.categoryId === selectedCategoryId);

	const selectedSnippet = snippets.find((s) => s.id === selectedSnippetId);

	return (
		<>
			<Input
				name="search"
				placeholder="Rechercher..."
				className="mb-8 pl-2 text-white font-semibold placeholder:text-white/30 placeholder:font-normal border-0 border-b border-white bg-transparent focus-visible:ring-0 focus-visible:border-b-1 focus-visible:border-primary max-w-2xs mx-auto"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>

			<div className="grid grid-cols-[200px_1fr]">
				{/* Colonne 1 : Catégories + Favoris */}
				<div className="px-3 border-r border-white/10">
					<ul className="">
						<li>
							<Button
								variant="ghost"
								className={`relative h-auto w-full justify-start hover:bg-transparent cursor-pointer px-0 py-2 before:content-[""] before:absolute before:top-0 before:-left-3 before:h-full before:w-[1px] before:transition-colors ${
									selectedCategoryId === "favorites"
										? "text-white font-bold before:bg-primary"
										: "text-white before:bg-white/5"
								}`}
								onClick={() =>
									setSelectedCategoryId("favorites")
								}
							>
								<span className="flex items-center gap-2">
									<Heart
										fill="var(--primary)"
										color="var(--primary)"
									/>{" "}
									Favoris
								</span>
							</Button>
						</li>
						{[...categories]
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((cat) => (
								<li key={cat.id}>
									<Button
										variant="ghost"
										className={`relative h-auto w-full justify-start hover:text-primary hover:bg-transparent cursor-pointer px-0 py-2 before:content-[""] before:absolute before:top-0 before:-left-3 before:h-full before:w-[1px] before:transition-colors ${
											selectedCategoryId === cat.id
												? "text-primary font-bold before:bg-primary"
												: "text-foreground before:bg-white/5"
										}`}
										onClick={() =>
											setSelectedCategoryId(cat.id)
										}
									>
										<span className="flex items-center gap-2">
											<Folder /> {cat.name}
										</span>
									</Button>
								</li>
							))}
					</ul>
				</div>

				{/* Colonne 2 : Liste des snippets */}
				{/* <div className="px-3 border-r border-white/10">
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
				</div> */}

				{/* Colonne 3 : Détail du snippet */}

				<div className="pl-6">
					{filteredSnippets.map((snippet) => (
						<SnippetItem key={snippet.id} snippet={snippet} />
					))}

					{/* {selectedSnippet ? (
						<SnippetItem snippet={selectedSnippet} />
					) : (
						<p className="text-gray-500 text-sm">
							Sélectionnez un snippet pour voir les détails.
						</p>
					)} */}
				</div>
			</div>
		</>
	);
}
