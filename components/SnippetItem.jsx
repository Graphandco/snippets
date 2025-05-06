"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteSnippet, toggleFavorite } from "@/actions/snippets";
import { Trash, Star } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { useSnippets } from "@/contexts/SnippetsContext";

const SnippetItem = ({ snippet }) => {
	const { setSnippets } = useSnippets();
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id) => {
		try {
			const formData = new FormData();
			formData.append("id", id);

			const deletedSnippet = await deleteSnippet(formData);

			setSnippets((prev) =>
				prev.filter((s) => s.id !== deletedSnippet.id)
			);

			toast.success("Snippet supprimé !");
		} catch (err) {
			toast.error("Erreur lors de la suppression");
		}
	};

	const handleToggleFavorite = async (id) => {
		try {
			const formData = new FormData();
			formData.append("id", id);

			const updatedSnippet = await toggleFavorite(formData);

			setSnippets((prev) =>
				prev.map((s) =>
					s.id === updatedSnippet.id ? updatedSnippet : s
				)
			);

			toast.success(
				updatedSnippet.isFavorite
					? "Ajouté aux favoris"
					: "Retiré des favoris"
			);
		} catch (err) {
			toast.error("Erreur lors du changement de favori");
		}
	};

	return (
		<div className="p-4">
			<div className="flex justify-between items-start">
				<div className="grow gap-2">
					<h2 className="text-lg text-white font-semibold">
						{snippet.title}
					</h2>
					{snippet.description && (
						<p className="text-sm text-gray-500">
							{snippet.description}
						</p>
					)}
					{snippet.content && <CodeBlock snippet={snippet} />}
				</div>
				<div className="flex">
					<Button
						variant="ghost"
						className="text-white cursor-pointer scale-100 hover:scale-110 transition-transform duration-200 px-1!"
						size="sm"
						title={
							snippet.isFavorite
								? "Retirer des favoris"
								: "Ajouter aux favoris"
						}
						onClick={() => handleToggleFavorite(snippet.id)}
						disabled={isPending}
					>
						{snippet.isFavorite ? (
							<Star size={18} fill="white" />
						) : (
							<Star size={18} />
						)}
					</Button>

					<Button
						variant="ghost"
						className="cursor-pointer scale-100 hover:scale-110 transition-transform duration-200 px-1!"
						size="sm"
						onClick={() => handleDelete(snippet.id)}
						disabled={isPending}
					>
						{isPending ? "Suppression..." : <Trash size={18} />}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SnippetItem;
