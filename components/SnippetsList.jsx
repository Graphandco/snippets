"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteSnippet } from "../actions/snippets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SnippetsList({ snippets }) {
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

	if (snippets.length === 0) {
		return <p className="text-gray-500">Aucun snippet pour le moment.</p>;
	}

	return (
		<ul className="space-y-4">
			{snippets.map((s) => (
				<li
					key={s.id}
					className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900"
				>
					<div className="flex justify-between items-start">
						<div>
							<h2 className="text-lg font-semibold">{s.title}</h2>
							{s.description && (
								<p className="text-sm text-gray-500">
									{s.description}
								</p>
							)}
							{s.content && (
								<p className="text-sm text-gray-500">
									{s.content}
								</p>
							)}
							<p className="text-sm text-gray-400">
								Catégorie:{" "}
								<span className="font-medium">
									{s.category.name}
								</span>{" "}
								| Langage:{" "}
								<span className="font-medium">
									{s.language.name}
								</span>
							</p>
						</div>
						<Button
							variant="destructive"
							size="sm"
							onClick={() => handleDelete(s.id)}
							disabled={isPending}
						>
							{isPending ? "Suppression..." : "Supprimer"}
						</Button>
					</div>
				</li>
			))}
		</ul>
	);
}
