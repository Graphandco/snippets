"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteSnippet } from "@/actions/snippets";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { Star, StarOff } from "lucide-react";
import { toggleFavorite } from "@/actions/snippets";

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
		<div className=" p-4 ">
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
					{/* <p className="text-sm text-gray-400">
						Catégorie:{" "}
						<span className="font-medium">
							{snippet.category.name}
						</span>{" "}
						| Langage:{" "}
						<span className="font-medium">
							{snippet.language.name}
						</span>
					</p> */}
				</div>
				<div className="flex ">
					<form action={toggleFavorite}>
						<input type="hidden" name="id" value={snippet.id} />
						<Button
							variant="ghost"
							className="text-white cursor-pointer scale-100 hover:scale-110 transition-transform duration-200 px-1!"
							size="sm"
							title={
								snippet.isFavorite
									? "Retirer des favoris"
									: "Ajouter aux favoris"
							}
						>
							{snippet.isFavorite ? (
								<Star size={18} fill="white" />
							) : (
								<Star size={18} />
							)}
						</Button>
					</form>

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
