"use client";

import { useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { addSnippet } from "../actions/snippets";
import { useSnippets } from "@/contexts/SnippetsContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

const AddSnippet = () => {
	const { setSnippets, categories, languages } = useSnippets();
	const [open, setOpen] = useState(false);
	const router = useRouter();

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);

		const newSnippet = await addSnippet(formData);
		setSnippets((prev) => [newSnippet, ...prev]);
		toast.success("Snippet ajouté !");
		setOpen(false);
		startTransition(() => {
			router.refresh();
		});
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<CirclePlus
					className="text-foreground cursor-pointer scale-100 hover:scale-110 hover:text-white transition-all"
					onClick={() => setOpen(true)}
				/>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Ajouter un snippet</DialogTitle>
					<DialogDescription>
						Remplissez les informations du snippet.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium">
							Titre
						</label>
						<Input
							name="title"
							placeholder="Titre du snippet"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Description
						</label>
						<Textarea
							name="description"
							placeholder="Description (optionnelle)"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Contenu
						</label>
						<Textarea
							name="content"
							placeholder="Code ou texte"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Catégorie
						</label>
						<select
							name="categoryId"
							className="border rounded w-full p-2"
							required
						>
							<option value="">Choisir une catégorie</option>
							{categories.map((c) => (
								<option key={c.id} value={c.id}>
									{c.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Langage
						</label>
						<select
							name="languageId"
							className="border rounded w-full p-2"
							required
						>
							<option value="">Choisir un langage</option>
							{languages.map((l) => (
								<option key={l.id} value={l.id}>
									{l.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex justify-end gap-3">
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Annuler
							</Button>
						</DialogClose>
						<Button type="submit">Ajouter le snippet</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddSnippet;
