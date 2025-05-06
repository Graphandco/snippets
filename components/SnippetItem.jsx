"use client";

import { Copy } from "lucide-react";
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

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(snippet.content);
			toast.success("Code copié !");
		} catch (err) {
			console.error("Échec de la copie :", err);
		}
	};

	return (
		<div className="mb-6 py-2 px-4 bg-black/20 rounded-2xl">
			<div className="snippet-header flex justify-between items-center gap-2">
				<div>
					<h2 className="text-lg text-primary font-semibold">
						{snippet.title}
					</h2>
					{snippet.description && (
						<p className="text-sm text-gray-500">
							{snippet.description}
						</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					<Copy
						size={18}
						className=" cursor-pointer scale-100 hover:scale-110 transition-all duration-200 hover:text-white"
						onClick={handleCopy}
					/>

					<Star
						size={18}
						className="cursor-pointer scale-100 hover:scale-110 transition-all duration-200 hover:text-white"
						onClick={() => handleToggleFavorite(snippet.id)}
						fill={`${
							snippet.isFavorite
								? "var(--primary)"
								: "transparent"
						}`}
						color={`${
							snippet.isFavorite
								? "var(--primary)"
								: "var(--foreground)"
						}`}
					/>
					<Trash
						size={18}
						className="cursor-pointer scale-100 hover:scale-110 transition-all duration-200 hover:text-white"
						onClick={() => handleDelete(snippet.id)}
					/>
				</div>
			</div>
			<div>{snippet.content && <CodeBlock snippet={snippet} />}</div>
		</div>
	);
};

export default SnippetItem;
