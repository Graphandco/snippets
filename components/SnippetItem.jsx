"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteSnippet } from "@/actions/snippets";
import { useRouter } from "next/navigation";

const SnippetItem = ({ snippet }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleDelete = async (id) => {
		try {
			const formData = new FormData();
			formData.append("id", id);

			await deleteSnippet(formData);
			toast.success("Snippet supprimé !");
			startTransition(() => {
				router.refresh();
			});
		} catch (err) {
			toast.error("Erreur lors de la suppression");
		}
	};

	return (
		<li
			key={snippet.id}
			className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900"
		>
			<div className="flex justify-between items-start">
				<div>
					<h2 className="text-lg font-semibold">{snippet.title}</h2>
					{snippet.description && (
						<p className="text-sm text-gray-500">
							{snippet.description}
						</p>
					)}
					{snippet.content && (
						<p className="text-sm text-gray-500">
							{snippet.content}
						</p>
					)}
					<p className="text-sm text-gray-400">
						Catégorie:{" "}
						<span className="font-medium">
							{snippet.category.name}
						</span>{" "}
						| Langage:{" "}
						<span className="font-medium">
							{snippet.language.name}
						</span>
					</p>
				</div>
				<Button
					variant="destructive"
					size="sm"
					onClick={() => handleDelete(snippet.id)}
					disabled={isPending}
				>
					{isPending ? "Suppression..." : "Supprimer"}
				</Button>
			</div>
		</li>
	);
};

export default SnippetItem;
