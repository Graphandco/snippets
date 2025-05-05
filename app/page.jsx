import prisma from "../lib/prisma";
import SnippetsList from "../components/SnippetsList";
import { addSnippet } from "../actions/snippets";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function Page() {
	const snippets = await prisma.snippet.findMany({
		include: { category: true, language: true },
		orderBy: { createdAt: "desc" },
	});

	const categories = await prisma.category.findMany();
	const languages = await prisma.language.findMany();

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold">Gestion des Snippets</h1>

			{/* Formulaire d'ajout */}
			<form action={addSnippet} className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Titre</label>
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
					<label className="block text-sm font-medium">Contenu</label>
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
					<label className="block text-sm font-medium">Langage</label>
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

				<Button type="submit">Ajouter le snippet</Button>
			</form>

			{/* Liste des snippets */}
			<SnippetsList snippets={snippets} />
		</div>
	);
}
