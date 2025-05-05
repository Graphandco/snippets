"use client";
import { addSnippet } from "../actions/snippets";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddSnippet = ({ categories, languages }) => {
	return (
		<form action={addSnippet} className="space-y-4">
			<div>
				<label className="block text-sm font-medium">Titre</label>
				<Input name="title" placeholder="Titre du snippet" required />
			</div>

			<div>
				<label className="block text-sm font-medium">Description</label>
				<Textarea
					name="description"
					placeholder="Description (optionnelle)"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium">Contenu</label>
				<Textarea name="content" placeholder="Code ou texte" required />
			</div>

			<div>
				<label className="block text-sm font-medium">Catégorie</label>
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
	);
};

export default AddSnippet;
